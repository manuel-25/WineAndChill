import server from './app.js'
import config from './config/config.js'
import { initializeSockets } from './sockets.js'
import { logger } from './config/logger.js'
import cluster from 'cluster'
import { cpus } from 'os'
import http from 'http'

const PORT = config.PORT

let http_server

if (cluster.isPrimary) {
    const numCPUs = cpus().length
    let workerCount = 0

    for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork()
        worker.on('online', () => {
            workerCount++
            if (workerCount === numCPUs) {
                logger.info(`Se han creado todos los workers (${numCPUs}) listening on port ${PORT}`)
            }
        })
    }

    cluster.on('exit', (worker, code, signal) => {
        logger.info(`Worker ${worker.process.pid} died`)
    })
} else {
    const ready = () => logger.debug(`Worker ${process.pid} listening on port ${PORT}`)
    // Crea la instancia de http.Server
    http_server = http.createServer(server)
    http_server.listen(PORT, ready)
    // Inicializo los sockets aca
    initializeSockets(http_server)
}