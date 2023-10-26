const { Router } = require('express')
const { getAllIpoToDo, createIpoToDo, updateIpoToDo, approvalIpo } = require('../service/ipo-service.js')
const authorizationMiddleware = require('../middleware/authorization-middleware.js')

const ipoRouter = Router()

ipoRouter.get('/', authorizationMiddleware({ roles: ["broker"]}), getAllIpoToDo)
ipoRouter.post('/', authorizationMiddleware({ roles: ["client"]}), createIpoToDo)
ipoRouter.put('/:id', authorizationMiddleware({ roles: ["client"]}), updateIpoToDo)
ipoRouter.put('/:id', authorizationMiddleware({ roles: ["broker"]}), approvalIpo)

module.exports = ipoRouter