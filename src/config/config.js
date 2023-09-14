import mongoose from 'mongoose'
import commander from '../utils/commander.js'
import dotenv from 'dotenv'
import MongoSingleton from './MongoSingleton.js'


const { mode } = commander.opts()

if (mode === 'test') {
    process.env.NODE_ENV = 'test';
} else {
    process.env.NODE_ENV = mode === 'development' ? 'development' : 'production';
}

dotenv.config({
    path: `./.env.${process.env.NODE_ENV}`
})

const config = {
    MONGO_URL: process.env.LINK_MONGO           || '',
    SECRET_JWT: process.env.SECRET_JWT          || '',
    SECRET_SESSION: process.env.SECRET_SESSION  || '',
    SECRET_COOKIE: process.env.SECRET_COOKIE    || '',
    PERSISTENCE: process.env.PERSISTENCE             ,
    PORT: process.env.PORT                      || 8080,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    TWILIO_SID: process.env.TWILIO_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE: process.env.TWILIO_PHONE,
    PRIVATE_PHONE: process.env.PRIVATE_PHONE,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    connectDB: async () => MongoSingleton.getInstance()
}

export default config