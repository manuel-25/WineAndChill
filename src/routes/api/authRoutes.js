import { Router } from 'express'
import register_validator from '../../middlewares/register_validator.js'
import signinValidator from '../../middlewares/signin_validator.js'
import pass_is_8 from '../../middlewares/pass_is_8.js'
import is_same_pass from '../../middlewares/is_same_pass.js'
import create_hash from '../../middlewares/create_hash.js'
import is_valid_password from '../../middlewares/is_valid_password.js'
import passport from 'passport'
import createToken from '../../middlewares/createToken.js'
import authController from '../../controllers/authController.js'
import is_valid_email from '../../middlewares/is_valid_email.js'
import is_valid_resetToken from '../../middlewares/is_valid_resetToken.js'
import setLastConnection from '../../middlewares/setLastConnection.js'

const {
    register, failRegister,
    signIn, failSignIn,
    githubCallback, failGithub,
    signOut, forgotPassword,
    resetPassword, current
} = authController

const router = Router()

router.post('/register',
    register_validator, pass_is_8, is_same_pass, create_hash,
    passport.authenticate('register', { failureRedirect: '/api/auth/fail-register' }), register
)
router.post('/fail-register', failRegister)

router.post('/signin',
    signinValidator, 
    pass_is_8,
    passport.authenticate('signin', {session: false, failureRedirect:'/api/auth/fail-signin'}),
    is_valid_password, createToken, setLastConnection, signIn
)
router.get('/fail-signin', failSignIn)

router.get('/signout', signOut)

router.get('/github', passport.authenticate('github', { scope: ['user: email'] }), (req, res) => {})

router.get(
    '/github/callback',
    passport.authenticate('github', { session: false, failureRedirect:'/api/auth/fail-register-github' }),
    createToken, setLastConnection,githubCallback
)
router.get('fail-register-github', failGithub)

router.post('/forgot-password', is_valid_email, forgotPassword)
router.post('/reset-password', is_same_pass, pass_is_8, resetPassword)

router.get('/current', current)

export default router