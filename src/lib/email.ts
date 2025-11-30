import nodemailer from 'nodemailer';

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

// Template HTML pour l'email que VOUS recevez
export const getAdminEmailTemplate = (name: string, email: string, message: string, date: string) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #0a0a0a;
          color: #e0e0e0;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 243, 255, 0.1);
          border: 1px solid rgba(0, 243, 255, 0.2);
        }
        .header {
          background: linear-gradient(135deg, #00f3ff 0%, #39ff14 100%);
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          color: #0a0a0a;
          font-size: 28px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .content {
          padding: 40px 30px;
        }
        .info-box {
          background: rgba(0, 243, 255, 0.05);
          border-left: 4px solid #00f3ff;
          padding: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
        }
        .info-row {
          display: flex;
          margin-bottom: 12px;
          align-items: center;
        }
        .info-label {
          color: #00f3ff;
          font-weight: 600;
          min-width: 80px;
          font-size: 14px;
        }
        .info-value {
          color: #ffffff;
          font-size: 14px;
        }
        .message-box {
          background: rgba(57, 255, 20, 0.05);
          border: 1px solid rgba(57, 255, 20, 0.2);
          border-radius: 8px;
          padding: 25px;
          margin-top: 25px;
        }
        .message-title {
          color: #39ff14;
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .message-content {
          color: #e0e0e0;
          line-height: 1.8;
          font-size: 15px;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .footer {
          background: rgba(0, 0, 0, 0.3);
          padding: 20px 30px;
          text-align: center;
          color: #888;
          font-size: 12px;
        }
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 243, 255, 0.3), transparent);
          margin: 25px 0;
        }
        .badge {
          display: inline-block;
          background: rgba(0, 243, 255, 0.2);
          color: #00f3ff;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📬 Nouveau Message</h1>
        </div>
        <div class="content">
          <div class="badge">Formulaire de Contact</div>
          
          <div class="info-box">
            <div class="info-row">
              <span class="info-label">👤 Nom</span>
              <span class="info-value">${name}</span>
            </div>
            <div class="info-row">
              <span class="info-label">📧 Email</span>
              <span class="info-value">${email}</span>
            </div>
            <div class="info-row">
              <span class="info-label">📅 Date</span>
              <span class="info-value">${date}</span>
            </div>
          </div>

          <div class="divider"></div>

          <div class="message-box">
            <div class="message-title">💬 Message</div>
            <div class="message-content">${message}</div>
          </div>
        </div>
        <div class="footer">
          <p>Ce message a été envoyé depuis votre portfolio</p>
          <p>Portfolio • Jean Michel Andrianantenaina</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Template HTML pour l'email de CONFIRMATION envoyé à l'utilisateur
export const getUserConfirmationTemplate = (name: string) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #0a0a0a;
          color: #e0e0e0;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(57, 255, 20, 0.1);
          border: 1px solid rgba(57, 255, 20, 0.2);
        }
        .header {
          background: linear-gradient(135deg, #39ff14 0%, #00f3ff 100%);
          padding: 40px 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          color: #0a0a0a;
          font-size: 32px;
          font-weight: 700;
        }
        .checkmark {
          font-size: 60px;
          margin-bottom: 10px;
        }
        .content {
          padding: 40px 30px;
          text-align: center;
        }
        .greeting {
          font-size: 24px;
          color: #39ff14;
          margin-bottom: 20px;
          font-weight: 600;
        }
        .text {
          color: #e0e0e0;
          line-height: 1.8;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .highlight-box {
          background: rgba(57, 255, 20, 0.1);
          border: 1px solid rgba(57, 255, 20, 0.3);
          border-radius: 8px;
          padding: 25px;
          margin: 30px 0;
        }
        .highlight-text {
          color: #39ff14;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .info-text {
          color: #b0b0b0;
          font-size: 14px;
          line-height: 1.6;
        }
        .footer {
          background: rgba(0, 0, 0, 0.3);
          padding: 30px;
          text-align: center;
        }
        .footer-title {
          color: #00f3ff;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .footer-text {
          color: #888;
          font-size: 13px;
          line-height: 1.6;
        }
        .social-links {
          margin-top: 20px;
        }
        .social-link {
          color: #00f3ff;
          text-decoration: none;
          margin: 0 10px;
          font-size: 14px;
        }
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(57, 255, 20, 0.3), transparent);
          margin: 25px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="checkmark">✓</div>
          <h1>Message Reçu !</h1>
        </div>
        <div class="content">
          <div class="greeting">Bonjour ${name} 👋</div>
          
          <p class="text">
            Merci d'avoir pris le temps de me contacter !
          </p>

          <div class="highlight-box">
            <div class="highlight-text">📬 Votre message a bien été envoyé</div>
            <div class="info-text">
              J'ai bien reçu votre message et je vous répondrai dans les plus brefs délais, 
              généralement sous 24-48 heures.
            </div>
          </div>

          <div class="divider"></div>

          <p class="text">
            En attendant ma réponse, n'hésitez pas à consulter mes projets et compétences 
            sur mon portfolio.
          </p>
        </div>
        <div class="footer">
          <div class="footer-title">Jean Michel Andrianantenaina</div>
          <div class="footer-text">
            Développeur Web Full-stack<br>
            Master 2 en Ingénierie Informatique
          </div>
          <div class="social-links">
            <a href="https://github.com/andryfotsiny" class="social-link">GitHub</a>
            <a href="https://www.linkedin.com/in/jean-michel-andrianantenaina-483056304" class="social-link">LinkedIn</a>
          </div>
          <div style="margin-top: 20px; color: #666; font-size: 12px;">
            Fianarantsoa, Madagascar
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

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