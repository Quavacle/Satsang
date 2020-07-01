const User = require('../Models/userModel');
const Instance = require('../Models/instanceModel');
const async = require('async');

// Main dashboard get, returning user info, books owned, borrowed, and requested
module.exports.dashboard = function (req, res) {
  async.parallel(
    {
      user: function (callback) {
        User.findById({ _id: req.decoded._id }, { password: 0 }).exec(callback);
      },

      owned: function (callback) {
        Instance.find({
          user: req.decoded._id,
        })
          .populate('book')
          .populate('user', { password: 0 })
          .exec(callback);
      },

      borrowed: function (callback) {
        Instance.find({
          borrowed_by: req.decoded._id,
        })
          .populate('book')
          .exec(callback);
      },

      requested: function (callback) {
        Instance.find({
          requested_by: req.decoded._id,
        })
          .populate('book')
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        res.status(500).json('Error getting dashboard information');
      }
      res.status(200).json({ results });
    }
  );
};

module.exports.profile = function (req, res) {
  async.waterfall(
    [
      function (callback) {
        User.findOne({ username: req.params.username }, { password: 0 }).exec(
          callback(null, user)
        );
      },

      function (user, callback) {
        Instance.find({
          user: user,
        }).exec(null, callback);
      },
    ],
    function (err, results) {
      if (err) {
        res
          .status(500)
          .json('Error finding profile for ' + req.params.username);
      }
      res.status(200).json({ results });
    }
  );
};
