import jwt from "jsonwebtoken"

export default (req, res, next) => {
    const token = jwt.sign({
        name: req.user.name,
        photo: req.user.photo,
        email: req.user.email,
        role: req.user.role,
        age: req.user.age,
        cartId: req.user.cartId
        },
        process.env.SECRET_JWT,
        { expiresIn: 1000*60*60*24*7}
    )
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true })
    next()
}