import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set('tw_user', '1', { httpOnly: false, path: '/' });
  return res;
}