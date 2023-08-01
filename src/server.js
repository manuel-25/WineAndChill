import server from './app.js'
import { Server } from 'socket.io'
import CartManager from './dao/models/CartManager.js'
import ChatModel from './models/chats.model.js'
import config from './config/config.js'

const PORT = config.PORT
const ready = () => console.log('Server Ready on Port: ' + PORT)
const http_server = server.listen(PORT, ready)
let socket_server = new Server(http_server)

//let cartCounter = CartManager
//const totalQuantity = cartCounter.reduce((total, product) => total + product.quantity, 0)

const colors = ['#E6B0AA', '#D7BDE2', '#85C1E9', '#73C6B6', '#FAD7A0', '#F5CBA7', '#AED6F1', '#A9DFBF', '#F9E79F', '#F8C471']
let chatLog = []
let usersLog = []

socket_server.on('connection', socket => {
    //socket.emit('cartCounter', totalQuantity)

    //Chat seccion
    socket.on('chat_Auth', (data) => {
        const username = data.username
        const userIsRegistered = usersLog.some(user => user.id == socket.id)
        if(!userIsRegistered) {
            const color = colors[Math.floor(Math.random() * colors.length)]
            usersLog.push({ id: socket.id, username , color })
        }
    })

    socket.on('new_message', async (data) => {
        try {
            const dataToSend = {...data, socketId: socket.id}
            await ChatModel.create(dataToSend)
            chatLog.push(dataToSend)
            //console.log('chat log: ',chatLog)
            socket_server.emit('allMessages', { chatLog, usersLog })
        } catch(error) {
            console.log('Socket Error: ', error)
        }
    })

    socket.on('load_messages', async () => {
        try {
            const chatFromDB = await ChatModel.find()
            chatLog = chatFromDB
            socket.emit('allMessages', { chatLog, usersLog })
        } catch(error) {
            console.log('Socket Error: ', error)
        }
    })

})