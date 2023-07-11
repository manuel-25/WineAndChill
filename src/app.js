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
import cookieParser from "cookie-parser"
import expressSession from 'express-session'
import mongoStore from "connect-mongo"
import passport from "passport"
import initializePassport from './config/passport_local.js'

const server = express()

//Template engine
server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/views')


//Middlewares
server.use(cookieParser(process.env.SECRET_COOKIE))
server.use(expressSession({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.LINK_MONGO,
        ttl: 10000
    }),
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 días
    }
}))
server.use('/public', express.static('public'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use('/', router)
server.use(errorHandler)
server.use(notFoundHandler)
server.use(logger('dev'))
server.use(methodOverride('_method'))
initializePassport()
server.use(passport.initialize())
server.use(passport.session())


mongoose.connect(process.env.LINK_MONGO)
.then(() => console.log('database connected'))
.catch((err) => console.log(err))

export default server