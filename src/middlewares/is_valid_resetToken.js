import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export default async function(req, res, next) {
    const token = req.params.token ?? null

    try {
        const decodedToken = jwt.verify(token, config.SECRET_JWT)
        req.resetToken = decodedToken.email
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.render('auth/forgotPassword', {
                title: 'Forgot Password',
                style: 'forgotPassword.css',
                script: 'forgotPassword.js',
                message: 'The password reset link has expired. Request a new link.'
            })
        }
        res.render('auth/forgotPassword', {
            title: 'Forgot Password',
            style: 'forgotPassword.css',
            script: 'forgotPassword.js',
            message: 'Invalid token'
        })
    }
}
