var express = require('express');
var router = express.Router();
var instanceController = require('../Controllers/instanceController');
const authController = require('../Controllers/authController');

router.get('/list', instanceController.index);
router.post('/create', authController.authenticate, instanceController.create);
router.put(
  '/:instanceId/request',
  authController.authenticate,
  instanceController.request
);
router.put(
  '/:instanceId/accept',
  authController.authenticate,
  instanceController.accept_request
);
router.put(
  '/:instanceId/deny',
  authController.authenticate,
  instanceController.deny_request
);

module.exports = router;
