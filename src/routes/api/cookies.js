import { Router } from 'express'

const router = Router()

router.get('/set', (req, res) => {
    return res.status(200).cookie(
        'nombre_clave',
        'valor: 1',
        { maxAge: 500000, signed: true}
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