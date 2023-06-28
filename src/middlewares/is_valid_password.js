import { compareSync } from "bcrypt"
import UserModel from "../models/user.model.js"

export default async function(req, res, next) {
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (user) {
        let verified = compareSync(
            req.body.password,
            user.password
        )
        if (verified) {
            delete req.body.password
            return next()
        }
    }
    return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
    })
  } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
  }
}
