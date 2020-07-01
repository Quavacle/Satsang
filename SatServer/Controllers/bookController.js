const Book = require('../Models/bookModel');

exports.create = function (req, res) {
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
};

exports.index = function (req, res) {
  Book.find({}, function (err, books) {
    if (err) {
      return res.status(500).json('Issue getting books');
    }
    res.status(200).json(books);
  });
};
