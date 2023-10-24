require('dotenv').config()

const express = require('express')
const databaseMiddleware = require('./middleware/database-middleware.js')
const authRouter = require('./routes/auth-route.js')
const ipoRouter = require('./routes/ipo-route.js')
const authMiddleware = require('./middleware/authentication-middleware.js')

const Validator = require('express-validator');
//OpenApi
// -openapi ga usah masuknya middleware n service controller, masuk body n custom message
// saldo nanti dulu aja
const app = express()
// due dates sampe jam 9, to do list status dan penugasan simple, lewat due dates ga bisa update, ga bisa ubah status
app.use(express.json())

app.use(databaseMiddleware)

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/auth', authRouter)
app.use('/ipo', authMiddleware, ipoRouter)

app.use((err, req, res, next) => {
    console.log(err, `<===== error =====`);
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors
    })
  })

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
