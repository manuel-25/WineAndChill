import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export default function(req, res, next) {
    let token = null
    const authHeader = req.headers.authorization

    if(authHeader && authHeader.startsWith('Bearer')) token = authHeader.slice(7)
    if(!token) token = req.cookies.token
    if(token) {
      try {
        const decodedToken = jwt.verify(token, config.SECRET_JWT)
        const user = {
            _id: decodedToken._id,
            name: decodedToken.name,
            photo: decodedToken.photo,
            email: decodedToken.email,
            role: decodedToken.role,
            age: decodedToken.age,
            cartId: decodedToken.cartId
        }
        req.token = user
      } catch (error) {
          next(error)
      }
    }
    next()
}