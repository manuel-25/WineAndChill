import winston from 'winston'

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({level: 'http'})
    ]
})

const addLogger = (req, res, next) => {
    req.logger = logger
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`)
    next()
}

export {
    addLogger
}