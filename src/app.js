import "dotenv/config.js"
import express from 'express'
import router from './routes/index.js'
import errorHandler from './middlewares/errorHandler.js'
import notFoundHandler from './middlewares/notFoundHandler.js'
import { __dirname } from './utils.js'
import logger from 'morgan'
import methodOverride from 'method-override'
import cookieParser from "cookie-parser"
import passport from "passport"
import initializePassport from './config/passport_local.js'
import session_data from "./middlewares/session_data.js"
import config from "./config/config.js"
import remember_me from "./middlewares/remember_me.js"
import { addLogger } from "./config/logger.js"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUiExpress from 'swagger-ui-express'

const server = express()

//Template engine
server.set('view engine', 'ejs')
server.set('views', __dirname + '/views')

//Middlewares
server.use(cookieParser(config.SECRET_COOKIE))
// Swagger Api Doc
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de Wine and Chill',
            description: 'Ecommerce de venta de vinos',
        },
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJSDoc(swaggerOptions)
server.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

server.use('/public', express.static('public'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(remember_me)
server.use(session_data)
server.use('/', router)

//Error handlers & logger
server.use(errorHandler)
server.use(notFoundHandler)
server.use(logger('dev'))
server.use(methodOverride('_method'))
server.use(addLogger)

//Passport
initializePassport()
server.use(passport.initialize())

//Database
config.connectDB()

export default server


