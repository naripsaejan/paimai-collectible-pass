# สรุปการอัปเดตเว็บไซต์ PAIMAI Collectible Pass

## 🎯 เป้าหมาย
อัปเดตเว็บไซต์ให้สามารถทดสอบได้จริงโดยไม่ใช้ mock data และใช้งานจริงทั้งหมด

## ✅ ฟีเจอร์ที่อัปเดตแล้ว

### 1. Google OAuth จริง
- **ไฟล์ที่อัปเดต:**
  - `src/app/api/auth/google/route.ts` - API สำหรับสร้าง/อัปเดตผู้ใช้
  - `src/app/api/auth/google/callback/route.ts` - OAuth callback handler
  - `src/components/LoginModal.tsx` - ใช้ Google OAuth จริง
  - `src/contexts/AuthContext.tsx` - จัดการ OAuth callback

- **การทำงาน:**
  - ใช้ Google OAuth 2.0 จริง
  - แลก authorization code เป็น access token
  - ดึงข้อมูลผู้ใช้จาก Google API
  - บันทึกข้อมูลในฐานข้อมูล Supabase

### 2. Bitkub NEXT Wallet จริง
- **ไฟล์ที่อัปเดต:**
  - `src/lib/bitkubchain-sdk/index.ts` - ใช้ Playground config
  - `src/components/ConnectBitkubButton.tsx` - เชื่อมต่อ wallet จริง
  - `src/app/oauth/callback/page.tsx` - OAuth callback สำหรับ Bitkub

- **การทำงาน:**
  - ใช้ Bitkub Chain SDK จริง
  - เชื่อมต่อกับ Bitkub NEXT app
  - บันทึก wallet address ในฐานข้อมูล

### 3. QR Code Scanner จริง
- **ไฟล์ที่สร้างใหม่:**
  - `src/components/QRScanner.tsx` - QR scanner component

- **การทำงาน:**
  - ใช้ html5-qrcode library
  - สแกน QR Code ด้วยกล้อง
  - แสดงผลแบบ real-time

### 4. ระบบเก็บสแตมป์จริง
- **ไฟล์ที่สร้างใหม่:**
  - `src/app/api/stamps/collect/route.ts` - API สำหรับเก็บสแตมป์
  - `src/app/api/stamps/route.ts` - API สำหรับดึงข้อมูลสแตมป์

- **การทำงาน:**
  - เก็บสแตมป์จริงในฐานข้อมูล
  - ป้องกันการเก็บซ้ำ
  - อัปเดตความคืบหน้าแบบ real-time

### 5. แผนที่ร้านค้าจริง
- **ไฟล์ที่สร้างใหม่:**
  - `src/components/Map.tsx` - แผนที่ component

- **การทำงาน:**
  - ใช้ Leaflet map library
  - แสดงตำแหน่งร้านค้าในโคราช
  - แสดงสถานะการเยี่ยมชม

### 6. Campaign Page ที่อัปเดต
- **ไฟล์ที่อัปเดต:**
  - `src/app/campaign/page.tsx` - หน้าแคมเปญหลัก

- **ฟีเจอร์ใหม่:**
  - แสดงความคืบหน้าจริง
  - ปุ่มสแกน QR Code
  - แผนที่ร้านค้า
  - กริดสแตมป์แบบ real-time

## 🗄️ ฐานข้อมูล
- ใช้ Supabase (PostgreSQL)
- ตาราง: users, wallets, bitkub_wallets, campaign_progress, stamps
- RLS policies สำหรับความปลอดภัย

## 🔧 การตั้งค่า

### Environment Variables ที่ต้องตั้งค่า:
```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# Supabase
SUPABASE_URL=https://kplqzpwiyqawjftctlhu.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Bitkub NEXT
NEXT_PUBLIC_BITKUB_CLIENT_ID=66beec63a07410001cf88a7b
NEXT_PUBLIC_BITKUB_PROJECT_ID=sdk-e4ee4655-b212-4160-8746-853c2f7bb9d5

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

## 🚀 วิธีรันเว็บไซต์

### Windows:
```bash
# ใช้ไฟล์ batch
start-dev.bat
```

### Linux/Mac:
```bash
# ใช้ไฟล์ shell script
./start-dev.sh
```

### Manual:
```bash
npm install
npm run dev
```

## 📱 ไฟล์ทดสอบ
- `test-qr-codes.html` - QR Code สำหรับทดสอบ
- `SETUP_REAL.md` - คู่มือการตั้งค่าแบบละเอียด

## 🧪 การทดสอบ

### 1. ทดสอบ Google OAuth
1. คลิก "Continue with Google"
2. เลือก Google account
3. ตรวจสอบข้อมูลในฐานข้อมูล

### 2. ทดสอบ Bitkub Wallet
1. ไปที่หน้า Campaign
2. คลิก "Connect Bitkub NEXT"
3. เปิดแอป Bitkub NEXT และอนุมัติ

### 3. ทดสอบ QR Scanner
1. คลิก "สแกน QR Code"
2. สแกน QR Code จาก `test-qr-codes.html`
3. ตรวจสอบว่าสแตมป์ถูกเก็บ

### 4. ทดสอบแผนที่
1. ดูแผนที่ร้านค้า
2. คลิกที่ marker
3. ตรวจสอบสถานะการเยี่ยมชม

## 📊 ข้อมูลสำหรับทดสอบ

### QR Code ตัวอย่าง:
- `CAFE_A_001` - ร้านกาแฟ A
- `CAFE_B_002` - ร้านกาแฟ B
- `CAFE_C_003` - ร้านกาแฟ C
- `CAFE_D_004` - ร้านกาแฟ D
- `CAFE_E_005` - ร้านกาแฟ E

### ตำแหน่งร้านค้า:
- ร้านกาแฟ A: ถนนมิตรภาพ
- ร้านกาแฟ B: ถนนราชดำเนิน
- ร้านกาแฟ C: ถนนสุรนารี
- ร้านกาแฟ D: ถนนจอมพล
- ร้านกาแฟ E: ถนนมหาดไทย

## 🔍 การแก้ไขปัญหา

### Google OAuth ไม่ทำงาน
- ตรวจสอบ Client ID และ Client Secret
- ตรวจสอบ Redirect URI
- ตรวจสอบการตั้งค่าใน Google Cloud Console

### Bitkub Wallet ไม่เชื่อมต่อ
- ตรวจสอบแอป Bitkub NEXT
- ตรวจสอบการตั้งค่า SDK
- ดู console log

### QR Scanner ไม่ทำงาน
- ตรวจสอบสิทธิ์กล้อง
- ใช้ HTTPS หรือ localhost
- ตรวจสอบ QR Code

### ฐานข้อมูลไม่ทำงาน
- ตรวจสอบ Supabase settings
- ตรวจสอบ RLS policies
- ดู Supabase logs

## 📈 ผลลัพธ์
เว็บไซต์สามารถทดสอบได้จริงโดยไม่ใช้ mock data และใช้งานจริงทั้งหมด:
- ✅ Google OAuth จริง
- ✅ Bitkub Wallet จริง
- ✅ QR Scanner จริง
- ✅ ระบบเก็บสแตมป์จริง
- ✅ แผนที่ร้านค้าจริง
- ✅ ฐานข้อมูล Supabase จริง

## 🎉 สรุป
เว็บไซต์ PAIMAI Collectible Pass ได้รับการอัปเดตให้สามารถทดสอบได้จริงแล้ว โดยใช้:
- Google OAuth สำหรับการเข้าสู่ระบบ
- Bitkub NEXT Wallet สำหรับการเชื่อมต่อกระเป๋า
- QR Scanner สำหรับการสแกนสแตมป์
- ระบบเก็บสแตมป์จริงในฐานข้อมูล
- แผนที่ร้านค้าจริงในโคราช

ผู้ใช้สามารถทดสอบระบบทั้งหมดได้โดยทำตามคำแนะนำใน `SETUP_REAL.md`
