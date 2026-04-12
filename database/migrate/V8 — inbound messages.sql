CREATE TABLE inbound_messages (
    id SERIAL PRIMARY KEY,
    lead_id INT REFERENCES leads(id),
    mensagem TEXT,
    from_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);