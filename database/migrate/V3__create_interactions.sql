CREATE TABLE interactions (
    id SERIAL PRIMARY KEY,
    lead_id INT REFERENCES leads(id),
    canal VARCHAR(20), -- whatsapp, sms
    mensagem TEXT,
    status VARCHAR(20), -- enviado, entregue, lido
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);