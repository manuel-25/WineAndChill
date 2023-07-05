import { Router } from 'express'
import User from '../../models/user.model.js'
import register_validator from '../../middlewares/register_validator.js'
import signinValidator from '../../middlewares/signin_validator.js'
import pass_is_8 from '../../middlewares/pass_is_8.js'
import is_same_pass from '../../middlewares/is_same_pass.js'
import create_hash from '../../middlewares/create_hash.js'
import is_valid_password from '../../middlewares/is_valid_password.js'
import passport from 'passport'

const router = Router()

router.post('/register',
    register_validator, pass_is_8, is_same_pass, create_hash,
    passport.authenticate(
        'register',
        { failureRedirect: '/api/auth/fail-register' }
    ),
    (req,res) => {
        return res.status(200).json({
            success: true,
            message: 'User created!'
        })
})

router.get('/fail-register', (req,res) => res.status(400).json({
    success: false,
    message: 'Registration failed.'
}))

router.post('/signin',
    signinValidator, 
    pass_is_8,
    passport.authenticate('signin', {failureRedirect:'/api/auth/fail-signin'}),
    is_valid_password,
    async(req, res, next) => {
    try {
        const { email } = req.body
        req.session.email = email,
        req.session.role = req.user.role
        return res.status(200).json({
            success: true,
            message: 'User signed in'
        })
    } catch(error) {
        next(error)
    }
})

router.get('/fail-signin', (req,res) => res.status(400).json({
    success:false,
    message: 'Signin failed'
}))

router.post('/signout', async(req, res, next) => {
    try{
        if (req.session.email) {
            req.session.destroy()
            return res.status(200).json({
                success: true,
                message: 'Signed out'
            })
        }
        return res.status(200).json({
            success: false,
            message: 'Not signed in'
        })
    } catch(error) {
        next(error)
    }
})

router.get('/github', passport.authenticate('github', { scope: ['user: email'] }), (req, res) => {})

router.get(
    '/github/callback', 
    passport.authenticate('github', { failureRedirect:'/api/auth/fail-register-github' }),
    (req, res) => res.status(200).redirect('/')
)

router.get('fail-register-github', (req, res) => res.status(403).json({
    success: false,
    message: 'Bad Authentication'
}))

export default router