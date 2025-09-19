'use client';

import { initializeSDK, Network } from '@bitkub-chain/sdk.js';

// ใช้ Client ID และ Project ID จาก Bitkub Chain Playground ตามคู่มือภาพ
const clientID = process.env.NEXT_PUBLIC_BITKUB_CLIENT_ID || '66beec63a07410001cf88a7b';
const projectID = process.env.NEXT_PUBLIC_BITKUB_PROJECT_ID || 'sdk-e4ee4655-b212-4160-8746-853c2f7bb9d5';

console.log('🔧 [SDK] Initializing with Playground config:', {
  clientID,
  projectID,
  network: 'BKC_TESTNET'
});

// ใช้ BKC_TESTNET ตามคู่มือภาพ
const network = Network.BKC_TESTNET;

// ตั้งค่า redirect path สำหรับ OAuth callback ตามคู่มือภาพ
const initOpts = {
  loginRedirectPath: '/oauth/callback',
};

console.log('🔧 [SDK] Init options:', initOpts);

// สร้าง SDK instance ตามคู่มือภาพที่ถูกต้อง
const sdk = initializeSDK(clientID, projectID, network, initOpts);

console.log('✅ [SDK] SDK initialized successfully with Playground config');

export { sdk };

