# PAIMAI Collectible Pass - 31 Cafe 31 Artists

ระบบเก็บสแตมป์ดิจิทัลสำหรับกิจกรรม "31 Cafe 31 Artists" ในเมืองโคราช พร้อมระบบ NFT และการเชื่อมต่อ Bitkub NEXT Wallet

## 🎨 ฟีเจอร์หลัก

- **ระบบ Login**: Google OAuth และ LINE OAuth
- **Bitkub NEXT Wallet**: เชื่อมต่อกระเป๋า Bitkub สำหรับรับ NFT
- **QR Code Scanner**: สแกน QR Code เพื่อเก็บสแตมป์
- **แผนที่ร้านค้า**: แสดงตำแหน่งร้านกาแฟ 31 แห่งในโคราช
- **ระบบเก็บสแตมป์**: ป้องกันการเก็บซ้ำ และติดตามความคืบหน้า
- **NFT Rewards**: รับ NFT ไปยังกระเป๋า Bitkub

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js
- **Blockchain**: Bitkub Chain SDK
- **QR Scanner**: html5-qrcode
- **Maps**: Leaflet, React Leaflet

## 🚀 การติดตั้ง

### ข้อกำหนดระบบ
- Node.js 18+
- npm หรือ yarn
- Supabase account
- Google Cloud Console account (สำหรับ OAuth)

### ขั้นตอนการติดตั้ง

1. **Clone Repository**
```bash
git clone https://github.com/YOUR_USERNAME/paimai-collectible-pass.git
cd paimai-collectible-pass
```

2. **ติดตั้ง Dependencies**
```bash
npm install
```

3. **ตั้งค่า Environment Variables**
```bash
cp env.example .env.local
```

แก้ไขค่าใน `.env.local`:
```env
# Database - Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# Bitkub NEXT
NEXT_PUBLIC_BITKUB_CLIENT_ID=66beec63a07410001cf88a7b
NEXT_PUBLIC_BITKUB_PROJECT_ID=sdk-e4ee4655-b212-4160-8746-853c2f7bb9d5

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# Thirdweb
THIRDWEB_CLIENT_ID=cdb133a4c41a06eced59f9b00714a065
THIRDWEB_SECRET_KEY=your_thirdweb_secret_key
```

4. **ตั้งค่าฐานข้อมูล**
```bash
npm run setup-db
```

5. **รัน Development Server**
```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

## 📱 การใช้งาน

### สำหรับผู้ใช้
1. เข้าสู่ระบบด้วย Google หรือ LINE
2. เชื่อมต่อ Bitkub NEXT Wallet
3. ไปยังร้านกาแฟ 31 แห่งในโคราช
4. สแกน QR Code เพื่อเก็บสแตมป์
5. รับ NFT ไปยังกระเป๋า Bitkub

### สำหรับร้านค้า
1. ลงทะเบียนร้านค้าในระบบ
2. รับ QR Code สำหรับสแตมป์
3. ติดตั้ง QR Code ที่ร้าน
4. ติดตามสถิติการเยี่ยมชม

## 🗂️ โครงสร้างโปรเจค

```
paimai-collectible-pass/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API Routes
│   │   ├── campaign/       # หน้าแคมเปญ
│   │   ├── connect/        # หน้าเชื่อมต่อ Wallet
│   │   ├── rewards/        # หน้าแลกของรางวัล
│   │   └── wallet/         # หน้าจัดการ Wallet
│   ├── components/         # React Components
│   ├── contexts/           # React Contexts
│   └── lib/                # Utility Functions
├── database/               # Database Schema
├── public/                 # Static Files
└── docs/                   # Documentation
```

## 🔧 API Endpoints

- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/line` - LINE OAuth
- `POST /api/auth/logout` - ออกจากระบบ
- `POST /api/wallets/bitkub` - เชื่อมต่อ Bitkub Wallet
- `POST /api/stamps/collect` - เก็บสแตมป์
- `GET /api/stamps` - ดูสแตมป์ที่เก็บได้

## 🎯 กิจกรรม 31 Cafe 31 Artists

กิจกรรมที่สรรหาศิลปินกลุ่มทำงานสร้างสรร 31 คน ร่วมจัดแสดงผลงานศิลปะร่วมกับคาเฟ่ 31 ร้านในเมืองโคราช เพื่อกระตุ้นเศรษฐกิจและกิจกรรมสร้างสรรให้กับเมืองโคราช

**ระยะเวลาจัดกิจกรรม**: ตุลาคม - พฤศจิกายน 2568

## 🤝 การมีส่วนร่วม

1. Fork โปรเจค
2. สร้าง Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง Branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📄 License

โปรเจคนี้อยู่ภายใต้ MIT License - ดูรายละเอียดใน [LICENSE](LICENSE) file

## 📞 ติดต่อ

- **Email**: contact@paimai.com
- **Website**: https://paimai.com
- **GitHub**: https://github.com/YOUR_USERNAME/paimai-collectible-pass

## 🙏 ขอบคุณ

- [Next.js](https://nextjs.org/) - React Framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Bitkub Chain](https://bitkubchain.com/) - Blockchain Platform
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework

---

**PAIMAI Collectible Pass** - ระบบเก็บสแตมป์ดิจิทัลสำหรับกิจกรรมศิลปะและกาแฟในเมืองโคราช 🎨☕