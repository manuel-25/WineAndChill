import jwt from 'jsonwebtoken'
import config from '../config/config.js'

//Creates jwt sign 'token' if rememberMe cookie exists
export default function(req, res, next) {
    if(req.cookies?.rememberMe) {
        try {
            const decodedToken = jwt.verify(req.cookies.rememberMe, config.SECRET_JWT)
            const expiresIn = 1000 * 60 * 60 * 24 * 7
    
            const token = jwt.sign(
                {
                  name: decodedToken.name,
                  photo: decodedToken.photo,
                  email: decodedToken.email,
                  role: decodedToken.role,
                  age: decodedToken.age,
                  cartId: decodedToken.cartId,
                },
                process.env.SECRET_JWT,
                { expiresIn }
            )
            res.cookie("token", token, { maxAge: expiresIn, httpOnly: true })
        } catch(error) {}
    }
    next()
}