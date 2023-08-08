import twilio from 'twilio'
import config from '../config/config.js'

const client = twilio(config.TWILIO_SID, config.TWILIO_AUTH_TOKEN)

export const sendSms = (userName) => client.messages.create({
    body: `Gracias por tu compra ${userName}!`,
    from: config.TWILIO_PHONE,
    to: config.PRIVATE_PHONE
})

export const sendWhatsapp = (userName) => client.messages.create({
    body: `Gracias por tu compra ${userName}!`,
    from: `whatsapp:${config.TWILIO_PHONE}`,
    to: `whatsapp:${config.PRIVATE_PHONE}`
})