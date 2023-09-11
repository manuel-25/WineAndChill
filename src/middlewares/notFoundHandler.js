import { logger } from "../config/logger.js";

const notFoundHandler = (req, res, next) => {
    const errorMessage = `Route not found: ${req.method} ${req.url}`
    logger.error(errorMessage)

    return res.status(404).json({
        status: 404,
        method: req.method,
        path: req.url,
        message: 'Route not found',
        error: errorMessage,
    })
}

export default notFoundHandler


