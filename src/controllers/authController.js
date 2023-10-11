import { userService } from "../Service/index.js"
import { resetPassword } from "../utils/sendEmail.js"
import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import { hashSync, genSaltSync, compareSync } from "bcrypt"

class authController {
    register(req, res) {
        return res.status(200).send({
            success: true,
            message: 'Registration succesful!',
            payload: req.user
        })
    }
    failRegister(req, res) {
        res.status(400).send({
            success: false,
            message: 'Registration failed.'
        })
    }
    async signIn(req, res, next) {
        res.status(200).send({
            success: true
        })
    }
    failSignIn(req, res) {
        res.status(400).json({
            success:false,
            message: 'Invalid credentials'
        })
    }
    githubCallback(req, res) {
        const returnUrl = req.cookies.returnTo ?? '/products'
        res.clearCookie('returnTo')
        res.status(200).redirect(returnUrl)
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
            const emailExists = await userService.getByEmail(email)
            if(!emailExists) {
                return res.status(400).send({
                    success: false,
                    message: 'Invalid email'
                })
            }
            const resetToken = jwt.sign({email: email}, config.SECRET_JWT, { expiresIn: '1h' })
            const resetLink = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`

            await resetPassword(email, resetLink) //Send email
            return res.status(200).send({
                success: true,
                message: 'Email sent succesfully!'
            })
        } catch(err) {
            next(err)
        }
    }

    async resetPassword(req, res, next) {
        const { userEmail } = req.body
        let newPassword = req.body.password
        try {
            const user = await userService.getByEmail(userEmail)
            const originalHashPassword = user.password
            const newHashPassword = hashSync(newPassword, genSaltSync(10))
            if (compareSync(newPassword, originalHashPassword)) {
                return res.status(400).send({
                    success: false,
                    message: 'Passwords must be different!'
                })
            }
            const updatedUser = await userService.setPassword(userEmail, newHashPassword)
            delete req.body.password
            newPassword = undefined
            if(updatedUser) { 
                return res.status(200).send({
                    success: true,
                    message: 'Password changed!'
                }) 
            } else {
                return res.status(500).send({
                    success: false,
                    message: 'Unexpected error: Please try again.'
                }) 
            }

        } catch (err) {
            next(err)
        }
    }

    current(req, res, next) {
        try {
            const cookie = req.cookies['token']
            const user = jwt.verify(cookie, config.SECRET_JWT)
            if(user) {
                return res.send({ success: true, payload: user })
            } else {
                return res.send({ success: false })
            }
        } catch(err) {
            return res.send({ success: false, message: err })
        }
    }
}

export default new authController()