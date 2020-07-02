var express = require('express');
var router = express.Router();
var authService = require('../Services/authService');
var userController = require('../Controllers/userController');
var validation = require('../Services/validation');
router.get('/', function (req, res, next) {
  res.status(200).json('Welcome to Satsang');
});
module.exports = router;

// User routes
router.post('/register', validation.user, authService.register);
router.post('/login', validation.logIn, authService.login);
router.get('/dashboard', authService.authenticate, userController.dashboard);
router.get('/:username', userController.profile);
