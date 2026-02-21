-- Jalankan ini di SQL Editor Supabase untuk membuat tabel cache
CREATE TABLE market_analysis_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hotel_name TEXT NOT NULL,
    data_json JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexing agar sistem SGO_Web lebih cepat membaca data
CREATE INDEX idx_hotel_name ON market_analysis_logs (hotel_name);