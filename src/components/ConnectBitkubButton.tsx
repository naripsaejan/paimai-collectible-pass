'use client';

import { useState, useEffect, useRef } from 'react';
import { sdk } from '@/lib/bitkubchain-sdk';

export default function ConnectBitkubButton({ onConnected }: { onConnected?: (address: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const hasInitialized = useRef(false);

  // ตรวจสอบการเชื่อมต่อที่บันทึกไว้เมื่อเริ่มต้น component (ครั้งเดียวเท่านั้น)
  useEffect(() => {
    if (hasInitialized.current) {
      console.log('⚠️ [ConnectBitkubButton] Already initialized, skipping...');
      return;
    }
    
    console.log('🔍 [ConnectBitkubButton] Component mounted - checking saved connection');
    hasInitialized.current = true;
    
    // ตรวจสอบการเชื่อมต่อที่บันทึกไว้
    const savedWallet = localStorage.getItem('bitkub_wallet');
    const connectionStatus = localStorage.getItem('bitkub_connection_status');
    
    if (savedWallet && connectionStatus === 'connected') {
      try {
        const walletData = JSON.parse(savedWallet);
        console.log('💾 [ConnectBitkubButton] Found saved wallet data:', walletData);
        
        if (walletData.address && walletData.connected) {
          console.log('✅ [ConnectBitkubButton] Restoring saved connection:', walletData.address);
          setAddress(walletData.address);
          onConnected?.(walletData.address);
          return; // ไม่ต้องล้างข้อมูล
        }
      } catch (error) {
        console.error('❌ [ConnectBitkubButton] Error parsing saved wallet data:', error);
      }
    }
    
    // ถ้าไม่มีข้อมูลการเชื่อมต่อที่ถูกต้อง ให้ล้างข้อมูล (ครั้งเดียวเท่านั้น)
    if (!savedWallet || connectionStatus !== 'connected') {
      console.log('🧹 [ConnectBitkubButton] No valid saved connection - clearing data');
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
      
      setAddress(null);
      onConnected?.('');
    }
  }, []); // ใช้ dependency array ว่างเพื่อให้รันครั้งเดียวเท่านั้น

  // ฟัง message จาก OAuth callback เท่านั้น - ไม่ auto-check connection
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('📨 [ConnectBitkubButton] Received message:', {
        origin: event.origin,
        expectedOrigin: window.location.origin,
        data: event.data,
        type: event.data?.type
      });
      
      if (event.origin !== window.location.origin) {
        console.log('⚠️ [ConnectBitkubButton] Message origin mismatch, ignoring');
        return;
      }
      
      // ตรวจสอบ message type ที่ถูกต้อง
      if (event.data && event.data.type === 'BITKUB_AUTH_SUCCESS') {
        console.log('✅ [ConnectBitkubButton] OAuth success message received');
        
        // OAuth สำเร็จ ให้ตรวจสอบ wallet address ใหม่
        setTimeout(async () => {
          try {
            console.log('🔍 [ConnectBitkubButton] Fetching user info...');
            // ใช้ SDK methods ตามคู่มือภาพที่ถูกต้อง
            const userInfo = await sdk.getUserInfo();
            console.log('👤 [ConnectBitkubButton] User info:', userInfo);
            
            if (!userInfo) {
              throw new Error('ไม่สามารถดึงข้อมูลผู้ใช้ได้');
            }
            
            console.log('🔍 [ConnectBitkubButton] Fetching wallet address...');
            const walletAddress = await sdk.getUserWalletAddress();
            console.log('💰 [ConnectBitkubButton] Wallet address:', walletAddress);
            
            if (!walletAddress) {
              throw new Error('ไม่สามารถดึง wallet address ได้');
            }
            
            console.log('✅ [ConnectBitkubButton] Both user info and wallet address found');
            
            setAddress(walletAddress);
            
            // บันทึก wallet address ไปยัง backend
            console.log('💾 [ConnectBitkubButton] Saving wallet to backend...');
            try {
              await saveWalletToBackend(walletAddress);
            } catch (backendError) {
              console.warn('⚠️ [ConnectBitkubButton] Backend save failed, continuing...', backendError);
            }
            
            // บันทึกข้อมูลทั้งหมดใน localStorage
            console.log('💾 [ConnectBitkubButton] Saving complete data to localStorage...');
            const walletData = {
              address: walletAddress,
              userInfo: userInfo,
              connected: true,
              timestamp: Date.now()
            };
            localStorage.setItem('bitkub_wallet', JSON.stringify(walletData));
            localStorage.setItem('bitkub_connection_status', 'connected');
            
            console.log('🎉 [ConnectBitkubButton] Connection successful!');
            console.log('💾 [ConnectBitkubButton] Saved data:', walletData);
            
            // ส่งข้อมูลไปยัง parent component
            onConnected?.(walletAddress);
          } catch (error) {
            console.error('❌ [ConnectBitkubButton] Error after OAuth success:', error);
            const errorMessage = error instanceof Error ? error.message : 'ไม่ทราบสาเหตุ';
            alert('เชื่อมต่อ Bitkub NEXT ไม่สำเร็จ: ' + errorMessage);
          } finally {
            setLoading(false);
          }
        }, 1000);
      } else if (event.data && event.data.type === 'BITKUB_AUTH_ERROR') {
        console.error('❌ [ConnectBitkubButton] OAuth error message received:', event.data.error);
        setLoading(false);
        alert('เชื่อมต่อ Bitkub NEXT ไม่สำเร็จ: ' + event.data.error);
      } else {
        console.log('ℹ️ [ConnectBitkubButton] Unknown or invalid message:', {
          hasData: !!event.data,
          type: event.data?.type,
          data: event.data
        });
      }
    };
    
    console.log('👂 [ConnectBitkubButton] Setting up message listener');
    window.addEventListener('message', handleMessage);
    
    return () => {
      console.log('🔇 [ConnectBitkubButton] Removing message listener');
      window.removeEventListener('message', handleMessage);
    };
  }, []); // ลบ dependency ออกเพื่อป้องกัน re-mount

  // ตรวจสอบการปิด modal และรีเซ็ต loading state
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // ตรวจสอบว่า popup ยังเปิดอยู่หรือไม่
        setTimeout(() => {
          console.log('⚠️ [ConnectBitkubButton] Modal closed without completion, resetting loading state');
          setLoading(false);
        }, 3000); // รอ 3 วินาทีเพื่อให้แน่ใจว่า modal ปิดแล้ว
      }
    };

    const handleBeforeUnload = () => {
      console.log('⚠️ [ConnectBitkubButton] Page unloading while loading, resetting state');
      setLoading(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); // ลบ loading dependency ออก

  const saveWalletToBackend = async (walletAddress: string) => {
    try {
      await fetch('/api/user/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: walletAddress }),
      });
    } catch (error) {
      console.error('Failed to save wallet to backend:', error);
    }
  };

  const handleConnect = async () => {
    try {
      console.log('🚀 [ConnectBitkubButton] Starting FRESH connection process...');
      setLoading(true);
      
      // ตั้งค่า timeout สำหรับ loading state (30 วินาที)
      const loadingTimeout = setTimeout(() => {
        console.log('⏰ [ConnectBitkubButton] Loading timeout, resetting state');
        setLoading(false);
      }, 30000);
      
      // บังคับ logout และล้างข้อมูลทุกครั้งก่อนเชื่อมต่อใหม่
      try {
        console.log('🔄 [ConnectBitkubButton] Force logout...');
        await sdk.logout();
        console.log('✅ [ConnectBitkubButton] Force logout successful');
      } catch (e) {
        console.log('⚠️ [ConnectBitkubButton] Force logout error (ignored):', e);
      }
      
      // ล้างข้อมูลทั้งหมดอย่างสมบูรณ์
      console.log('🧹 [ConnectBitkubButton] Clearing ALL local data...');
      setAddress(null);
      localStorage.removeItem('bitkub_wallet');
      localStorage.removeItem('bitkub_auth_token');
      localStorage.removeItem('bitkub_user_info');
      localStorage.removeItem('bitkub_session');
      
      // ล้างข้อมูลใน sessionStorage ด้วย
      sessionStorage.removeItem('bitkub_wallet');
      sessionStorage.removeItem('bitkub_auth_token');
      sessionStorage.removeItem('bitkub_user_info');
      sessionStorage.removeItem('bitkub_session');
      
      // รอสักครู่เพื่อให้การล้างข้อมูลเสร็จสิ้น
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // ใช้ SDK ตามคู่มือภาพที่ถูกต้อง - จะเปิด login window
      console.log('🔐 [ConnectBitkubButton] Calling sdk.loginWithBitkubNext()...');
      await sdk.loginWithBitkubNext();
      console.log('✅ [ConnectBitkubButton] loginWithBitkubNext() called successfully');
      
      // รอให้ OAuth callback จัดการการเชื่อมต่อ
      // การเชื่อมต่อจะสำเร็จผ่าน message event listener
      console.log('⏳ [ConnectBitkubButton] Waiting for OAuth callback...');
      
      // ล้าง timeout เมื่อเชื่อมต่อสำเร็จ
      clearTimeout(loadingTimeout);
      
    } catch (error) {
      console.error('❌ [ConnectBitkubButton] Connect failed:', error);
      console.error('❌ [ConnectBitkubButton] Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        name: error instanceof Error ? error.name : undefined
      });
      
      // จัดการ error เฉพาะ
      let errorMessage = 'ไม่ทราบสาเหตุ';
      if (error instanceof Error) {
        if (error.message.includes('ERROR_NEXT_STATUS_NOT_CONNECTED')) {
          errorMessage = 'กรุณาเปิดแอป Bitkub NEXT และอนุมัติการเชื่อมต่อ';
        } else if (error.message.includes('User rejected')) {
          errorMessage = 'ผู้ใช้ยกเลิกการเชื่อมต่อ';
        } else if (error.message.includes('popup_closed_by_user')) {
          errorMessage = 'กรุณาเปิดแอป Bitkub NEXT และอนุมัติการเชื่อมต่อ';
        } else {
          errorMessage = error.message;
        }
      }
      
      console.log('🚨 [ConnectBitkubButton] Showing error alert:', errorMessage);
      alert('เชื่อมต่อ Bitkub NEXT ไม่สำเร็จ: ' + errorMessage);
      setLoading(false);
      
      // ล้าง timeout เมื่อเกิด error
      clearTimeout(loadingTimeout);
    }
  };

  const handleDisconnect = async () => {
    try {
      console.log('🚪 [ConnectBitkubButton] Starting disconnect process...');
      setLoading(true);
      
      // บังคับ logout จาก SDK
      console.log('🔄 [ConnectBitkubButton] Logging out from SDK...');
      await sdk.logout();
      console.log('✅ [ConnectBitkubButton] SDK logout successful');
      
      // ล้าง state
      setAddress(null);
      onConnected?.('');
      
      // ลบข้อมูลทั้งหมดจาก localStorage
      console.log('🧹 [ConnectBitkubButton] Clearing localStorage...');
      localStorage.removeItem('bitkub_wallet');
      localStorage.removeItem('bitkub_auth_token');
      localStorage.removeItem('bitkub_user_info');
      localStorage.removeItem('bitkub_session');
      localStorage.removeItem('bitkub_connection_status');
      
      // ลบข้อมูลทั้งหมดจาก sessionStorage
      console.log('🧹 [ConnectBitkubButton] Clearing sessionStorage...');
      sessionStorage.removeItem('bitkub_wallet');
      sessionStorage.removeItem('bitkub_auth_token');
      sessionStorage.removeItem('bitkub_user_info');
      sessionStorage.removeItem('bitkub_session');
      sessionStorage.removeItem('bitkub_connection_status');
      
      console.log('✅ [ConnectBitkubButton] Disconnect completed successfully');
      
      // แสดงข้อความแจ้งให้ผู้ใช้รู้ว่าต้องเชื่อมต่อใหม่
      alert('ออกจากระบบแล้ว กรุณาเชื่อมต่อกระเป๋าใหม่');
    } catch (error) {
      console.error('❌ [ConnectBitkubButton] Logout failed:', error);
      alert('ออกจากระบบไม่สำเร็จ: ' + (error instanceof Error ? error.message : 'ไม่ทราบสาเหตุ'));
    } finally {
      setLoading(false);
    }
  };

  if (address) {
    return (
      <div className="w-full space-y-3">
        <div className="bg-green-500 text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-2">
          <span className="w-2 h-2 bg-white rounded-full"></span>
          <span>เชื่อมแล้ว - {address.slice(0, 6)}...{address.slice(-4)}</span>
        </div>
        <button 
          onClick={handleDisconnect}
          className="w-full bg-gray-500 text-white py-2 rounded-lg text-sm"
        >
          เปลี่ยนกระเป๋า
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleConnect} 
      disabled={loading}
      className="w-full bg-black text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          <span>กำลังเชื่อม...</span>
        </>
      ) : (
        <>
          <span>🔗</span>
          <span>Connect Bitkub NEXT 1</span>
        </>
      )}
    </button>
  );
}