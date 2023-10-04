import nodemailer from 'nodemailer'
import config from '../config/config.js'
import { logger } from '../config/logger.js'

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASSWORD
    }
})

export const resetPassword = async (email, resetLink) => {
    try {
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
    } catch (err) {
        logger.error(`Error al enviar el correo electrónico a ${email} sobre reset password:`, err)
    }
}

export const sendAccountDeletedEmail = async (email, name) => {
    try {
      await transport.sendMail({
        from: `<${config.GMAIL_USER}>`,
        to: `<${email}>`,
        subject: "Cuenta Eliminada por Inactividad",
        html: `
          <p>Hola ${name},</p>
          <p>Lamentamos informarte que tu cuenta en Wine and Chill ha sido eliminada debido a inactividad.</p>
          <p>Si deseas volver a utilizar nuestros servicios, por favor regístrate nuevamente en nuestro sitio web.</p>
          <p>Si consideras que esto ha sido un error o tienes alguna pregunta, no dudes en contactarnos.</p>
          <p>Saludos,</p>
          <p>Wine and Chill</p>
        `,
      })
    } catch (err) {
        logger.error(`Error al enviar el correo electrónico a ${email} sobre la eliminación de la cuenta:`, err)
    }
  }
  
  
  
  