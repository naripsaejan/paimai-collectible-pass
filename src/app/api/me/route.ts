import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  // Simple membership check: cookie set by thirdweb sign-in API
  const cookieStore = await cookies();
  const isMember = cookieStore.get('tw_user')?.value === '1';
  if (!isMember) return NextResponse.json({ user: null, primaryWalletAddress: null });

  // Check for Bitkub wallet in localStorage (we can't access it directly from server)
  // So we'll return null and let client handle wallet status
  return NextResponse.json({
    user: { id: '1', name: 'Member', email: 'member@example.com' },
    primaryWalletAddress: null, // Will be checked on client side
  });
}