const express = require('express')
const router = express.Router()
const authService = require('../Services/authService')
const bookController = require('../Controllers/bookController')

router.get('/index', bookController.index)
router.post('/create', authService.authenticate, bookController.create)
router.get('/:bookId', bookController.detail)

module.exports = router
