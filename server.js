// ================================
// 🚀 IMPORTS
// ================================
const express = require("express");
require("dotenv").config();

// ================================
// 🚀 APP
// ================================
const app = express();

// ================================
// 🔧 MIDDLEWARES
// ================================
// IMPORTANTE: Twilio envia dados como urlencoded. Isso é vital!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// 📡 ROTAS
// ================================
const webhookRoutes = require("./src/routes/webhookRoutes");
const googleRoutes = require("./src/routes/googleAuth");

// Registrando as rotas
app.use(webhookRoutes);
app.use(googleRoutes);

// ================================
// 🧪 ROTA TESTE (Raiz)
// ================================
// Mudei para .all para aceitar GET (navegador) e POST (testes)
app.all("/", (req, res) => {
  res.send("🔥 API WandersonWeb rodando e ativa!");
});

// ================================
// 🚀 START SERVER
// ================================
const PORT = process.env.PORT || 4001;

// Adicionado '0.0.0.0' para garantir que o Render exponha a porta corretamente
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});