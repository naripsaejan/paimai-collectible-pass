import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const isMember = cookieStore.get('tw_user')?.value === '1';
  if (!isMember) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { address } = await req.json();
  if (!address) return NextResponse.json({ error: 'Address required' }, { status: 400 });

  // Mock: just return success for now
  return NextResponse.json({ ok: true, address });
}