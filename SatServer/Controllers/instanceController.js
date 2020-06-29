const Instance = require('../Models/instanceModel');

module.exports.create = function (req, res, next) {
  Instance.create(
    {
      book: req.body.book,
      user: req.body.user,
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

module.exports.request = function (req, res, next) {
  Instance.findByIdAndUpdate(
    { _id: req.params.instanceId },
    { requested_by: req.body.user },
    function (err, instance) {
      if (err) {
        return res.status(500).json('Error with book request');
      }
      res.status(200).json(instance);
    }
  );
};

module.exports.accept_request = function (req, res, next) {
  Instance.findByIdAndUpdate(
    { _id: req.params.instanceId },
    {
      requested_by: null,
      borrowed_by: req.body.requested_by,
      return_by: req.body.return_by,
    },
    function (err, instance) {
      if (err) {
        return res.status(500).json('Error with book request');
      }
      res.status(200).json(instance);
    }
  );
};

module.exports.deny_request = function (req, res, next) {
  Instance.findByIdAndUpdate(
    { _id: req.params.instanceId },
    {
      requested_by: null,
    },
    function (err, instance) {
      if (err) {
        return res.status(500).json('Error with book request');
      }
      res.status(200).json(instance);
    }
  );
};
