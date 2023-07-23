import mongoose from 'mongoose'
import commander from '../utils/commander.js'
import dotenv from 'dotenv'

const { mode } = commander.opts()

dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production'
})

const config = {
    MONGO_URL: process.env.LINK_MONGO           || '',
    SECRET_JWT: process.env.SECRET_JWT          || '',
    SECRET_SESSION: process.env.SECRET_SESSION  || '',
    SECRET_COOKIE: process.env.SECRET_COOKIE    || '',
    PORT: process.env.PORT                      || 8080,
    connectDB: async () => {
        try{
            await mongoose.connect(process.env.LINK_MONGO)
            console.info('Database connected')
        } catch(err) {
            console.error('Conection error',err)
        }
    }
}

export default config