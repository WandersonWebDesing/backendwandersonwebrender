// =============================
// src/jobs/followupJob.js
// =============================
const supabase = require("../config/supabase");
const { sendWhatsApp } = require("../services/twilioService");

setInterval(async () => {
  const now = new Date();

  const { data } = await supabase
    .from("followups")
    .select("*")
    .lte("scheduled_at", now)
    .eq("sent", false);

  if (!data) return;

  for (let f of data) {
    await sendWhatsApp(f.telefone, f.mensagem);

    await supabase
      .from("followups")
      .update({ sent: true })
      .eq("id", f.id);
  }
}, 60000);
