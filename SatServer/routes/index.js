var express = require('express');
var router = express.Router();
var authService = require('../Services/authService');
var userController = require('../Controllers/userController');
var validation = require('../Services/validation');
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Satsang' });
});
module.exports = router;

// User routes
router.get('/dashboard', authService.authenticate, userController.dashboard);
router.post('/register', validation.register, authService.register);
router.post('/login', validation.logIn, authService.login);
