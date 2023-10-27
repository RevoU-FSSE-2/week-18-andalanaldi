require('dotenv').config()

const express = require('express')
const databaseMiddleware = require('./middleware/database-middleware.js')
const authRouter = require('./routes/auth-route.js')
const ipoRouter = require('./routes/ipo-route.js')
const authMiddleware = require('./middleware/authentication-middleware.js')
const cors = require('cors');
const Validator = require('express-validator');

const app = express()

app.use(express.json())
app.use(cors())
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
