import nodemailer from 'nodemailer'
import config from '../config/config.js'

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASSWORD
    }
})

export const sendEmail = async () => {
    return await transport.sendMail({
        from: `Test <${config.GMAIL_USER}>`,
        to: '<manuelotamendi97@gmail.com>',
        subject: "This is an email test and it works!",
        html: '<h1> menassss </h1>'
    })
}