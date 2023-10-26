const { Router } = require('express')
const { getAllIpoToDo, createIpoToDo, approvalIpo } = require('../service/ipo-service.js')
const authorizationMiddleware = require('../middleware/authorization-middleware.js')

const ipoRouter = Router()

ipoRouter.get('/', authorizationMiddleware({ roles: ["broker"]}), getAllIpoToDo)
ipoRouter.post('/', authorizationMiddleware({ roles: ["client"]}), createIpoToDo)
ipoRouter.put('/:id', authorizationMiddleware({ roles: ["broker"]}), approvalIpo)

module.exports = ipoRouter