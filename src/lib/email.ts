import nodemailer from 'nodemailer';
import { getAdminEmailTemplate, getUserConfirmationTemplate } from './emailTemplates';

// Configuration du transporteur SMTP
export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true pour 465, false pour 587
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});

// Fonction pour envoyer l'email à l'admin (vous)
export async function sendAdminNotification(name: string, email: string, message: string) {
    const date = new Date().toLocaleString('fr-FR', {
        dateStyle: 'full',
        timeStyle: 'short',
    });

    const mailOptions = {
        from: `"Portfolio Contact" <${process.env.EMAIL}>`,
        to: process.env.EMAIL,
        subject: `📬 Nouveau message de ${name}`,
        html: getAdminEmailTemplate(name, email, message, date),
    };

    return await transporter.sendMail(mailOptions);
}

// Fonction pour envoyer l'email de confirmation à l'utilisateur
export async function sendUserConfirmation(name: string, userEmail: string) {
    const mailOptions = {
        from: `"Jean Michel Andrianantenaina" <${process.env.EMAIL}>`,
        to: userEmail,
        subject: '✓ Message reçu - Portfolio Jean Michel',
        html: getUserConfirmationTemplate(name),
    };

    return await transporter.sendMail(mailOptions);
}