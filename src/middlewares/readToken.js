import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export default function(req, res, next) {
    console.log('req.cookies.token',req.cookies.token)
    if(req.cookies.token) {
        try {
            const decodedToken = jwt.verify(req.cookies.token, config.SECRET_JWT)
            const user = {
                name: decodedToken.name,
                photo: decodedToken.photo,
                email: decodedToken.email,
                role: decodedToken.role,
                age: decodedToken.age,
                cartId: decodedToken.cartId
            }
            req.token = user
        } catch (error) {
            return next(error)
        }
    }
    next()
}