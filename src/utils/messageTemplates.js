const flow = require("../flows/conversationFlow");

app.post("/webhook/twilio", async (req, res) => {
  const { Body, From } = req.body;

  // buscar lead
  const { data: lead } = await supabase
    .from("leads")
    .select("*")
    .eq("telefone", From)
    .single();

  if (!lead) {
    // novo lead
    await supabase.from("leads").insert([
      { telefone: From }
    ]);

    await sendWhatsApp(From, flow.start());
    return res.sendStatus(200);
  }

  // lógica de conversa
  if (!lead.nome) {
    await supabase.from("leads")
      .update({ nome: Body })
      .eq("id", lead.id);

    await sendWhatsApp(From, flow.askLocation(Body));
  }

  res.sendStatus(200);
});