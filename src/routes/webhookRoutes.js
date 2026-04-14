const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");
const { sendWhatsApp } = require("../services/twilioService");
const { getResponse } = require("../services/botService");

// 🔍 ROTA TESTE (Acessível em GET /)
router.get("/", (req, res) => {
  res.send("✅ Webhook ativo!");
});

// ✅ CORREÇÃO: Nome da rota simplificado para "/webhook"
// Se no server.js você usar app.use("/whatsapp", webhookRoutes), 
// a URL final será: https://backendwandersonweb.onrender.com/whatsapp/webhook
router.post("/webhook", async (req, res) => {
  try {
    const Body = req.body.Body;
    const From = req.body.From;

    if (!Body || !From) {
      console.warn("⚠️ Body ou From ausente no payload do Twilio.");
      return res.sendStatus(400);
    }

    console.log(`📩 Mensagem recebida de ${From}: ${Body}`);

    // 🔍 busca lead
    let { data: lead, error } = await supabase
      .from("leads")
      .select("*")
      .eq("telefone", From)
      .maybeSingle();

    if (error) {
      console.error("❌ Erro ao buscar lead no Supabase:", error.message);
    }

// ➕ CRIAÇÃO DO LEAD (Substitua seu bloco antigo por este)
if (!lead) {
    // 1. Limpa o prefixo "whatsapp:" para evitar o erro de 'valor muito longo'
    const numeroLimpo = From.replace("whatsapp:", ""); 

    // 2. Tenta inserir no Supabase
    const { data, error: insertError } = await supabase
        .from("leads")
        .insert([{ 
            nome: "Lead via WhatsApp", 
            telefone: numeroLimpo 
            // Note que não enviamos o email aqui para evitar o erro de 'not-null'
        }])
        .select()
        .single();

    if (insertError) {
        // Se cair aqui, você ainda precisa rodar o comando SQL no painel do Supabase
        console.error("❌ Erro ao criar lead:", insertError.message);
    } else {
        // Se deu certo, a variável lead recebe os dados e o fluxo continua
        lead = data;
        console.log("✅ Lead criado com sucesso para o número:", numeroLimpo);
    }
}
    // 💬 salva mensagem recebida
    if (lead) {
      await supabase.from("inbound_messages").insert([
        {
          lead_id: lead.id,
          mensagem: Body,
          from_number: From
        }
      ]);
    }

    // 🤖 resposta do bot
    const resposta = getResponse(Body, (lead && lead.nome) ? lead.nome : "cliente");

    // 📲 envia WhatsApp via Twilio
    await sendWhatsApp(From, resposta);

    // 📊 salva interação
    if (lead) {
      await supabase.from("interactions").insert([
        {
          lead_id: lead.id,
          canal: "whatsapp",
          mensagem: resposta,
          status: "enviado"
        }
      ]);
    }

    // ✅ IMPORTANTE: Twilio espera uma resposta rápida
    return res.status(200).send("OK");

  } catch (err) {
    console.error("💥 Erro geral no webhook:", err.message);
    return res.sendStatus(500);
  }
});

module.exports = router;