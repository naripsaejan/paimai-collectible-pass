# PAIMAI Collectible Pass - Setup Guide

## 1. ติดตั้ง Dependencies

```bash
# เข้าไปในโฟลเดอร์โปรเจค
cd paimai-collectible-pass

# ติดตั้ง dependencies
npm install
```

## 2. ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` ในโฟลเดอร์ `paimai-collectible-pass`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://kplqzpwiyqawjftctlhu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbHF6cHdpeXFhd2pmdGN0bGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMTcyMTksImV4cCI6MjA3Mzc5MzIxOX0._yI49bZ8oVsdAEjT35o_wsFXN0ylf5MJK_zNYfYt1jg
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbHF6cHdpeXFhd2pmdGN0bGh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODIxNzIxOSwiZXhwIjoyMDczNzkzMjE5fQ.YsYogLloevVTHeI0ILWQV9GduEViYARVwSsPuMhJY58

# OAuth Providers (Mock for now)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

LINE_CLIENT_ID=your_line_client_id
LINE_CLIENT_SECRET=your_line_client_secret
LINE_REDIRECT_URI=http://localhost:3000/api/auth/line/callback

# Thirdweb
THIRDWEB_CLIENT_ID=cdb133a4c41a06eced59f9b00714a065
THIRDWEB_SECRET_KEY=atbb4iz16VVzSCoKvcIkeCoprXyveXo_6zyzka1DGYeC1nCUKK8wNaJveIL5FhU6m1cZoCtoF7sSiyFSIYGnEw

# Bitkub NEXT
NEXT_PUBLIC_BITKUB_CLIENT_ID=66beec63a07410001cf88a7b
NEXT_PUBLIC_BITKUB_PROJECT_ID=sdk-e4ee4655-b212-4160-8746-853c2f7bb9d5

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret_nextauth_key_here_change_this_in_production
```

## 3. ตั้งค่า Database ใน Supabase

1. ไปที่ [Supabase Dashboard](https://supabase.com/dashboard)
2. เลือกโปรเจค `kplqzpwiyqawjftctlhu`
3. ไปที่ **SQL Editor**
4. คัดลอกเนื้อหาจากไฟล์ `database/setup.sql`
5. วางและรัน SQL script

## 4. รัน Development Server

```bash
npm run dev
```

## 5. ทดสอบระบบ

1. เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`
2. กดปุ่มแบนเนอร์หรือเมนู hamburger
3. ทดสอบ Login (Google/LINE)
4. ไปที่หน้า Campaign
5. ทดสอบเชื่อม Bitkub NEXT

## 6. ตรวจสอบ Database

ใน Supabase Dashboard:
- ไปที่ **Table Editor**
- ตรวจสอบตาราง: `users`, `wallets`, `bitkub_wallets`, `campaign_progress`

## Troubleshooting

### Error: Cannot find module '@supabase/supabase-js'
```bash
npm install @supabase/supabase-js
```

### Error: Could not find declaration file for 'uuid'
```bash
npm install --save-dev @types/uuid
```

### Database connection error
- ตรวจสอบ environment variables
- ตรวจสอบ Supabase project status
- ตรวจสอบ API keys

