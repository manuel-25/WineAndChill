import { userService } from "../Service/index.js"
import { resetPassword } from "../utils/sendEmail.js"
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

class authController {
    register(req, res) {
        return res.status(200).send({
            success: true,
            message: 'User created!'
        })
    }
    failRegister(req, res) {
        res.status(400).send({
            success: false,
            message: 'Registration failed.'
        })
    }
    async signIn(req, res, next) {
        return res.status(200).send({ success: true })
    }
    failSignIn(req, res) {
        res.status(400).json({
            success:false,
            message: 'Signin failed'
        })
    }
    githubCallback(req, res) {
        res.status(200).redirect('/products')
    }
    failGithub(req, res) {
        res.status(403).json({
            success: false,
            message: 'Bad Authentication'
        })
    }
    signOut(req, res) {
        delete req.user
        res.clearCookie('token')
        res.clearCookie('rememberMe')
        res.redirect('/login')
    }

    async forgotPassword(req, res, next) {
        try {
            const email = req.body.email
            const emailExists = await userService.findByEmail(email)
            console.log('email exists: ', emailExists)
            if(!emailExists) {
                return res.status(400).send({
                    success: false,
                    message: 'Invalid email'
                })
            }
            const resetToken = jwt.sign({email: email}, config.SECRET_JWT, { expiresIn: '1h' })
            const resetLink = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`

            console.log(resetLink)
            await resetPassword(email, resetLink)
            return res.status(200).send({
                success: true,
                message: 'Email sent succesfully!'
            })
        } catch(err) {
            next(err)
        }
    }

    async resetPassword(req, res, next) {
        
    }
}

export default new authController()