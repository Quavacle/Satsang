var express = require('express');
var router = express.Router();
var authController = require('../Controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
module.exports = router;
