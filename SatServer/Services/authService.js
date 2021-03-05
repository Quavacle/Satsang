const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const privateKey = process.env.SECRET;

module.exports.register = function (req, res) {
  User.create(
    {
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    function (err, user) {
      if (err) {
        return res.status(500).json('Issue registering user' + err);
      }
      const token = jwt.sign(
        { id: user._id, username: user.username },
        privateKey,
        {
          expiresIn: '5h',
        }
      );
      res.status(201).json({ auth: true, token: token, id: user._id });
    }
  );
};

module.exports.login = function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return next(err);
    if (!user) {
      res.status(401).json({
        auth: false,
        message: 'Login failed: Username/Email not found',
      });
    } else if (user) {
      if (!user.comparePassword(req.body.password)) {
        res.status(407).json({
          auth: false,
          message: 'Login failed: Incorrect username/email or password',
        });
      } else {
        const signedToken = jwt.sign(
          {
            username: req.username,
            id: user._id,
          },
          privateKey,
          { expiresIn: '5h' }
        );
        res.status(200).json({
          auth: true,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
          },
          token: signedToken,
        });
      }
    }
  });
};

module.exports.authenticate = function (req, res, next) {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
  }

  if (token) {
    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        res.status(401).json('Token invalid' + err);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).json('Token not provided');
  }
};
