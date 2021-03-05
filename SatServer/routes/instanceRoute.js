var express = require('express');
var router = express.Router();
var instanceController = require('../Controllers/instanceController');
const authService = require('../Services/authService');
const validation = require('../Services/validation');
const bookController = require('../Controllers/bookController');

router.post(
  '/create',
  authService.authenticate,
  validation.instance,
  bookController.create,
  instanceController.create
);
router.put('/:instanceId/update',
  authService.authenticate,
  instanceController.update
)
router.delete('/:instanceId/delete',
  authService.authenticate,
  instanceController.delete
)

// Public index
router.get('/index',
  instanceController.index)

// Owner index
router.get('/owned',
  authService.authenticate,
  instanceController.ownerIndex)

// Owner Detail
router.get('/:instanceId/detail',
  authService.authenticate,
  instanceController.ownerDetail
)
// Public detail
router.get('/:instanceId',
  instanceController.publicDetail
)

router.put(
  '/:instanceId/request',
  authService.authenticate,
  instanceController.request
);
router.put(
  '/:instanceId/accept',
  authService.authenticate,
  instanceController.acceptRequest
);
router.put(
  '/:instanceId/deny',
  authService.authenticate,
  instanceController.denyRequest
);
router.put(
  '/:instanceId/return',
  authService.authenticate,
  instanceController.return
);
router.put(
  '/:instanceId/accept_return',
  authService.authenticate,
  instanceController.acceptReturn
);

module.exports = router;
