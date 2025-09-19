'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/LoginModal';
import Link from 'next/link';

export default function Home() {
  const { user, isLoading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCampaignClick = () => {
    if (user) {
      // User is logged in, go to campaign
      window.location.href = '/campaign';
    } else {
      // User not logged in, show login modal
      setShowLoginModal(true);
    }
  };

  const handleMenuClick = () => {
    setShowLoginModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-black">PAIMAI</h1>
            <p className="text-xs text-gray-600">Collectible Pass</p>
          </div>
        </div>
        
        {/* Hamburger Menu */}
        <button 
          onClick={handleMenuClick}
          className="text-gray-600 hover:text-gray-800"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Campaign Banner - Clickable */}
      <section className="px-4 mb-6">
        <button 
          onClick={handleCampaignClick}
          className="w-full aspect-[16/9] bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
        >
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">31 Cafe 31 Artist</h2>
            <p className="text-sm opacity-90">เก็บสแตมป์ครบ 31 ชิ้น</p>
            {user && (
              <p className="text-xs opacity-75 mt-2">👋 สวัสดี {user.name}</p>
            )}
          </div>
        </button>
      </section>

      {/* News Section */}
      <section className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-900">News</h3>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">ART ACTIVITY</p>
          <h4 className="font-bold text-red-500 mb-2">31 CAFÉS 31 ARTISTS</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            31 Cafés 31 Artists คือกิจกรรมที่สรรหาศิลปินกลุ่มทำงานสร้างสรร 31 คน 
            ร่วมชัด โชว์ผลงานศิลปะร่วมกับคาเฟ่ 31 ร้านในเมืองโคราช เพื่อกระตุ้นเศรษฐกิจและกิจกรรม
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className="px-4 space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-sm mb-2">วิธีการเล่น</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• เข้าสู่ระบบด้วย Google หรือ LINE</li>
            <li>• เชื่อม Bitkub NEXT Wallet</li>
            <li>• ไปยังร้านค้า 31 แห่งในโคราช</li>
            <li>• สแกน QR Code เพื่อเก็บสแตมป์</li>
            <li>• รับ NFT ไปยังกระเป๋า Bitkub</li>
          </ul>
        </div>
      </section>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </div>
  );
}