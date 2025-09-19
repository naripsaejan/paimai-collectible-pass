'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import ConnectBitkubButton from '@/components/ConnectBitkubButton';
import QRScanner from '@/components/QRScanner';
import Map from '@/components/Map';

export default function CampaignPage() {
  const { user, bitkubWallet, connectBitkub, isLoading } = useAuth();
  const [isMember, setIsMember] = useState<boolean | null>(null);
  const [hasWallet, setHasWallet] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [stamps, setStamps] = useState<any[]>([]);
  const [progress, setProgress] = useState({ stampsCollected: 0, totalStamps: 30, isComplete: false });
  const [isLoadingStamps, setIsLoadingStamps] = useState(false);

  useEffect(() => {
    // ตรวจสอบ user authentication
    if (isLoading) {
      setIsMember(null);
      return;
    }

    if (user) {
      console.log('✅ [CampaignPage] User is authenticated:', user);
      setIsMember(true);
      
      // ตรวจสอบ Bitkub wallet connection
      if (bitkubWallet && bitkubWallet.is_connected) {
        console.log('✅ [CampaignPage] Bitkub wallet connected:', bitkubWallet.address);
        setWalletAddress(bitkubWallet.address);
        setHasWallet(true);
        
        // โหลดข้อมูลสแตมป์
        loadStamps();
      } else {
        console.log('🚫 [CampaignPage] No Bitkub wallet connection');
        setHasWallet(false);
        setWalletAddress(null);
      }
    } else {
      console.log('🚫 [CampaignPage] User not authenticated');
      setIsMember(false);
      setHasWallet(false);
      setWalletAddress(null);
    }
  }, [user, bitkubWallet, isLoading]);

  const loadStamps = async () => {
    if (!user) return;
    
    try {
      setIsLoadingStamps(true);
      const response = await fetch(`/api/stamps?userId=${user.id}`);
      const data = await response.json();
      
      if (data.success) {
        setStamps(data.stamps);
        setProgress(data.progress);
      }
    } catch (error) {
      console.error('Failed to load stamps:', error);
    } finally {
      setIsLoadingStamps(false);
    }
  };

  const handleQRScanSuccess = async (qrCodeData: string) => {
    if (!user) return;
    
    try {
      const response = await fetch('/api/stamps/collect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          qrCodeData,
          locationName: `ร้านที่ ${stamps.length + 1}`
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // อัปเดตข้อมูลสแตมป์
        setStamps(prev => [...prev, data.stamp]);
        setProgress(data.progress);
        alert(`เก็บสแตมป์ที่ ${data.stamp.stamp_number} สำเร็จ!`);
      } else {
        if (data.alreadyCollected) {
          alert('สแตมป์นี้ถูกเก็บไปแล้ว');
        } else if (data.allCollected) {
          alert('เก็บสแตมป์ครบแล้ว!');
        } else {
          alert('ไม่สามารถเก็บสแตมป์ได้: ' + data.error);
        }
      }
    } catch (error) {
      console.error('Failed to collect stamp:', error);
      alert('เกิดข้อผิดพลาดในการเก็บสแตมป์');
    }
  };

  const clearWalletData = () => {
    console.log('🧹 [CampaignPage] Clearing wallet data...');
    localStorage.removeItem('bitkub_wallet');
    localStorage.removeItem('bitkub_auth_token');
    localStorage.removeItem('bitkub_user_info');
    localStorage.removeItem('bitkub_session');
    localStorage.removeItem('bitkub_connection_status');
    
    sessionStorage.removeItem('bitkub_wallet');
    sessionStorage.removeItem('bitkub_auth_token');
    sessionStorage.removeItem('bitkub_user_info');
    sessionStorage.removeItem('bitkub_session');
    sessionStorage.removeItem('bitkub_connection_status');
    
    setHasWallet(false);
    setWalletAddress(null);
  };

  const handleWalletConnected = async (address: string) => {
    if (address) {
      console.log('✅ [CampaignPage] Wallet connected:', address);
      
      // เชื่อมโยง Bitkub wallet กับ user account
      const result = await connectBitkub({
        address: address,
        userInfo: { name: 'Bitkub User' } // Mock data
      });
      
      if (result.success) {
        console.log('✅ [CampaignPage] Bitkub wallet linked to user account');
        setWalletAddress(address);
        setHasWallet(true);
      } else {
        console.error('❌ [CampaignPage] Failed to link Bitkub wallet:', result.error);
        alert('เชื่อมโยงกระเป๋าไม่สำเร็จ: ' + result.error);
      }
    } else {
      console.log('🚫 [CampaignPage] Wallet disconnected');
      setWalletAddress(null);
      setHasWallet(false);
    }
  };

  if (isMember === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!isMember) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
            <span className="text-2xl">🔒</span>
          </div>
          <h1 className="text-xl font-bold">กรุณาเข้าสู่ระบบก่อน</h1>
          <p className="text-gray-600 text-sm">คุณต้องเข้าสู่ระบบที่หน้าแรกก่อนถึงจะเล่นแคมเปญได้</p>
          <Link href="/" className="inline-block bg-black text-white px-6 py-3 rounded-lg">
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="p-4 border-b">
        <h1 className="text-xl font-bold">แคมเปญ</h1>
      </header>

      {!hasWallet ? (
        <div className="p-6 space-y-6">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center">
              <span className="text-3xl">🎯</span>
            </div>
            <h2 className="text-2xl font-bold">30 Cafe 30 Artist</h2>
            <p className="text-gray-600">เชื่อม Bitkub NEXT เพื่อเริ่มเล่น</p>
          </div>

          {/* Connect Button */}
          <div className="space-y-4">
            <ConnectBitkubButton onConnected={handleWalletConnected} />
            <p className="text-xs text-gray-500 text-center">
              ต้องเชื่อมกระเป๋า Bitkub NEXT เพื่อเล่นแคมเปญ
            </p>
          </div>

          {/* Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-sm mb-2">สิ่งที่คุณจะได้รับ</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• NFT สแตมป์ 30 ชิ้น</li>
              <li>• เก็บได้จากร้านค้าในโคราช</li>
              <li>• สแกน QR Code เพื่อรับ NFT</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="p-4 space-y-6">
          {/* Status */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">สถานะการสะสม</h3>
                <p className="text-sm opacity-90">{progress.stampsCollected} / {progress.totalStamps} สแตมป์</p>
                <p className="text-xs opacity-75 mt-1">
                  {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                </p>
              </div>
              <div className="text-2xl">
                {progress.isComplete ? '🏆' : '🎯'}
              </div>
            </div>
            <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${(progress.stampsCollected / progress.totalStamps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Map */}
          <div className="space-y-3">
            <h3 className="font-semibold">แผนที่ร้านค้า</h3>
            <Map 
              stamps={stamps}
              onLocationSelect={(location) => {
                console.log('Selected location:', location);
                // สามารถเพิ่มการจัดการเมื่อเลือกตำแหน่งได้
              }}
            />
            <p className="text-xs text-gray-500 text-center">
              🔴 ยังไม่เยี่ยมชม | 🟢 เยี่ยมชมแล้ว
            </p>
          </div>

          {/* NFT Grid */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">สแตมป์ NFT</h3>
              <button
                onClick={() => setShowQRScanner(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                สแกน QR Code
              </button>
            </div>
            
            {isLoadingStamps ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">กำลังโหลดสแตมป์...</p>
              </div>
            ) : (
              <div className="grid grid-cols-6 gap-2">
                {Array.from({ length: 30 }).map((_, i) => {
                  const stamp = stamps.find(s => s.stamp_number === i + 1);
                  const isCollected = !!stamp;
                  
                  return (
                    <div 
                      key={i} 
                      className={`aspect-square rounded-lg flex items-center justify-center ${
                        isCollected 
                          ? 'bg-gradient-to-br from-green-400 to-blue-500 text-white' 
                          : 'bg-gray-200'
                      }`}
                    >
                      {isCollected ? (
                        <div className="text-center">
                          <div className="text-lg">✓</div>
                          <div className="text-xs">{i + 1}</div>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">{i + 1}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            
            <p className="text-xs text-gray-500 text-center">
              สแกน QR Code ที่ร้านเพื่อปลดล็อกสแตมป์
            </p>
          </div>

          {/* Action Button */}
          <ConnectBitkubButton onConnected={handleWalletConnected} />
        </div>
      )}

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <QRScanner
          onScanSuccess={handleQRScanSuccess}
          onClose={() => setShowQRScanner(false)}
        />
      )}
    </div>
  );
}