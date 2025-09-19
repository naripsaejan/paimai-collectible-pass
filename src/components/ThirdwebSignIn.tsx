'use client';

import { useState } from 'react';

export default function ThirdwebSignIn() {
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    try {
      setLoading(true);
      // Simulate thirdweb sign-in
      await fetch('/api/thirdweb/signin', { method: 'POST' });
      window.location.href = '/campaign';
    } catch (e) {
      console.error(e);
      alert('เข้าสู่ระบบไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button 
      onClick={handleSignIn} 
      disabled={loading}
      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-2"
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          <span>กำลังเข้าสู่ระบบ...</span>
        </>
      ) : (
        <>
          <span>🔐</span>
          <span>เข้าสู่ระบบด้วย thirdweb</span>
        </>
      )}
    </button>
  );
}