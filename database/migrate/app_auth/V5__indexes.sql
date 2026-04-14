CREATE INDEX IF NOT EXISTS idx_site_leads_telefone 
ON site_leads(telefone);
CREATE INDEX IF NOT EXISTS idx_site_leads_convertido 
ON site_leads(convertido);
CREATE INDEX IF NOT EXISTS idx_events_tipo 
ON events_tracking(tipo);
CREATE INDEX IF NOT EXISTS idx_events_session 
ON events_tracking(session_id);