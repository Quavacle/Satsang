const Book = require('../Models/bookModel');

exports.create = function (req, res, next) {
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
