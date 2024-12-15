const express = require('express')
const { getAllUsers, registerUser, login } = require('../controllers/userController')
const router = express.Router()

router.get('/all-users',getAllUsers)
router.post('/register',registerUser)
router.post('/login',login)

module.exports = router