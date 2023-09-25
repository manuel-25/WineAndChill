import { userService } from "../Service/index.js"

async function setLastConnection(req, res, next) {
    try {
        const userId = req.user._id
        const date = new Date().toLocaleString()
        await userService.setLasConnection(userId, date)
        next()
    } catch (err) {
        next(err)
    }
}

export default setLastConnection