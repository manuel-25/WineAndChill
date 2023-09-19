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
    logger.info('Proceso primario, generando workers')

    const numCPUs = cpus().length
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        logger.info(`Worker ${worker.process.pid} died`)
    })
} else {
    const ready = () => logger.info(`Worker ${process.pid} listening on port ${PORT}`)
    
    // Crea la instancia de http.Server y pasa 'server' como manejador de solicitudes
    http_server = http.createServer(server)

    http_server.listen(PORT, ready)
    initializeSockets(http_server)
}
