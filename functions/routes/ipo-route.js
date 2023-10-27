const { Router } = require('express')
const { getAllIpoToDo, createIpoToDo, updateIpoToDo, deleteIpoToDo, approvalIpo } = require('../service/ipo-service.js')
const authorizationMiddleware = require('../middleware/authorization-middleware.js')

const ipoRouter = Router()

ipoRouter.get('/', authorizationMiddleware({ roles: ["broker", "client"]}), getAllIpoToDo)
ipoRouter.post('/new', authorizationMiddleware({ roles: ["client"]}), createIpoToDo)
ipoRouter.put('/update/:id', authorizationMiddleware({ roles: ["client"]}), updateIpoToDo)
ipoRouter.delete('/delete/:id', authorizationMiddleware({ roles: ["client"]}), deleteIpoToDo)
ipoRouter.put('/approval/:id', authorizationMiddleware({ roles: ["broker"]}), approvalIpo)

module.exports = ipoRouter