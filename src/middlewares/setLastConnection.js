import { userService } from "../Service/index.js"

async function setLastConnection(req, res, next) {
    try {
        console.log(req.user)
        const userId = req.user._id
        const date = new Date().toLocaleString()
        console.log(date)
        let response = await userService.setLasConnection(userId, date)
        console.log(response)
        next()
    } catch (err) {
        next(err)
    }
}

export default setLastConnection