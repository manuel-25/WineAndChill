import { Router } from 'express'

const router = Router()

router.get('/', async(req, res) => {
    return res.status(200).json({
        succes: true,
        email: req.session.email
    })
})

router.post('/login', async(req, res, next) => {
    try {
        const { email, password } = req.body
        req.session.email = email

        return res.status(200).json({
            success: true,
            message: email + ' ah iniciado sesion'
        })
    } catch (error) {
        next(error)
    }
})

router.post('/signout', async(req, res, next) => {
    try {
        req.session.destroy()
        return res.status(200).json({
            success: true,
            message: 'sesion cerrada'
        })
    } catch (error) {
        next(error)
    }
})

export default router