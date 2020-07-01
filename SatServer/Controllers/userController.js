const User = require('../Models/userModel');
const Instance = require('../Models/instanceModel');

module.exports.dashboard = function (req, res) {
  User.findById({ _id: req.decoded._id }, { password: 0, _id: 0 }, function (
    err,
    user
  ) {
    if (err) {
      res.status(500).json('Error pulling user information');
    }
    // res.status(200).json(user);
  });

  Instance.find({
    $or: [
      { user: req.decoded._id },
      { borrowed_by: req.decoded._id },
      { requested_by: req.decoded._id },
    ],
  })
    .populate('book')
    .exec(function (err, instances) {
      if (err) {
        return next(err);
      }
      const seperatedInstances = splitInstances(instances, req.decoded._id);
      res.status(200).json({ instances: seperatedInstances });
    });
};

function splitInstances(instances, userId) {
  const owned = {};
  const borrowed = {};
  const requested = {};
  let i = 0;

  while (i < instances.length) {
    if (instances[i].user == userId) {
      owned[i] = instances[i];
    } else if (instances[i].borrowed_by == userId) {
      borrowed[i] = instance[i];
    } else if (instances[i].requested_by == userId) {
      requested[i] = instance[i];
    }
    i++;
  }
  return { owned: owned, borrowed: borrowed, requested: requested };
}
