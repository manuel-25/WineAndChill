import server from './app.js'
import { Server } from 'socket.io'
import carrito from './managers/CartManager.js'

const PORT = process.env.PORT || 8080 
const ready = () => console.log('Server Ready on Port: ' + PORT)
let http_server = server.listen(PORT, ready)
let socket_server = new Server(http_server)

let cartCounter = carrito.carts[0].products
const totalQuantity = cartCounter.reduce((total, product) => total + product.quantity, 0)

const colors = ['#E6B0AA', '#D7BDE2', '#85C1E9', '#73C6B6', '#FAD7A0', '#F5CBA7', '#AED6F1', '#A9DFBF', '#F9E79F', '#F8C471']
let chatLog = []
let usersLog = []

socket_server.on('connection', socket => {
    //console.log('Client Connected: ' + socket.id)
    socket.emit('cartCounter', totalQuantity)

    //Chat seccion
    socket.on('chat_Auth', (data) => {
        let userName = data.userName
        let userIsRegistered = usersLog.some(user => user.id == socket.id)
        if(!userIsRegistered) {
            let color = colors[Math.floor(Math.random() * colors.length)]
            usersLog.push({ id: socket.id, userName: userName, color })
        }
    })

    socket.on('new_message', (data) => {
        chatLog.push({...data, id: socket.id})
        socket_server.emit('allMessages', { chatLog, usersLog })
    })

    socket.on('load_messages', (data) => {
        socket.emit('allMessages', { chatLog, usersLog })
    })

})