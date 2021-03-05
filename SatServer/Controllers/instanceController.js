const Instance = require('../Models/instanceModel');
const Book = require('../Models/bookModel');
const { body, validationResult, sanitizeBody } = require('express-validator');

// Create new instance of a book, with user being the currently logged in user
module.exports.create = (req, res) => {
  console.log(req.decoded);
  console.log(req.body);

  Instance.create(
    {
      book: req.body.book,
      user: req.decoded.id,
      condition: req.body.condition,
      notes: req.body.notes,
      rating: req.body.rating,
      imageLinks: req.body.imageLinks,
    },
    function (err, instance) {
      if (err) {
        res.status(500).json('Issue creating instance' + err);
      }
      console.log(
        'INSTANCE CREATION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
      );
      console.log(instance);
      res.status(201).json(instance);
    }
  );
};

// Return all instances of books, Public face
module.exports.index = (req, res) => {
  Instance.find({})
    .select('borrowed_by condition notes user rating')
    .populate('book')
    .populate('user', { password: 0, email: 0 })
    .exec((err, instances) => {
      if (err) {
        res.status(500).json('Issue finding instances');
      }
      res.status(200).json(instances);
    });
};

module.exports.ownerIndex = (req, res) => {
  Instance.find({ user: req.decoded.id })
    .populate('book')
    .populate('user', { password: 0, email: 0 })
    .exec((err, instances) => {
      if (err) {
        res.status(500).json('Issue finding instances');
      }
      res.status(200).json(instances);
    });
};

module.exports.ownerDetail = (req, res) => {
  Instance.findOne({
    $and: [{ user: req.decoded.id }, { _id: req.params.instanceId }],
  })
    .populate('book')
    .populate('user', { password: 0, _id: 0 })
    .populate('requested_by', { password: 0 })
    .populate('borrowed_by', { password: 0 })
    .exec((err, instance) => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      }
      res.status(200).json(instance);
    });
};

module.exports.publicDetail = (req, res) => {
  Instance.findOne({ _id: req.params.instanceId })
    .populate('book')
    .exec((err, instance) => {
      if (err) {
        res.status(500).json(err);
      }
      console.log(instance);
      res.status(200).json(instance);
    });
};

// Add current user to array of requesters for the book
module.exports.request = (req, res) => {
  Instance.findOneAndUpdate(
    { _id: req.params.instanceId },
    { $addToSet: { requested_by: req.decoded.id } },
    { new: true, useFindAndModify: false },
    (err, instance) => {
      if (err) {
        return res.status(500).json('Error with book request: ' + err);
      }
      res.status(200).json(instance);
    }
  );
};

// General update for book instance. User can be changed here by passing a new user
// to the user field in the request body
module.exports.update = [
  body('book')
    .isLength(24)
    .trim()
    .isAlphanumeric()
    .optional({ checkFalsy: true }),
  body('user')
    .isLength(24)
    .trim()
    .isAlphanumeric()
    .optional({ checkFalsy: true }),
  body('condition').trim().optional({ checkFalsy: true }),
  body('notes').trim().optional({ checkFalsy: true }),
  body('rating').isLength(1).trim().isNumeric().optional({ checkFalsy: true }),

  // sanitizeBody('book').escape(),
  // sanitizeBody('user').escape(),
  // sanitizeBody('condition').escape(),
  // sanitizeBody('notes').escape(),
  // sanitizeBody('rating').escape(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(300).json({ errors: errors.array() });
    } else {
      Instance.findOneAndUpdate(
        { $and: [{ user: req.decoded.id }, { _id: req.params.instanceId }] },
        {
          $set: req.body,
        },
        { new: true, useFindAndModify: false, upsert: false },
        (err, instance) => {
          if (!instance) {
            res.status(401).json('Unauthorized Update');
          } else {
            if (err) {
              res.status(500).json('Error updating book' + err);
            }
            res.status(200).json(instance);
          }
        }
      );
    }
  },
];

//Delete instance
module.exports.delete = function (req, res) {
  Instance.findOneAndDelete(
    {
      $and: [{ _id: req.params.instanceId }, { user: req.decoded.id }],
    },
    function (err, instance) {
      if (err) {
        res.status(500).json('Error deleting book');
      } else {
        res.status(200).json('Book deleted' + instance);
      }
    }
  );
};

// If owner of book, accept request to borrow the book, move user accepted
// off of requested_by array and put them on to the borrowed_by field, set a return
// date if user specifies one
module.exports.acceptRequest = (req, res) => {
  console.log('ACCEPTING REQUEST TO BORROW');
  console.log(req.body);
  Instance.findOneAndUpdate(
    { $and: [{ user: req.decoded.id }, { _id: req.params.instanceId }] },
    {
      $pull: { requested_by: req.body.acceptedUser },
      borrowed_by: req.body.acceptedUser,
      return_by: req.body.return_by,
    },
    { new: true },
    (err, instance) => {
      if (instance == null) {
        return res.status(401).json('NOPE');
      }
      if (err) {
        return res.status(500).json('Error with book request');
      }
      res.status(200).json(instance);
    }
  );
};

// If owner of book, remove a user from the list of requesters
module.exports.denyRequest = (req, res, next) => {
  Instance.findOneAndUpdate(
    { $and: [{ _id: req.params.instanceId }, { user: req.decoded.id }] },
    {
      $pull: { requested_by: req.body.deniedUser },
    },
    { new: true, useFindAndModify: false },
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
module.exports.return = (req, res) => {
  Instance.findOneAndUpdate(
    {
      $and: [{ borrowed_by: req.decoded.id }, { _id: req.params.instanceId }],
    },
    { pending_return: true },
    { new: true, useFindAndModify: false },
    (err, instance) => {
      if (err) {
        return res.status(500).json('Issue returning book');
      }
      res.status(200).json(instance);
    }
  );
};

// Check if current user is owner of book, accept return of book and empty
// the borrowed by field
module.exports.acceptReturn = function (req, res, next) {
  Instance.findOneAndUpdate(
    { $and: [{ _id: req.params.instanceId }, { user: req.decoded.id }] },
    { pending_return: false, borrowed_by: null },
    { new: true, useFindAndModify: false },
    function (err, instance) {
      if (err) {
        return res.status(500).json('Issue accepting return');
      }
      res.status(200).json(instance);
    }
  );
};
