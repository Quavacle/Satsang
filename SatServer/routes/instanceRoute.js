var express = require('express');
var router = express.Router();
var instanceController = require('../Controllers/instanceController');
const authController = require('../Controllers/authController');

router.post('/create', authController.authenticate, instanceController.create);
router.put('/:instanceId/request', instanceController.request);
router.put('/:instanceId/accept', instanceController.accept_request);
router.put('/:instanceId/deny', instanceController.deny_request);

module.exports = router;
