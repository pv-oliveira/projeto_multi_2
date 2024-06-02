const nodemailer = require("nodemailer");

// Gera um objeto com autenticação com email
async function senderInit() {
  try {
    const senderEmail = process.env.SENDER_EMAIL
    const senderPass = process.env.SENDER_PASS

    const sender = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use TLS
      service: 'gmail',
      auth: {
        user: senderEmail,
        pass: senderPass
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    });

    return sender;

  } catch (error) {
    throw error;
  }
}

module.exports = senderInit;
