CREATE TABLE IF NOT EXISTS site_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT,
    telefone TEXT NOT NULL,
    email TEXT,
    origem TEXT DEFAULT 'site',
    interesse TEXT, -- serviço escolhido
    mensagem TEXT,
    convertido BOOLEAN DEFAULT FALSE, -- foi enviado pro CRM?
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);