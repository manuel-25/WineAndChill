import { Router } from 'express'
import User from '../../models/user.model.js'
import register_validator from '../../middlewares/register_validator.js'
import signinValidator from '../../middlewares/signin_validator.js'
import pass_is_8 from '../../middlewares/pass_is_8.js'
import is_same_pass from '../../middlewares/is_same_pass.js'
import create_hash from '../../middlewares/create_hash.js'
import is_valid_password from '../../middlewares/is_valid_password.js'

const router = Router()

router.post('/register',
    register_validator, pass_is_8, is_same_pass, create_hash,
    async(req,res,next) => {
    try {
        const { email } = req.body
        const exists = await User.findOne({ email })
        if(exists) {
            return res.status(200).json({
                success: false,
                message: 'The email is already registered.'
            })
        }

        await User.create(req.body)
        return res.status(200).json({
            success: true,
            message: 'User created!'
        })
    } catch(error) {
        next(error)
    }
})

router.post('/signin', signinValidator, pass_is_8, is_valid_password,
    async(req, res, next) => {
    try {
        const { email } = req.body
        const one = await User.findOne({ email })
        if (!one) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }
        req.session.email = email,
        req.session.role = one.role
        return res.status(200).json({
            success: true,
            message: 'User signed in'
        })
    } catch(error) {
        next(error)
    }
})

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

export default router