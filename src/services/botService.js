// =============================
// src/services/botService.js
// =============================
function getResponse(msg, nome) {
  msg = msg.toLowerCase();

  if (msg.includes("foto")) return "📸 Fotografias profissionais disponíveis!";
  if (msg.includes("video")) return "🎬 Edição e criação de vídeos!";
  if (msg.includes("site")) return "💻 Criamos sites profissionais!";
  if (msg.includes("bot")) return "🤖 Criamos bots para WhatsApp!";
  if (msg.includes("local")) return "📍 Temos unidades em DF!";

  return `Olá ${nome || ""}! Escolha um serviço: foto, vídeo, site, bot.`;
}

module.exports = { getResponse };