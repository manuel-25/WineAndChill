import server from './app.js'
import config from './config/config.js'
import { initializeSockets } from './sockets.js'
import { logger } from './config/logger.js'

const PORT = config.PORT
const ready = () => logger.info('Server running on Port: ' + PORT)
const http_server = server.listen(PORT, ready)


initializeSockets(http_server)

