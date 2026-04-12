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
// Essencial: Twilio envia dados como x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// 📡 ROTAS
// ================================
const webhookRoutes = require("./src/routes/webhookRoutes");
const googleRoutes = require("./src/routes/googleAuth");

// Definindo prefixos claros para as rotas
// Isso ajuda a evitar conflitos e organiza sua URL
app.use("/whatsapp", webhookRoutes); 
app.use("/auth", googleRoutes);

// ================================
// 🧪 ROTA TESTE (Raiz)
// ================================
app.all("/", (req, res) => {
  res.send("🔥 API WandersonWeb rodando e ativa!");
});

// ================================
// 🚀 START SERVER
// ================================
const PORT = process.env.PORT || 4001;

// '0.0.0.0' é obrigatório para o Render conseguir mapear a porta externa
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});