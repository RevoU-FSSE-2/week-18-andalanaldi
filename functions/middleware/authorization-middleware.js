const jwt = require('jsonwebtoken')
const { JWT_SIGN } = require('../config/jwt.js')

// const authorizationMiddleware = (req, res, next) => {
//     const authHeader = req.headers.authorization

//     if (!authHeader) {
//         res.status(401).json({ error: 'Unauthorized' })
//       } else {
//         const token = authHeader.split(' ')[1]

//         try {
//           const decodedToken = jwt.verify(token, JWT_SIGN)
//           if (decodedToken.role === 'client' || decodedToken.role === 'broker')  {
//             next()
//           } else {
//             res.status(401).json({ error: 'Unauthorized' })
//           }
//         } catch (error) {
//           res.status(400).json({ error: error.message })
//         }
//     }
// }

const authorizationMiddleware = ({ roles }) => (req, res, next) => { // roles - array of string
  if (!roles.includes(req.role)) { //includes is to check whether roles element have re.role, ! is reversed, ex roles contatains user and admin and req.role = admin
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

module.exports = authorizationMiddleware