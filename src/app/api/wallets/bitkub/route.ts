import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const { userId, bitkubData } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Check if user exists
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if bitkub wallet already exists
    const { data: existingBitkubWallet } = await supabaseAdmin
      .from('bitkub_wallets')
      .select('*')
      .eq('user_id', userId)
      .eq('provider', 'bitkub_next')
      .single();

    let bitkubWallet;

    if (existingBitkubWallet) {
      // Update existing wallet
      const { data: updatedWallet, error: updateError } = await supabaseAdmin
        .from('bitkub_wallets')
        .update({
          address: bitkubData.address,
          user_info: bitkubData.userInfo,
          is_connected: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingBitkubWallet.id)
        .select()
        .single();

      if (updateError) {
        console.error('Bitkub wallet update error:', updateError);
        return NextResponse.json({ error: 'Failed to update wallet' }, { status: 500 });
      }

      bitkubWallet = updatedWallet;
    } else {
      // Create new bitkub wallet
      const { data: newBitkubWallet, error: createError } = await supabaseAdmin
        .from('bitkub_wallets')
        .insert({
          id: uuidv4(),
          user_id: userId,
          address: bitkubData.address,
          provider: 'bitkub_next',
          user_info: bitkubData.userInfo,
          is_connected: true
        })
        .select()
        .single();

      if (createError) {
        console.error('Bitkub wallet creation error:', createError);
        return NextResponse.json({ error: 'Failed to create wallet' }, { status: 500 });
      }

      bitkubWallet = newBitkubWallet;
    }

    // Create or update campaign progress
    const { data: existingProgress } = await supabaseAdmin
      .from('campaign_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!existingProgress) {
      // Get thirdweb wallet
      const { data: thirdwebWallet } = await supabaseAdmin
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .eq('provider', 'thirdweb')
        .single();

      if (thirdwebWallet) {
        // Create campaign progress
        await supabaseAdmin
          .from('campaign_progress')
          .insert({
            id: uuidv4(),
            user_id: userId,
            thirdweb_wallet_id: thirdwebWallet.id,
            bitkub_wallet_id: bitkubWallet.id,
            stamps_collected: 0,
            total_stamps: 30,
            is_active: true
          });
      }
    } else {
      // Update existing progress with bitkub wallet
      await supabaseAdmin
        .from('campaign_progress')
        .update({
          bitkub_wallet_id: bitkubWallet.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingProgress.id);
    }

    return NextResponse.json({
      bitkubWallet,
      success: true
    });

  } catch (error) {
    console.error('Bitkub wallet connection error:', error);
    return NextResponse.json({ error: 'Connection failed' }, { status: 500 });
  }
}
