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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// 📡 ROTAS
// ================================
const webhookRoutes = require("./src/routes/webhookRoutes");
const googleRoutes = require("./src/routes/googleAuth");

// ✅ CORREÇÃO AQUI
app.use(webhookRoutes);
app.use(googleRoutes);

// ================================
// 🧪 ROTA TESTE
// ================================
app.post("/", (req, res) => {
  res.send("🔥 API WandersonWeb rodando!");
});

// ================================
// 🚀 START SERVER
// ================================
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});