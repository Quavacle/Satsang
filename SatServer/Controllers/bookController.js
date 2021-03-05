const Book = require('../Models/bookModel');
const Instance = require('../Models/instanceModel');
const async = require('async');

exports.create = function (req, res, next) {
  Book.findOne(
    { $and: [{ title: req.body.title }, { authors: req.body.authors }] },
    function (err, book) {
      if (err) {
        return res.status(500).json('Issue creating book' + err);
      }
      if (book) {
        req.body.book = book;
        next();
      } else if (!book) {
        Book.create(
          {
            title: req.body.title,
            subtitle: req.body.subtitle,
            authors: req.body.authors,
            published: req.body.published,
            description: req.body.description,
            genres: req.body.genres,
            imageLinks: req.body.imageLinks,
          },
          function (err, book) {
            if (err) {
              return res.status(500).json('Issue creating book' + err);
            }
            console.log('BOOK CREATED THIS IS THE BOOK');
            console.log(book);
            req.body.book = book;
            next();
          }
        );
      }
    }
  );
};

module.exports.index = (req, res) => {
  async.waterfall(
    [
      function getBooks(bookCallback) {
        Book.find({}, bookCallback).select('_id');
      },
      //   function getInstances(bookList, instanceCallback) {
      //     Instance.count({}, instanceCallback, bookList)
      //   }
      // ],
      Instance.aggregate([
        { $match: { instances: { $in: [bookList] } } },
        { $unwind: $bookList },
      ]),
    ],
    (err, results) => {
      if (err) {
        res.status(500).json('Error in indexing' + err);
      }

      res.status(200).json(results);
    }
  );
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
