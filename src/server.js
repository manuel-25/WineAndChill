import server from './app.js'
import { Server } from 'socket.io'
import carrito from './managers/CartManager.js'

const PORT = process.env.PORT || 8080 
const ready = () => console.log('Server Ready on Port: ' + PORT)

let http_server = server.listen(PORT, ready)
let socket_server = new Server(http_server)

let cartCounter = carrito.carts[0].products
const totalQuantity = cartCounter.reduce((total, product) => total + product.quantity, 0)
console.log(totalQuantity)

socket_server.on('connection', socket => {
    console.log('Client Connected: ' + socket.id)

    socket.emit('cartCounter', totalQuantity)
})