import { hashSync, genSaltSync } from "bcrypt"

export default function(req, res, next) {
    const { password } = req.body
    const hashPassword = hashSync(
        password,
        genSaltSync(10)
    )
    req.body.password = hashPassword
    return next()
}