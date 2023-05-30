import "dotenv/config.js"
import express from 'express'
import router from './routes/index.js'
import errorHandler from './middlewares/errorHandler.js'
import notFoundHandler from './middlewares/notFoundHandler.js'
import { engine } from 'express-handlebars'
import { __dirname } from './utils.js'
import logger from 'morgan'
import methodOverride from 'method-override'
import mongoose from 'mongoose'

const server = express()

//Template engine
server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/views')


//Middlewares
server.use('/public', express.static('public'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use('/', router)
server.use(errorHandler)
server.use(notFoundHandler)
server.use(logger('dev'))
server.use(methodOverride('_method'))

mongoose.connect('mongodb+srv://manu:onita0102@cluster0.fgglgec.mongodb.net/WineAndChill')
.then(() => console.log('database connected'))
.catch((err) => console.log(err))

export default server