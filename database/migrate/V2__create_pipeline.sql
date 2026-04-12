CREATE TABLE pipeline (
    id SERIAL PRIMARY KEY,
    lead_id INT REFERENCES leads(id),
    status VARCHAR(50) DEFAULT 'novo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);