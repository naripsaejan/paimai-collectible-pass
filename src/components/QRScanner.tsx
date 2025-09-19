'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';

interface QRScannerProps {
  onScanSuccess: (result: string) => void;
  onScanError?: (error: string) => void;
  onClose: () => void;
}

export default function QRScanner({ onScanSuccess, onScanError, onClose }: QRScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!scannerRef.current) {
      startScanner();
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, []);

  const startScanner = () => {
    try {
      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          qrbox: { width: 250, height: 250 },
          fps: 5,
          supportedFormats: [Html5QrcodeSupportedFormats.QR_CODE],
          aspectRatio: 1.0,
        },
        false
      );

      scanner.render(
        (decodedText) => {
          console.log('QR Code scanned:', decodedText);
          setIsScanning(false);
          onScanSuccess(decodedText);
          scanner.clear().catch(console.error);
        },
        (error) => {
          // Ignore common scanning errors
          if (error.includes('No QR code found') || error.includes('NotFoundException')) {
            return;
          }
          console.error('QR scanning error:', error);
          setError(error);
          onScanError?.(error);
        }
      );

      scannerRef.current = scanner;
      setIsScanning(true);
    } catch (err) {
      console.error('Failed to start QR scanner:', err);
      setError('ไม่สามารถเริ่มต้นสแกนเนอร์ได้');
    }
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">สแกน QR Code</h2>
          <button
            onClick={() => {
              stopScanner();
              onClose();
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scanner */}
        <div className="p-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-2">
              ชี้กล้องไปที่ QR Code ที่ร้านค้า
            </p>
            <div className="relative">
              <div id="qr-reader" className="w-full"></div>
              {isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pulse bg-blue-500 bg-opacity-20 rounded-lg p-4">
                    <div className="text-blue-600 text-sm font-medium">กำลังสแกน...</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
            <p className="font-medium mb-1">วิธีสแกน:</p>
            <ul className="space-y-1 text-xs">
              <li>• วางโทรศัพท์ให้ QR Code อยู่ในกรอบ</li>
              <li>• รอให้กล้องโฟกัสและอ่าน QR Code</li>
              <li>• ระบบจะประมวลผลและเก็บสแตมป์อัตโนมัติ</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-4">
            <button
              onClick={() => {
                stopScanner();
                startScanner();
              }}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm"
            >
              เริ่มสแกนใหม่
            </button>
            <button
              onClick={() => {
                stopScanner();
                onClose();
              }}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm"
            >
              ปิด
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
