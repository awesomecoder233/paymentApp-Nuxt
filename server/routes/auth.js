const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/login', authController.postLogin)
router.get('/user', authController.getUser)

module.exports = router
