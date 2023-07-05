import jwt from "jsonwebtoken"

export default (req, res, next) => {
    const token = jwt.sign(
        { email: req.body.email },
        process.env.SECRET_JWT,
        { expiresIn: 1000*60*60*24*7}
    )
    req.token = token
    next()
}