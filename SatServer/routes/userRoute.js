var express = require('express');
var router = express.Router();
var userController = require('../Controllers/userController');

router.put(':/userId/update', userController.update);
router.delete(':/userId/delete', userController.delete);

module.exports = router;
