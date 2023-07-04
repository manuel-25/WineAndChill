import { compareSync } from "bcrypt"
// en req.user tengo los datos del usuario que vienen del passport

export default async function(req, res, next) {
    let verified = compareSync(
        req.body.password,
        req.user.password
    )
    if (verified) {
        //delete req.body.password
        return next()
    }
    return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
    })
}
