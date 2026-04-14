CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT,
    telefone TEXT NOT NULL UNIQUE,
    telefone_normalizado TEXT,
    origem TEXT DEFAULT 'whatsapp',
    status TEXT DEFAULT 'novo',
    etapa_funil TEXT DEFAULT 'entrada',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);