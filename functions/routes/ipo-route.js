const { Router } = require('express')
const { getAllTrans, createTrans, approvalTrans } = require('../service/ipo-service.js')
const authorizationMiddleware = require('../middleware/authorization-middleware.js')

const ipoRouter = Router()

ipoRouter.get('/', getAllTrans)
ipoRouter.post('/', createTrans)
ipoRouter.put('/:id', authorizationMiddleware, approvalTrans)

module.exports = ipoRouter