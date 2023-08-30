import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export default async function(req, res, next) {
    const token = req.params.token ?? null

    try {
        const decodedToken = jwt.verify(token, config.SECRET_JWT)
        req.resetToken = decodedToken
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.render('error', {
                title: 'Error',
                style: 'error.css',
                script: '',
                error: {
                    status: 410,
                    message: 'The password reset link has expired. Request a new link.'
                }
            })
        }
        return res.render('error', {
            title: 'Error',
            style: 'error.css',
            script: '',
            error: {
                status: 410,
                message: 'Invalid token'
            }
        })
    }
}
