const Instance = require('../Models/instanceModel');

// Create new instance of a book, with user being the currently logged in user
module.exports.create = function (req, res, next) {
  Instance.create(
    {
      book: req.body.book,
      user: req.decoded._id,
      condition: req.body.condition,
      notes: req.body.notes,
      rating: req.body.rating,
    },
    function (err, instance) {
      if (err) {
        return res.status(500).json('Issue creating instance' + err);
      }
      res.status(201).json(instance);
    }
  );
};

// Return all instances of books, making sure not to send the password field
// to the client!
module.exports.index = function (req, res, next) {
  Instance.find({})
    .populate('book')
    .populate('user', { password: 0 })
    .populate('requested_by', { password: 0 })
    .exec(function (err, instances) {
      if (err) {
        res.status(500).json('Issue finding instances');
      }
      res.status(200).json(instances);
    });
};

// Add current user to array of requesters for the book
module.exports.request = function (req, res, next) {
  Instance.findByIdAndUpdate(
    { _id: req.params.instanceId },
    { $push: { requested_by: req.decoded._id } },
    function (err, instance) {
      if (err) {
        return res.status(500).json('Error with book request');
      }
      res.status(200).json(instance);
    }
  );
};

// General update for book instance. User can be changed here by passing updateUser
// in the request
module.exports.update = function (req, res, next) {
  Instance.findByIdAndUpdate(
    { $and: [{ user: req.decoded._id }, { _id: req.params.instanceId }] },
    {
      $set: req.body,
    },
    function (err, instance) {
      if (err) {
        res.status(500).json('Error updating book');
      }
      res.status(200).json(instance);
    }
  );
};
// If owner of book, accept request to borrow the book, move user accepted
// off of requested_by array and put them on to the borrowed_by field, set a return
// date if user specifies one
module.exports.accept_request = function (req, res, next) {
  Instance.findOneAndUpdate(
    { $and: [{ user: req.decoded._id }, { _id: req.params.instanceId }] },
    {
      $pull: { requested_by: req.body.acceptedUser },
      borrowed_by: req.body.acceptedUser,
      return_by: req.body.return_by,
    },
    function (err, instance) {
      if (instance == null) {
        return res.status(401).json('Unauthorized user');
      }
      if (err) {
        return res.status(500).json('Error with book request');
      }

      res.status(200).json(instance);
    }
  );
};

// If owner of book, remove a user from the list of requesters
module.exports.deny_request = function (req, res, next) {
  Instance.findByIdAndUpdate(
    { $and: [{ _id: req.params.instanceId }, { user: req.decoded._id }] },
    {
      $pull: { requested_by: req.body.deniedUser },
    },
    function (err, instance) {
      if (err) {
        return res.status(500).json('Error with book request');
      }
      res.status(200).json(instance);
    }
  );
};

// Check if current user is borrower of book, if so, turn pending_return
// to true to notify book owner
module.exports.return = function (req, res, next) {
  Instance.findByIdAndUpdate(
    {
      $and: [{ borrowed_by: req.decoded._id }, { _id: req.params.instanceId }],
    },
    { pending_return: true },
    function (err, instance) {
      if (err) {
        return res.status(500).json('Issue returning book');
      }
      res.status(200).json(instance);
    }
  );
};

// Check if current user is owner of book, accept return of book and empty
// the borrowed by field
module.exports.accept_return = function (req, res, next) {
  Instance.findByIdAndUpdate(
    { $and: [{ _id: req.params.instanceId }, { user: req.decoded._id }] },
    { pending_return: false, borrowed_by: null },
    function (err, instance) {
      if (err) {
        return res.status(500).json('Issue accepting return');
      }
      res.status(200).json(instance);
    }
  );
};
