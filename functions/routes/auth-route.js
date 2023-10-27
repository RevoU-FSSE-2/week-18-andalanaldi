const { Router } = require('express')
const { register, login, logout } = require('../service/auth-service.js')

const authRouter = Router()

authRouter.post('/register', register)
// body('username').trim(), body('password').notEmpty().withMessage('cannot be empty').matches('/').withMessage('invalid format'),
// matches use regex
authRouter.post('/login', login)
authRouter.post('/logout', logout)

module.exports = authRouter