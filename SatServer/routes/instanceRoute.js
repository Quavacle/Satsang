var express = require('express');
var router = express.Router();
var instanceController = require('../Controllers/instanceController');
const authController = require('../Controllers/authController');

router.get('/', instanceController.index);
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
router.put(
  ':/instanceId/return',
  authController.authenticate,
  instanceController.return
);
router.put(
  ':/instanceId/accept_return',
  authController.authenticate,
  instanceController.accept_return
);

module.exports = router;
