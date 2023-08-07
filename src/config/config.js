import mongoose from 'mongoose'
import commander from '../utils/commander.js'
import dotenv from 'dotenv'
import MongoSingleton from './MongoSingleton.js'


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
    connectDB: async () => MongoSingleton.getInstance()
}

export default config