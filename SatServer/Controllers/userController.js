const User = require('../Models/userModel');
const Instance = require('../Models/instanceModel');
const async = require('async');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Main dashboard get, returning user info, books owned, borrowed, and requested
module.exports.dashboard = function (req, res) {
  if (req.decoded._id) {
    async.parallel(
      {
        user: function (callback) {
          User.findById({ _id: req.decoded._id }, { password: 0 }).exec(
            callback);
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
        console.log('hit');
        res.status(200).json({ results });

      }
    );
  }
};

// Public profile get
module.exports.profile = function (req, res) {
  async.waterfall(
    // Get user profile
    [
      function (callback) {
        User.findOne({ username: req.params.username }, { password: 0 }).exec(
          function (user) {
            callback(null, user);
          }
        );
      },
      // Get user's owned books
      function (user, callback) {
        if (user) {

          Instance.find({
            user: user._id,
          }).exec(function (instance) {

            callback(null, user, instance);
          });
        } else {
          return true
        }
      }
    ],
    function (err, results) {
      if (err) {
        res
          .status(500)
          .json('Error finding profile for ' + req.params.username);
      }
      res.status(200).json(results);
    }
  );
};

module.exports.info = function (req, res) {
  User.findById({ _id: req.params.userId }).exec(
    function (err, user) {
      if (err) {
        return res.status(500).json('Error retrieving user info')
      }
      res.status(200).json(user);
    }
  )
}
// Update user, password update handled in seperate function
module.exports.update = function (req, res) {
  User.findOneAndUpdate(
    { user: req.decoded._id },
    { $set: req.body },
    function (err, user) {
      if (err) {
        res.status(500).json('Error updating user');
      }
      res.status(200).json(user);
    }
  );
};

// Delete user
module.exports.delete = function (req, res) {
  User.findByIdAndDelete({ _id: req.decoded._id }, function (err, user) {
    if (err) {
      res.status(500).json('Error deleting account');
    }
    if (!user.comparePassword(req.body.password)) {
      res.status(401).json('Password incorrect');
    }
  });
};
