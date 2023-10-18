import { userService } from "../Service/index.js"
import { logger } from "../config/logger.js"

async function setLastConnection(req, res, next) {
    try {
        const userId = req.user._id
        const date = new Date().toISOString()
        const updated = await userService.update({_id: userId}, { last_connection: date})
        if(!updated) logger.error('Error updating last_connection middleware: ', updated)
        next()
    } catch (err) {
        next(err)
    }
}

export default setLastConnection