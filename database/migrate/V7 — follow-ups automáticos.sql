CREATE TABLE followups (
    id SERIAL PRIMARY KEY,
    lead_id INT REFERENCES leads(id),
    mensagem TEXT,
    scheduled_at TIMESTAMP,
    sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);