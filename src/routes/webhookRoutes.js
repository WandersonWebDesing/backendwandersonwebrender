// =============================
// src/routes/webhookRoutes.js
// =============================
const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");
const { sendWhatsApp } = require("../services/twilioService");
const { getResponse } = require("../services/botService");

// 🔍 ROTA TESTE (Acessível em GET /whatsapp/)
router.get("/", (req, res) => {
  res.send("✅ Webhook ativo!");
});

// ✅ CORREÇÃO: Alterado de "/twilio" para "/webhook"
// Agora esta rota responde em: POST /whatsapp/webhook
router.post("services/twilioService", async (req, res) => {
  try {
    // ⚠️ Twilio envia como form-urlencoded (Verifique se app.use(express.urlencoded) está no index.js)
    const Body = req.body.Body;
    const From = req.body.From;

    if (!Body || !From) {
      console.warn("Body ou From ausente:", req.body);
      return res.sendStatus(400);
    }

    // 🔍 busca lead
    let { data: lead, error } = await supabase
      .from("leads")
      .select("*")
      .eq("telefone", From)
      .maybeSingle();

    if (error) {
      console.error("Erro ao buscar lead:", error.message);
      return res.sendStatus(500);
    }

    // ➕ cria lead se não existir
    if (!lead) {
      const { data, error: insertError } = await supabase
        .from("leads")
        .insert([{ nome: "", telefone: From }])
        .select()
        .single();

      if (insertError) {
        console.error("Erro ao criar lead:", insertError.message);
        return res.sendStatus(500);
      }

      lead = data;
    }

    // 💬 salva mensagem recebida
    const { error: inboundError } = await supabase
      .from("inbound_messages")
      .insert([
        {
          lead_id: lead.id,
          mensagem: Body,
          from_number: From
        }
      ]);

    if (inboundError) {
      console.error("Erro ao salvar inbound:", inboundError.message);
    }

    // 🤖 resposta do bot
    const resposta = getResponse(Body, lead.nome || "cliente");

    // 📲 envia WhatsApp via Twilio
    await sendWhatsApp(From, resposta);

    // 📊 salva interação
    const { error: interactionError } = await supabase
      .from("interactions")
      .insert([
        {
          lead_id: lead.id,
          canal: "whatsapp",
          mensagem: resposta,
          status: "enviado"
        }
      ]);

    if (interactionError) {
      console.error("Erro ao salvar interação:", interactionError.message);
    }

    // ✅ Twilio precisa de resposta rápida (Status 200)
    return res.status(200).send("OK");

  } catch (err) {
    console.error("Erro geral webhook:", err.message);
    return res.sendStatus(500);
  }
});

module.exports = router;