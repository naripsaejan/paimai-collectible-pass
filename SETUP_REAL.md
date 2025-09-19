# การตั้งค่าเว็บไซต์ PAIMAI Collectible Pass สำหรับการทดสอบจริง

## ข้อกำหนดระบบ
- Node.js 18+
- npm หรือ yarn
- Google Cloud Console account (สำหรับ Google OAuth)
- Supabase account (สำหรับฐานข้อมูล)

## ขั้นตอนการตั้งค่า

### 1. ติดตั้ง Dependencies
```bash
cd paimai-collectible-pass
npm install
```

### 2. ตั้งค่า Environment Variables
สร้างไฟล์ `.env.local` จาก `.env.example`:

```bash
cp env.example .env.local
```

แก้ไขค่าใน `.env.local`:

```env
# Database - ใช้ Supabase
SUPABASE_URL=https://kplqzpwiyqawjftctlhu.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbHF6cHdpeXFhd2pmdGN0bGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMTcyMTksImV4cCI6MjA3Mzc5MzIxOX0._yI49bZ8oVsdAEjT35o_wsFXN0ylf5MJK_zNYfYt1jg
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbHF6cHdpeXFhd2pmdGN0bGh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODIxNzIxOSwiZXhwIjoyMDczNzkzMjE5fQ.YsYogLloevVTHeI0ILWQV9GduEViYARVwSsPuMhJY58

# Google OAuth - ต้องสร้างใน Google Cloud Console
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# Bitkub NEXT - ใช้ Playground config
NEXT_PUBLIC_BITKUB_CLIENT_ID=66beec63a07410001cf88a7b
NEXT_PUBLIC_BITKUB_PROJECT_ID=sdk-e4ee4655-b212-4160-8746-853c2f7bb9d5

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key_here
```

### 3. ตั้งค่า Google OAuth

1. ไปที่ [Google Cloud Console](https://console.cloud.google.com/)
2. สร้างโปรเจ็กต์ใหม่หรือเลือกโปรเจ็กต์ที่มีอยู่
3. เปิดใช้งาน Google+ API
4. ไปที่ "Credentials" > "Create Credentials" > "OAuth 2.0 Client IDs"
5. ตั้งค่า:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/google/callback`
6. คัดลอก Client ID และ Client Secret ไปใส่ใน `.env.local`

### 4. ตั้งค่าฐานข้อมูล Supabase

1. ไปที่ [Supabase](https://supabase.com/)
2. สร้างโปรเจ็กต์ใหม่
3. ไปที่ SQL Editor และรันคำสั่งจาก `database/schema.sql`
4. คัดลอก URL และ API keys ไปใส่ใน `.env.local`

### 5. รันเว็บไซต์

```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

## ฟีเจอร์ที่ใช้งานได้จริง

### 1. Google OAuth
- เข้าสู่ระบบด้วย Google account จริง
- ข้อมูลผู้ใช้ถูกบันทึกในฐานข้อมูล Supabase

### 2. Bitkub NEXT Wallet
- เชื่อมต่อกระเป๋า Bitkub NEXT จริง
- ใช้ Bitkub Chain SDK สำหรับการเชื่อมต่อ

### 3. QR Code Scanner
- สแกน QR Code จริงด้วยกล้อง
- ใช้ html5-qrcode library

### 4. ระบบเก็บสแตมป์
- เก็บสแตมป์จริงในฐานข้อมูล
- ป้องกันการเก็บซ้ำ
- แสดงความคืบหน้าแบบ real-time

### 5. แผนที่ร้านค้า
- แผนที่จริงด้วย Leaflet
- แสดงตำแหน่งร้านค้าในโคราช
- แสดงสถานะการเยี่ยมชม

## การทดสอบ

### 1. ทดสอบ Google OAuth
1. คลิก "Continue with Google"
2. เลือก Google account
3. ตรวจสอบว่าข้อมูลถูกบันทึกในฐานข้อมูล

### 2. ทดสอบ Bitkub Wallet
1. ไปที่หน้า Campaign
2. คลิก "Connect Bitkub NEXT"
3. เปิดแอป Bitkub NEXT และอนุมัติ
4. ตรวจสอบว่า wallet address แสดงถูกต้อง

### 3. ทดสอบ QR Scanner
1. คลิก "สแกน QR Code"
2. ชี้กล้องไปที่ QR Code
3. ตรวจสอบว่าสแตมป์ถูกเก็บ

### 4. ทดสอบแผนที่
1. ดูแผนที่ร้านค้า
2. คลิกที่ marker เพื่อดูข้อมูลร้าน
3. ตรวจสอบสถานะการเยี่ยมชม

## ข้อมูลสำหรับทดสอบ

### QR Code ตัวอย่าง
```
CAFE_A_001
CAFE_B_002
CAFE_C_003
CAFE_D_004
CAFE_E_005
```

### ตำแหน่งร้านค้า
- ร้านกาแฟ A: ถนนมิตรภาพ
- ร้านกาแฟ B: ถนนราชดำเนิน
- ร้านกาแฟ C: ถนนสุรนารี
- ร้านกาแฟ D: ถนนจอมพล
- ร้านกาแฟ E: ถนนมหาดไทย

## การแก้ไขปัญหา

### Google OAuth ไม่ทำงาน
- ตรวจสอบ Client ID และ Client Secret
- ตรวจสอบ Redirect URI
- ตรวจสอบว่าเปิดใช้งาน Google+ API

### Bitkub Wallet ไม่เชื่อมต่อ
- ตรวจสอบว่าแอป Bitkub NEXT ติดตั้งแล้ว
- ตรวจสอบการตั้งค่า SDK
- ดู console log สำหรับ error

### QR Scanner ไม่ทำงาน
- ตรวจสอบว่าให้สิทธิ์กล้อง
- ใช้ HTTPS หรือ localhost
- ตรวจสอบว่า QR Code ชัดเจน

### ฐานข้อมูลไม่ทำงาน
- ตรวจสอบ Supabase URL และ API keys
- ตรวจสอบการตั้งค่า RLS policies
- ดู Supabase logs

## การ Deploy

### Vercel
1. Push code ไป GitHub
2. เชื่อมต่อ Vercel กับ GitHub repo
3. ตั้งค่า Environment Variables ใน Vercel
4. Deploy

### Environment Variables สำหรับ Production
- เปลี่ยน `NEXTAUTH_URL` เป็น domain จริง
- เปลี่ยน `GOOGLE_REDIRECT_URI` เป็น domain จริง
- ใช้ Supabase production database
