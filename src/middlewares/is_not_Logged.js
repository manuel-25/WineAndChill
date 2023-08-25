import  jwt  from "jsonwebtoken"
import config from "../config/config.js"

export default function(req, res, next) {
    if(req.cookies.token) {
        try {
            const decodedToken = jwt.verify(req.cookies.token, config.SECRET_JWT)
            return res.redirect('/')
        } catch (error) {
            next()
        }
    }
    next()
}