const User = require('../Models/userModel');

exports.dashboard = function (req, res, next) {
  res.json({ auth: true, user: req.params.id });
};
