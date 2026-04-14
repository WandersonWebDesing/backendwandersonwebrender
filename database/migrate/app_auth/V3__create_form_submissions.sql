CREATE TABLE IF NOT EXISTS form_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT,
    telefone TEXT,
    email TEXT,
    servico TEXT,
    mensagem TEXT,
    ip TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);