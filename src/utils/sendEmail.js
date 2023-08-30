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

export const resetPassword = async (email, resetLink) => {
    return await transport.sendMail({
        from: `<${config.GMAIL_USER}>`,
        to: `<${email}>`,
        subject: "Reset Password",
        html: `
            <p>Hola,</p>
            <p>Has solicitado restablecer tu contraseña. Haz clic en el enlace a continuación para cambiar tu contraseña:</p>
            <a href="${resetLink}">Reestablecer Contraseña</a>
            <p>Si no has solicitado esto, puedes ignorar este correo.</p>
            <p>Saludos,</p>
            <p>Wine and Chill</p>
         `
    })
}