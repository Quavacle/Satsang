const Instance = require('../Models/instanceModel');
const Book = require('../Models/bookModel')
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Create new instance of a book, with user being the currently logged in user
module.exports.create = (req, res) => {
  console.log(req.decoded)
  Instance.create(
    {
      book: req.body.book,
      user: req.decoded.id,
      condition: req.body.condition,
      notes: req.body.notes,
      rating: req.body.rating
    },
    function (err, instance) {
      if (err) {
        res.status(500).json('Issue creating instance' + err)
      }
      res.status(201).json(instance)
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

module.exports.detail = function (req, res, next) {
  Instance.findById({ _id: req.params.instanceId })
    .populate('book')
    .populate('user', { password: 0, _id: 0 })
    .populate('requested_by', { password: 0, _id: 0 })
    .populate('borrowed_by', { password: 0, _id: 0 })
    .exec(function (err, instance) {
      if (err) {
        res.status(500).json('Issue finding instance');
      }
      res.status(200).json(instance);
    })
}

// Add current user to array of requesters for the book
module.exports.request = function (req, res) {

  Instance.findOneAndUpdate(
    { _id: req.params.instanceId },
    { $addToSet: { requested_by: req.decoded.id } },
    { new: true, useFindAndModify: false },
    (err, instance) => {
      if (err) {
        return res.status(500).json('Error with book request: ' + err)
      }
      console.log('instance here baby, oh yeah, please dear god where is it')
      console.log(instance)
      res.status(200).json(instance)
    }
  )
}

// General update for book instance. User can be changed here by passing updateUser
// in the request
module.exports.update = [
  body('book').isLength(24).trim().isAlphanumeric(),
  body('user').isLength(24).trim().isAlphanumeric(),
  body('condition')
    .trim()
    .isAlphanumeric()
    .withMessage('Letters and numbers only'),
  body('notes').trim().isAlphanumeric().withMessage('Letters and numbers only'),
  body('rating').isLength(1).trim().isNumeric(),

  sanitizeBody('book').escape(),
  sanitizeBody('user').escape(),
  sanitizeBody('condition').escape(),
  sanitizeBody('notes').escape(),
  sanitizeBody('rating').escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(300).json({ errors: errors.array() });
    } else {
      Instance.findByIdAndUpdate(
        { $and: [{ user: req.decoded.id }, { _id: req.params.instanceId }] },
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
    }
  },
];

//Delete instance
module.exports.delete = function (req, res) {
  Instance.findByIdAndDelete(
    {
      $and: [{ _id: req.params.instanceId }, { user: req.decoded.id }],
    },
    function (err, instance) {
      if (err) {
        res.status(500).json('Error deleting book');
      }
      res.status(200).json('Book deleted' + instance);
    }
  );
};

// If owner of book, accept request to borrow the book, move user accepted
// off of requested_by array and put them on to the borrowed_by field, set a return
// date if user specifies one
module.exports.accept_request = (req, res) => {
  Instance.findOneAndUpdate(
    { $and: [{ user: req.decoded.id }, { _id: req.params.instanceId }] },
    {
      $pull: { requested_by: req.body.acceptedUser },
      borrowed_by: req.body.acceptedUser,
      return_by: req.body.return_by
    }, { new: true, useFindAndModify: false },
    (err, instance) => {
      if (instance == null) {
        return res.status(401).json(instance)
      }
      if (err) {
        return res.status(500).json('Error with book request');
      }
      res.status(200).json(instance);
    }
  );
};

// If owner of book, remove a user from the list of requesters
module.exports.deny_request = (req, res, next) => {
  Instance.findByIdAndUpdate(
    { $and: [{ _id: req.params.instanceId }, { user: req.decoded.id }] },
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
module.exports.return = function (req, res) {
  Instance.findByIdAndUpdate(
    {
      $and: [{ borrowed_by: req.decoded.id }, { _id: req.params.instanceId }],
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
    { $and: [{ _id: req.params.instanceId }, { user: req.decoded.id }] },
    { pending_return: false, borrowed_by: null },
    function (err, instance) {
      if (err) {
        return res.status(500).json('Issue accepting return');
      }
      res.status(200).json(instance);
    }
  );
};
