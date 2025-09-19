-- PAIMAI Collectible Pass Database Setup
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS stamps CASCADE;
DROP TABLE IF EXISTS campaign_progress CASCADE;
DROP TABLE IF EXISTS bitkub_wallets CASCADE;
DROP TABLE IF EXISTS wallets CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users Table (OAuth Account)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  provider VARCHAR(50) NOT NULL, -- 'google' or 'line'
  provider_id VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Unique constraint for provider + provider_id
  UNIQUE(provider, provider_id)
);

-- Thirdweb Wallets Table
CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  address VARCHAR(255) UNIQUE NOT NULL,
  provider VARCHAR(50) NOT NULL DEFAULT 'thirdweb',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one thirdweb wallet per user
  UNIQUE(user_id, provider)
);

-- Bitkub NEXT Wallets Table
CREATE TABLE bitkub_wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  address VARCHAR(255) UNIQUE NOT NULL,
  provider VARCHAR(50) NOT NULL DEFAULT 'bitkub_next',
  user_info JSONB, -- เก็บข้อมูลจาก Bitkub NEXT
  is_connected BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one bitkub wallet per user
  UNIQUE(user_id, provider)
);

-- Campaign Progress Table
CREATE TABLE campaign_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  thirdweb_wallet_id UUID REFERENCES wallets(id) ON DELETE CASCADE,
  bitkub_wallet_id UUID REFERENCES bitkub_wallets(id) ON DELETE CASCADE,
  stamps_collected INTEGER DEFAULT 0,
  total_stamps INTEGER DEFAULT 30,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one progress record per user
  UNIQUE(user_id)
);

-- Stamps Collection Table (เก็บรายละเอียดสแตมป์)
CREATE TABLE stamps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_progress_id UUID REFERENCES campaign_progress(id) ON DELETE CASCADE,
  stamp_number INTEGER NOT NULL, -- หมายเลขสแตมป์ (1-30)
  location_name VARCHAR(255) NOT NULL, -- ชื่อร้านค้า
  collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  qr_code_data TEXT, -- ข้อมูล QR Code ที่สแกน
  
  -- Ensure one stamp per number per progress
  UNIQUE(campaign_progress_id, stamp_number)
);

-- Indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_provider ON users(provider, provider_id);
CREATE INDEX idx_wallets_user_id ON wallets(user_id);
CREATE INDEX idx_bitkub_wallets_user_id ON bitkub_wallets(user_id);
CREATE INDEX idx_campaign_progress_user_id ON campaign_progress(user_id);
CREATE INDEX idx_stamps_campaign_progress_id ON stamps(campaign_progress_id);

-- Functions for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bitkub_wallets_updated_at BEFORE UPDATE ON bitkub_wallets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaign_progress_updated_at BEFORE UPDATE ON campaign_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing
INSERT INTO users (id, email, name, provider, provider_id, avatar_url) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'test@gmail.com', 'Test User', 'google', 'google_123', 'https://via.placeholder.com/150'),
('550e8400-e29b-41d4-a716-446655440001', 'test@line.com', 'LINE User', 'line', 'line_456', 'https://via.placeholder.com/150');

INSERT INTO wallets (id, user_id, address, provider) VALUES
('660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', '0x1234567890abcdef1234567890abcdef12345678', 'thirdweb'),
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '0xabcdef1234567890abcdef1234567890abcdef12', 'thirdweb');

-- Success message
SELECT 'Database setup completed successfully!' as message;

