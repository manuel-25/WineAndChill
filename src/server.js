import server from './app.js'
import config from './config/config.js'
import { initializeSockets } from './sockets.js'

const PORT = config.PORT
const ready = () => console.log('Server running on Port: ' + PORT)
const http_server = server.listen(PORT, ready)


initializeSockets(http_server)

