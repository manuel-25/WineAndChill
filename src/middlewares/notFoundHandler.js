import { logger } from "../config/logger.js"

const notFoundHandler = (req, res, next) => {
    logger.error(`Uncaught error: ${req.method} ${req.url}`)
    return res.status(404).json({
        status: 404,
        method: req.method,
        path: req.url,
        response: 'not found'
    })
}

export default notFoundHandler