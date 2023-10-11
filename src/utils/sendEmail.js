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
  
export const sendTicketEmail = async (userData, ticket) => {
    try {
        const { email, name } = userData
        const { code, purchase_datetime, amount, purchaser } = ticket

        await transport.sendMail({
            from: `<${config.GMAIL_USER}>`,
            to: `<${email}>`,
            subject: "Resumen de Compra",
            html: `
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        .header {
                            background-color: #f2f2f2;
                            padding: 10px;
                            text-align: center;
                        }
                        .content {
                            padding: 20px;
                        }
                        .footer {
                            background-color: #f2f2f2;
                            padding: 10px;
                            text-align: center;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Hola ${name},</h1>
                            <p>¡Gracias por elegir Wine and Chill!</p>
                        </div>
                        <div class="content">
                            <p>Aquí está el resumen de tu compra:</p>
                            <p>Código del ticket: ${code}</p>
                            <p>Fecha de compra: ${purchase_datetime}</p>
                            <p>Monto: $${amount}</p>
                            <p>Comprador: ${purchaser}</p>
                        </div>
                        <div class="footer">
                            <p>¡Gracias por tu compra!</p>
                        </div>
                    </div>
                </body>
                </html>
            
            `
        })
    } catch (err) {
        logger.error(`Error al enviar el correo electrónico a ${userData.email} sobre resumen de compra`, err)
    }
}

export const sendProductDeletedEmail = async (userData, product) => {
    try {
        const { email, name } = userData;

        await transport.sendMail({
            from: `<${config.GMAIL_USER}>`,
            to: `<${email}>`,
            subject: "Producto Eliminado",
            html: `
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        .header {
                            background-color: #f2f2f2;
                            padding: 10px;
                            text-align: center;
                        }
                        .content {
                            padding: 20px;
                        }
                        .footer {
                            background-color: #f2f2f2;
                            padding: 10px;
                            text-align: center;
                        }
                        .violet {
                            color: #8a56ac;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Hola ${name},</h1>
                            <p>Lamentamos informarte que tu producto "${product.title}" Id: ${product._id} ha sido eliminado.</p>
                        </div>
                        <div class="content">
                            <p>Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos.</p>
                        </div>
                        <div class="footer">
                            <p class="violet">Wine and Chill</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        });
    } catch (err) {
        logger.error(`Error al enviar el correo electrónico a ${userData.email} sobre la eliminación del producto`, err);
    }
}
