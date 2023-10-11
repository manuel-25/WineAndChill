import winston from 'winston'

const customLevelOption = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'yellow',
        warning: 'yellow',
        info: 'blue',
        debug: 'white'
    }
}

const logger = winston.createLogger({
    levels: customLevelOption.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOption.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './errors.log', 
            level: 'warning',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(info => {
                    return `[${info.timestamp}] [${info.level.toUpperCase()}] - ${info.message}`;
                })
            )
        })
    ]
})

const addLogger = (req, res, next) => {
    req.logger = logger
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`)
    next()
}

export {
    addLogger,
    logger
}