import { Router } from 'express'

const router = Router()

router.get('/set/:email', (req, res) => {
    const { email } = req.params
    return res.status(200).cookie(
        'user',
        email,
        { maxAge: 500000*999, signed: true}
    ).json({
        success: true,
        message: 'cookie seteada'
    })
})

router.get('/get', (req, res) => {
    return res.status(200).json({
        succes: true,
        cookies: req.signedCookies
    })
})

router.get('/delete', (req, res) => {
    return res.status(200).clearCookie('nombre_clave').json({
        succes: true,
        message: 'Cookie borrada'
    })
})

export default router