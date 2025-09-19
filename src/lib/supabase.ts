import { createClient } from '@supabase/supabase-js';

// Client-side Supabase (for browser)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kplqzpwiyqawjftctlhu.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbHF6cHdpeXFhd2pmdGN0bGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMTcyMTksImV4cCI6MjA3Mzc5MzIxOX0._yI49bZ8oVsdAEjT35o_wsFXN0ylf5MJK_zNYfYt1jg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase (for API routes)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbHF6cHdpeXFhd2pmdGN0bGh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODIxNzIxOSwiZXhwIjoyMDczNzkzMjE5fQ.YsYogLloevVTHeI0ILWQV9GduEViYARVwSsPuMhJY58',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Database types
export interface User {
  id: string;
  email: string;
  name: string;
  provider: 'google' | 'line';
  provider_id: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Wallet {
  id: string;
  user_id: string;
  address: string;
  provider: 'thirdweb';
  created_at: string;
}

export interface BitkubWallet {
  id: string;
  user_id: string;
  address: string;
  provider: 'bitkub_next';
  user_info?: any;
  is_connected: boolean;
  created_at: string;
  updated_at: string;
}

export interface CampaignProgress {
  id: string;
  user_id: string;
  thirdweb_wallet_id: string;
  bitkub_wallet_id: string;
  stamps_collected: number;
  total_stamps: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Stamp {
  id: string;
  campaign_progress_id: string;
  stamp_number: number;
  location_name: string;
  collected_at: string;
  qr_code_data?: string;
}
