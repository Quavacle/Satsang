const Instance = require('../Models/instanceModel');
const authController = require('./authController');
const jwt = require('jsonwebtoken');

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

module.exports.index = function (req, res, next) {
  Instance.find({}, function (err, instanceList) {
    if (err) {
      res.status(500).json('Issue finding instances');
    }
    res.status(200).json(instanceList);
  });
};
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

module.exports.accept_request = function (req, res, next) {
  console.log(req.decoded._id);
  Instance.findOneAndUpdate(
    { $and: [{ user: req.decoded._id }, { _id: req.params.instanceId }] },
    {
      $pull: { requested_by: req.body.acceptedUser },
      borrowed_by: req.body.acceptedUser,
      // return_by: req.body.return_by,
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
