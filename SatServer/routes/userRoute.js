var express = require('express');
var router = express.Router();
var userController = require('../Controllers/userController');
var authService = require('../Services/authService');
router.put('/:userId/update', userController.update);
router.delete('/:userId/delete', userController.delete);
router.get('/auth', authService.authenticate, userController.info);

module.exports = router;
