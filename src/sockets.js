import { Server } from 'socket.io'
import jwt, { verify } from 'jsonwebtoken'
import config from './config/config.js'
import { chatService, userService, cartService } from './Service/index.js'
import { logger } from './config/logger.js'

const colors = ['#E6B0AA', '#D7BDE2', '#85C1E9', '#73C6B6', '#FAD7A0', '#F5CBA7', '#AED6F1', '#A9DFBF', '#F9E79F', '#F8C471']
let color

export function initializeSockets(http_server) {
    const socket_server = new Server(http_server, {
        transports: ['websocket'],
    })

    socket_server.on('connection', async socket => {
        //TOKEN
        const token = verifyToken(socket)

        //Cart counter
        const getCartCounter = async () => {
            try {
                if (!token) return 0
                const userCart = await cartService.getById(token.cartId)
                if (!userCart) return 0
                return userCart.products.reduce((total, product) => total + product.quantity, 0)
            } catch(err) {
                logger.error('Error al verificar el token:', err)
            }
        }
        const cartCounter = await getCartCounter()
        socket.emit('cartCounter', cartCounter)


        //CHAT SECTION
        //Load messages 
        try {
            const chatFromDB = await chatService.getAll()
            socket.emit('allMessages', { chatFromDB })
        } catch(err) {
            logger.error('Socket Error: allMessages ', err)
        }

        //Send user data
        if (token) {
            const username = token.name;
            try {
                if (token.chatColor === null) {
                    color = colors[Math.floor(Math.random() * colors.length)]
                    await userService.setColor(token.id, color)
                } else {
                    color = await userService.getColorById(token.id)
                }
            } catch (err) {
                logger.error('Socket Error: chatAuth ', err)
            }
            socket.emit('chatAuth', { username, color })
        }

    
        socket.on('new_message', async (data) => {
            try {
                const dataToSend = {...data, socketId: socket.id, color}
                await chatService.create(dataToSend)
                const chatFromDB = await chatService.getAll()
                socket_server.emit('allMessages', { chatFromDB })
            } catch(err) {
                logger.error('Socket Error: new_message', err)
            }
        })
    
        try {
            const chatFromDB = await chatService.getAll()
            socket.emit('allMessages', { chatFromDB })
        } catch(error) {
            logger.error('Socket Error: allMessages) ', error)
        }
    
    })
}

function verifyToken(socket) {
    let token
    const { cookie } = socket.handshake.headers
    const cookiePairs = cookie.trim().split(';')
    for (const cookiePair of cookiePairs) {
        const [name, value] = cookiePair.trim().split('=')
        if (name === 'token') {
            token = value
            break
        }
    }
    if (token) {
        try {
            const decodedToken = jwt.verify(token, config.SECRET_JWT)
            return decodedToken
        } catch (err) {
            logger.error('Error al verificar el token: Socket', err)
        }
    }
    return null
}