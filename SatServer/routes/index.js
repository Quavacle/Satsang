var express = require('express');
var router = express.Router();
var authController = require('../Controllers/authController');
var userController = require('../Controllers/userController');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Satsang' });
});
module.exports = router;

// User routes
router.get('/dashboard', authController.authenticate, userController.dashboard);
router.post('/register', authController.register);
router.post('/login', authController.login);
