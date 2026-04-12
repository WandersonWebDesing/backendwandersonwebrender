// =============================
// src/services/twilioService.js
// =============================
const client = require("../config/twilio");

async function sendWhatsApp(to, message) {
  return client.messages.create({
    from: process.env.TWILIO_WHATSAPP_NUMBER,
    to,
    body: message
  });
}

module.exports = { sendWhatsApp };
