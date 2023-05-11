import server from './app.js'
import { Server } from 'socket.io'

const PORT = 8080
const ready = () => console.log('Server Ready on Port: ' + PORT)

let http_server = server.listen(PORT, ready)
let socket_server = new Server(http_server)

let contador = 0

socket_server.on(
    'connection',     //identificador del mensaje
    socket => {
        console.log('Client Connected: ' + socket.id)    
        socket.on(
            'primera conexion',
            data => {
                contador++
                socket.emit(
                    'contador',
                    { contador }
                )
            }
        )
    }
)