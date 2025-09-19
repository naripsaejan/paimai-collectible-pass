#!/bin/bash

echo "🚀 เริ่มต้น PAIMAI Collectible Pass Development Server"
echo "=================================================="

# ตรวจสอบว่า Node.js ติดตั้งแล้วหรือไม่
if ! command -v node &> /dev/null; then
    echo "❌ Node.js ไม่ได้ติดตั้ง กรุณาติดตั้ง Node.js 18+ ก่อน"
    exit 1
fi

# ตรวจสอบว่า npm ติดตั้งแล้วหรือไม่
if ! command -v npm &> /dev/null; then
    echo "❌ npm ไม่ได้ติดตั้ง กรุณาติดตั้ง npm ก่อน"
    exit 1
fi

echo "✅ Node.js และ npm พร้อมใช้งาน"

# ตรวจสอบว่า .env.local มีอยู่หรือไม่
if [ ! -f ".env.local" ]; then
    echo "⚠️  ไฟล์ .env.local ไม่พบ"
    echo "📋 สร้างไฟล์ .env.local จาก env.example..."
    cp env.example .env.local
    echo "✅ สร้างไฟล์ .env.local เรียบร้อย"
    echo "🔧 กรุณาแก้ไขค่าใน .env.local ก่อนรันเว็บไซต์"
    echo ""
    echo "📝 ข้อมูลที่ต้องตั้งค่า:"
    echo "   - GOOGLE_CLIENT_ID และ GOOGLE_CLIENT_SECRET"
    echo "   - NEXTAUTH_SECRET"
    echo ""
    echo "📖 ดูคำแนะนำการตั้งค่าใน SETUP_REAL.md"
    exit 1
fi

echo "✅ ไฟล์ .env.local พบแล้ว"

# ตรวจสอบว่า node_modules มีอยู่หรือไม่
if [ ! -d "node_modules" ]; then
    echo "📦 ติดตั้ง dependencies..."
    npm install
    echo "✅ ติดตั้ง dependencies เรียบร้อย"
fi

echo "✅ Dependencies พร้อมใช้งาน"

# ตรวจสอบว่า .env.local มีค่าที่จำเป็น
if grep -q "your_google_client_id_here" .env.local; then
    echo "⚠️  ยังไม่ได้ตั้งค่า Google OAuth ใน .env.local"
    echo "📖 ดูคำแนะนำการตั้งค่าใน SETUP_REAL.md"
    echo ""
fi

if grep -q "your_nextauth_secret_key_here" .env.local; then
    echo "⚠️  ยังไม่ได้ตั้งค่า NEXTAUTH_SECRET ใน .env.local"
    echo "📖 ดูคำแนะนำการตั้งค่าใน SETUP_REAL.md"
    echo ""
fi

echo "🌐 เริ่มต้น Development Server..."
echo "📍 เว็บไซต์จะเปิดที่: http://localhost:3000"
echo "📱 ไฟล์ทดสอบ QR Code: test-qr-codes.html"
echo ""
echo "🛑 กด Ctrl+C เพื่อหยุดเซิร์ฟเวอร์"
echo "=================================================="

# รัน development server
npm run dev
