CREATE TABLE IF NOT EXISTS events_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo TEXT NOT NULL, -- click, page_view, whatsapp_click
    pagina TEXT,
    elemento TEXT,
    session_id TEXT,
    user_ip TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);