import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const { email, name, provider_id, avatar_url } = await req.json();

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('provider', 'line')
      .eq('provider_id', provider_id)
      .single();

    let user;
    let thirdwebWallet;

    if (existingUser) {
      // User exists, get their data
      user = existingUser;
      
      // Get their thirdweb wallet
      const { data: walletData } = await supabaseAdmin
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .eq('provider', 'thirdweb')
        .single();
      
      thirdwebWallet = walletData;
    } else {
      // Create new user
      const { data: newUser, error: userError } = await supabaseAdmin
        .from('users')
        .insert({
          id: uuidv4(),
          email,
          name,
          provider: 'line',
          provider_id,
          avatar_url
        })
        .select()
        .single();

      if (userError) {
        console.error('User creation error:', userError);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
      }

      user = newUser;

      // Create thirdweb wallet for new user
      const { data: newWallet, error: walletError } = await supabaseAdmin
        .from('wallets')
        .insert({
          id: uuidv4(),
          user_id: user.id,
          address: `0x${Math.random().toString(16).substr(2, 40)}`, // Mock address
          provider: 'thirdweb'
        })
        .select()
        .single();

      if (walletError) {
        console.error('Wallet creation error:', walletError);
        return NextResponse.json({ error: 'Failed to create wallet' }, { status: 500 });
      }

      thirdwebWallet = newWallet;
    }

    return NextResponse.json({
      user,
      thirdwebWallet,
      success: true
    });

  } catch (error) {
    console.error('LINE auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
