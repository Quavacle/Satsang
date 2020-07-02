const Book = require('../Models/bookModel');
const Instance = require('../Models/instanceModel');
const async = require('async');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.create = [
  (body('title').isLength({ min: 1, max: 400 }).trim().isAlphanumeric(),
  body('subtitle').trim().escape(),
  body('authors').trim().escape(),
  body('published').toDate(),
  body('description').trim().escape(),
  body('genres').trim().escape(),
  body('cover').trim().escape(),
  sanitizeBody('title').escape(),
  sanitizeBody('subtitle').escape(),
  sanitizeBody('authors').escape(),
  sanitizeBody('published').escape(),
  sanitizeBody('description').escape(),
  sanitizeBody('genres').escape(),
  sanitizeBody('cover').escape(),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(300).json({ errors: errors.array() });
    } else {
      Book.create(
        {
          title: req.body.title,
          subtitle: req.body.subtitle,
          authors: req.body.authors,
          published: req.body.published,
          description: req.body.description,
          genres: req.body.genres,
          cover: req.body.cover,
        },
        function (err, book) {
          if (err) {
            return res.status(500).json('Issue creating book' + err);
          }
          res.status(201).json(book);
        }
      );
    }
  }),
];

exports.index = function (req, res) {
  Book.find({}, function (err, books) {
    if (err) {
      return res.status(500).json('Issue getting books');
    }
    res.status(200).json(books);
  });
};

module.exports.detail = function (req, res) {
  async.parallel(
    {
      book: function (callback) {
        Book.findById({ _id: req.params.bookId }).exec(callback);
      },

      users: function (callback) {
        Instance.find({ book: req.params.bookId }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        res.status(500).json('Error finding book');
      }
      res.status(200).json(results);
    }
  );
};
