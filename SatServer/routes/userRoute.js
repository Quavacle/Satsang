var express = require('express');
var router = express.Router();
var authController = require('../Controllers/authController');
var userController = require('../Controllers/userController');

router.get('/:username', userController.profile);

module.exports = router;
