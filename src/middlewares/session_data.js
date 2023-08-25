import jwt from 'jsonwebtoken'

export default function(req, res, next) {
    let user
    if(req.cookies.token) {
        try {
            const decodedToken = jwt.verify(req.cookies.token, process.env.SECRET_JWT)
            user = {
                email: decodedToken.email,
                role: decodedToken.role
            }
            res.locals.user = user
        } catch (error) {
            next(error)
        }
    }
    next()
}