import { logger } from "../config/logger.js";

const notFoundHandler = (req, res, next) => {
    const errorMessage = `Route not found: ${req.method} ${req.url}`
    logger.debug(errorMessage)
    return res.render('error', {
        title: 'Error',
        style: 'error.css',
        script: '',
        error: {
            status: 404,
            message: errorMessage
        }
    })
}

export default notFoundHandler


