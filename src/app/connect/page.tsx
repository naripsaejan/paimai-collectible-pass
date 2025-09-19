'use client';

import { useRouter } from 'next/navigation';
import ConnectBitkubButton from '@/components/ConnectBitkubButton';

export default function ConnectPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="p-4 border-b">
        <h1 className="text-xl font-bold">เชื่อม Bitkub NEXT</h1>
      </header>

      <div className="p-6 space-y-6">
        {/* Info */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
            <span className="text-2xl">🔗</span>
          </div>
          <h2 className="text-lg font-semibold">เชื่อมกระเป๋า Bitkub NEXT</h2>
          <p className="text-sm text-gray-600">
            ต้องเชื่อมกระเป๋า Bitkub NEXT เพื่อเล่นแคมเปญและรับ NFT
          </p>
        </div>

        {/* Connect Button */}
        <div className="space-y-4">
          <ConnectBitkubButton onConnected={() => router.push('/campaign')} />
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-sm mb-2">ขั้นตอนการเชื่อม</h3>
            <ol className="text-xs text-gray-600 space-y-1">
              <li>1. กดปุ่ม "Connect Bitkub NEXT"</li>
              <li>2. เปิดแอป Bitkub NEXT</li>
              <li>3. อนุมัติการเชื่อมต่อ</li>
              <li>4. กลับมาที่เว็บไซต์</li>
            </ol>
          </div>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="w-full text-gray-500 text-sm py-2"
        >
          ← กลับ
        </button>
      </div>
    </div>
  );
}