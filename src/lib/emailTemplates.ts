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
          background-color: #f5f5f5;
          color: #333333;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e0e0;
        }
        .header {
          background: #2c3e50;
          padding: 30px;
          text-align: center;
          border-bottom: 3px solid #34495e;
        }
        .header h1 {
          margin: 0;
          color: #ffffff;
          font-size: 24px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .content {
          padding: 40px 30px;
        }
        .info-box {
          background: #f8f9fa;
          border-left: 4px solid #2c3e50;
          padding: 20px;
          margin-bottom: 25px;
          border-radius: 4px;
        }
        .info-row {
          display: flex;
          margin-bottom: 12px;
          align-items: center;
        }
        .info-row:last-child {
          margin-bottom: 0;
        }
        .info-label {
          color: #2c3e50;
          font-weight: 600;
          min-width: 80px;
          font-size: 14px;
        }
        .info-value {
          color: #555555;
          font-size: 14px;
          word-break: break-word;
        }
        .message-box {
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          padding: 25px;
          margin-top: 25px;
        }
        .message-title {
          color: #2c3e50;
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 15px;
        }
        .message-content {
          color: #444444;
          line-height: 1.8;
          font-size: 15px;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .footer {
          background: #f8f9fa;
          padding: 20px 30px;
          text-align: center;
          color: #888888;
          font-size: 13px;
          border-top: 1px solid #e0e0e0;
        }
        .footer p {
          margin: 5px 0;
        }
        .divider {
          height: 1px;
          background: #e0e0e0;
          margin: 25px 0;
        }
        .badge {
          display: inline-block;
          background: #2c3e50;
          color: #ffffff;
          padding: 6px 14px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
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
              <span class="info-label">Nom :</span>
              <span class="info-value">${name}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email :</span>
              <span class="info-value">${email}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Date :</span>
              <span class="info-value">${date}</span>
            </div>
          </div>

          <div class="divider"></div>

          <div class="message-box">
            <div class="message-title">Message</div>
            <div class="message-content">${message}</div>
          </div>
        </div>
        <div class="footer">
          <p>Ce message a été envoyé depuis votre portfolio</p>
          <p><strong>Portfolio • Jean Michel Andrianantenaina</strong></p>
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
          background-color: #f5f5f5;
          color: #333333;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e0e0;
        }
        .header {
          background: #2c3e50;
          padding: 40px 30px;
          text-align: center;
          border-bottom: 3px solid #34495e;
        }
        .header h1 {
          margin: 10px 0 0 0;
          color: #ffffff;
          font-size: 28px;
          font-weight: 600;
        }
        .checkmark {
          font-size: 50px;
          margin-bottom: 5px;
        }
        .content {
          padding: 40px 30px;
        }
        .greeting {
          font-size: 22px;
          color: #2c3e50;
          margin-bottom: 20px;
          font-weight: 600;
        }
        .text {
          color: #555555;
          line-height: 1.8;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .highlight-box {
          background: #f8f9fa;
          border: 2px solid #2c3e50;
          border-radius: 6px;
          padding: 25px;
          margin: 30px 0;
        }
        .highlight-text {
          color: #2c3e50;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .info-text {
          color: #666666;
          font-size: 15px;
          line-height: 1.6;
        }
        .footer {
          background: #f8f9fa;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #e0e0e0;
        }
        .footer-title {
          color: #2c3e50;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .footer-text {
          color: #666666;
          font-size: 14px;
          line-height: 1.6;
          margin: 5px 0;
        }
        .social-links {
          margin-top: 20px;
        }
        .social-link {
          color: #2c3e50;
          text-decoration: none;
          margin: 0 12px;
          font-size: 14px;
          font-weight: 500;
        }
        .social-link:hover {
          text-decoration: underline;
        }
        .divider {
          height: 1px;
          background: #e0e0e0;
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
          <div style="margin-top: 15px; color: #888888; font-size: 13px;">
            Fianarantsoa, Madagascar
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};