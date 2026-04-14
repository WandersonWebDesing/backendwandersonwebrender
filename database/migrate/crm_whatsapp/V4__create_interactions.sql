CREATE TABLE IF NOT EXISTS interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL,
    canal TEXT DEFAULT 'whatsapp',
    mensagem TEXT NOT NULL,
    tipo TEXT DEFAULT 'bot', -- bot ou humano
    status TEXT DEFAULT 'enviado',
    twilio_sid TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_interactions_lead
        FOREIGN KEY (lead_id)
        REFERENCES leads(id)
        ON DELETE CASCADE
);