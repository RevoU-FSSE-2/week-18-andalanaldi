const { Router } = require('express')
const { register, login } = require('../service/auth-service.js')

const authRouter = Router()

authRouter.post('/register', register)
// body('username').trim(), body('password').notEmpty().withMessage('cannot be empty').matches('/').withMessage('invalid format'),
// matches use regex
authRouter.post('/login', login)

module.exports = authRouter