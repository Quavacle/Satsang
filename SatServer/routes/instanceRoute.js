var express = require('express');
var router = express.Router();
var instanceController = require('../Controllers/instanceController');
const authService = require('../Services/authService');
const validation = require('../Services/validation');
const bookController = require('../Controllers/bookController');

router.get('/', instanceController.index);
router.get('/:instanceId', instanceController.detail);
router.post(
  '/create',
  authService.authenticate,
  validation.instance,
  bookController.create,
  instanceController.create
);
router.put(
  '/:instanceId/request',
  authService.authenticate,
  instanceController.request
);
router.put(
  '/:instanceId/accept',
  authService.authenticate,
  instanceController.accept_request
);
router.put(
  '/:instanceId/deny',
  authService.authenticate,
  instanceController.deny_request
);
router.put(
  ':/instanceId/return',
  authService.authenticate,
  instanceController.return
);
router.put(
  ':/instanceId/accept_return',
  authService.authenticate,
  instanceController.accept_return
);

module.exports = router;
