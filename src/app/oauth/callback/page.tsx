'use client';

import { useEffect } from 'react';
import { sdk } from '@/lib/bitkubchain-sdk';

export default function Page() {
  useEffect(() => {
    console.log('🔄 [OAuthCallback] Page loaded');
    console.log('🔍 [OAuthCallback] Current URL:', window.location.href);
    console.log('🔍 [OAuthCallback] Search params:', window.location.search);
    
    const code = new URLSearchParams(window.location.search).get('code');
    console.log('🔑 [OAuthCallback] Authorization code:', code ? 'Found' : 'Not found');
    
    if (code) {
      console.log('✅ [OAuthCallback] Code found, starting exchange...');
      exchange(code);
    } else {
      console.error('❌ [OAuthCallback] No authorization code found');
      console.log('🔍 [OAuthCallback] All search params:', Object.fromEntries(new URLSearchParams(window.location.search)));
      
      // ส่ง error message กลับไปยัง parent window
      if (window.opener) {
        console.log('📤 [OAuthCallback] Sending error message to parent window');
        window.opener.postMessage({
          type: 'BITKUB_AUTH_ERROR',
          error: 'No authorization code found'
        }, window.location.origin);
      } else {
        console.log('⚠️ [OAuthCallback] No window.opener found');
      }
      window.close();
    }
  }, []);

  const exchange = async (code: string) => {
    try {
      console.log('🔄 [OAuthCallback] Starting code exchange...');
      console.log('🔑 [OAuthCallback] Authorization code:', code);
      
      // ใช้ SDK ตามคู่มือภาพที่ถูกต้องในการแลก code
      await sdk.exchangeAuthorizationCode(code);
      console.log('✅ [OAuthCallback] Code exchange successful');
      
      // รอสักครู่เพื่อให้ SDK จัดการข้อมูลเสร็จสิ้น
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // ตรวจสอบว่า parent window ยังเปิดอยู่หรือไม่
      if (window.opener && !window.opener.closed) {
        console.log('📤 [OAuthCallback] Sending success message to parent window');
        const successMessage = {
          type: 'BITKUB_AUTH_SUCCESS',
          success: true,
          timestamp: Date.now()
        };
        console.log('📤 [OAuthCallback] Success message:', successMessage);
        
        // ส่ง message หลายครั้งเพื่อให้แน่ใจว่าได้รับ
        window.opener.postMessage(successMessage, window.location.origin);
        setTimeout(() => {
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage(successMessage, window.location.origin);
          }
        }, 500);
        setTimeout(() => {
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage(successMessage, window.location.origin);
          }
        }, 1000);
      } else {
        console.log('⚠️ [OAuthCallback] No window.opener found or parent window closed');
      }
      
      console.log('🚪 [OAuthCallback] Closing window...');
      window.close();
    } catch (error) {
      console.error('❌ [OAuthCallback] Error exchanging authorization code:', error);
      console.error('❌ [OAuthCallback] Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        name: error instanceof Error ? error.name : undefined
      });
      
      // ส่ง error message กลับไปยัง parent window
      if (window.opener && !window.opener.closed) {
        console.log('📤 [OAuthCallback] Sending error message to parent window');
        const errorMessage = {
          type: 'BITKUB_AUTH_ERROR',
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: Date.now()
        };
        console.log('📤 [OAuthCallback] Error message:', errorMessage);
        window.opener.postMessage(errorMessage, window.location.origin);
      } else {
        console.log('⚠️ [OAuthCallback] No window.opener found or parent window closed');
      }
      
      console.log('🚪 [OAuthCallback] Closing window after error...');
      window.close();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">กำลังเชื่อมต่อ</h2>
          <p className="text-gray-600">กำลังแลก authorization code...</p>
        </div>
      </div>
    </div>
  );
}