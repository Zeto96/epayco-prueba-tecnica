const nodemailer = require('nodemailer');
require('dotenv').config();


async function sendPaymentToken(email, token, session_id, amount) {
    try {
        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: `"Epayco Pagos" <${testAccount.user}>`,
            to: email,
            subject: 'Tu código de confirmación de pago',
            html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                <h2 style="color: #2c3e50; text-align: center;">Confirmación de Pago</h2>
                <p>Has iniciado un proceso de pago por <strong>$${amount.toLocaleString()}</strong>.</p>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; text-align: center; margin: 20px 0;">
                    <p style="font-size: 16px; margin-bottom: 10px;">Tu código de confirmación es:</p>
                    <h1 style="color: #3498db; letter-spacing: 5px; margin: 0;">${token}</h1>
                </div>
                <p>Este código expirará en 30 minutos. Para completar tu pago, deberás proporcionar:</p>
                <ul>
                    <li>ID de sesión: <strong>${session_id}</strong></li>
                    <li>Token de 6 dígitos: <strong>${token}</strong></li>
                </ul>
                <p style="font-size: 12px; color: #7f8c8d; text-align: center; margin-top: 30px;">
                    Este es un correo automático, por favor no responda a este mensaje.
                </p>
            </div>`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado:', info.messageId);
        console.log('URL para ver el correo:', nodemailer.getTestMessageUrl(info));
        return true;
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        return false;
    }
};

module.exports = { sendPaymentToken };
