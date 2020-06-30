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
  console.log(`Request req.body.user: ${req.body.user}`);
  Instance.findByIdAndUpdate(
    { _id: req.params.instanceId },
    { $push: { requested_by: req.body.user } },
    function (err, instance) {
      if (err) {
        return res.status(500).json('Error with book request');
      }
      res.status(200).json(instance);
    }
  );
};

module.exports.accept_request = function (req, res, next) {
  console.log(`Accept req.body.user: ${req.body.acceptedUser}`);
  Instance.findByIdAndUpdate(
    { _id: req.params.instanceId, user: req.body.acceptedUser },
    {
      $pull: { requested_by: req.body.acceptedUser },
      borrowed_by: req.body.acceptedUser,
      // return_by: req.body.return_by,
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
