const { Router } = require('express')
const { getAllIpoToDo, createIpoToDo, updateIpoToDo, deleteIpoToDo, approvalIpo } = require('../service/ipo-service.js')
const authorizationMiddleware = require('../middleware/authorization-middleware.js')

const ipoRouter = Router()

ipoRouter.get('/', authorizationMiddleware({ roles: ["broker"]}), getAllIpoToDo)
ipoRouter.post('/', authorizationMiddleware({ roles: ["client"]}), createIpoToDo)
ipoRouter.put('/:id', authorizationMiddleware({ roles: ["client"]}), updateIpoToDo)
ipoRouter.delete('/:id', authorizationMiddleware({ roles: ["client"]}), deleteIpoToDo)
ipoRouter.put('/:id', authorizationMiddleware({ roles: ["broker"]}), approvalIpo)

module.exports = ipoRouter