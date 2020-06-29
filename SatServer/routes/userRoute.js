var express = require('express');
var router = express.Router();
var authController = require('../Controllers/authController');
var userController = require('../Controllers/userController');

router.get('/dashboard', authController.authenticate, userController.dashboard);

module.exports = router;
