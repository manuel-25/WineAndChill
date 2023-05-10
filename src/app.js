import express from 'express'
import router from './routes/index.js'

const server = express()

const PORT = 8080
let ready = () => console.log('Server Ready on Port: ' + PORT)

server.listen(PORT, ready)
server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use('/static', express.static('public'))
server.use('/', router)

