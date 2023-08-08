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
import { sendEmail } from '../../utils/sendEmail.js'
import { sendSms, sendWhatsapp } from '../../utils/sendSms.js'

const {
    register, failRegister,
    signIn, failSignIn,
    githubCallback, failGithub,
    signOut
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
    passport.authenticate('signin', {failureRedirect:'/api/auth/fail-signin'}),
    is_valid_password, createToken, signIn
)
router.get('/fail-signin', failSignIn)

router.get('/signout', signOut)

router.get('/github', passport.authenticate('github', { scope: ['user: email'] }), (req, res) => {})
router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect:'/api/auth/fail-register-github' }),
    createToken,
    githubCallback
)
router.get('fail-register-github', failGithub)

router.get('/confirm/email', async (req, res) => {
    await sendEmail()
    res.send('email enviado')
})

router.get('/confirm/sms', async (req, res) => {
    await sendWhatsapp()
    res.send('email enviado')
})

export default router