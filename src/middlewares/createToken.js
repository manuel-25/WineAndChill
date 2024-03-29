import jwt from "jsonwebtoken"
import config from "../config/config.js"

export default (req, res, next) => {
    let rembemberMe = req.body.rememberMe === true
    const expiresIn = rembemberMe ? 1000*60*60*24 : 1000*60*60

    const token = jwt.sign({
        _id: req.user._id,
        name: req.user.name,
        photo: req.user.photo,
        email: req.user.email,
        role: req.user.role,
        age: req.user.age,
        cartId: req.user.cartId,
        chatColor: req.user.chatColor
        },
        config.SECRET_JWT,
        { expiresIn }
    )
    res.cookie('token', token, { maxAge: expiresIn, httpOnly: true })

    if(rembemberMe) {
        res.cookie('rememberMe', token, { maxAge: expiresIn, httpOnly: true })
    }
    next()
}