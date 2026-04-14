CREATE INDEX IF NOT EXISTS idx_leads_telefone 
ON leads(telefone);
CREATE INDEX IF NOT EXISTS idx_leads_status 
ON leads(status);
CREATE INDEX IF NOT EXISTS idx_followups_scheduled 
ON followups(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_messages_lead 
ON inbound_messages(lead_id);
CREATE INDEX IF NOT EXISTS idx_interactions_lead 
ON interactions(lead_id);
