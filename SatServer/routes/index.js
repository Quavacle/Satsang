var express = require('express');
var router = express.Router();
var authService = require('../Services/authService');
var userController = require('../Controllers/userController');
var bookController = require('../Controllers/bookController')
module.exports = router;

// User routes
router.post('/register', authService.register);
router.post('/login', authService.login);
router.get('/dashboard', authService.authenticate, userController.dashboard);
router.get('/:username', userController.profile);
