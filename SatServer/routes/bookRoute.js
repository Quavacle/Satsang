const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const bookController = require('../Controllers/bookController');

router.post('/create', authController.authenticate, bookController.create);
router.get('/', bookController.index);

module.exports = router;
