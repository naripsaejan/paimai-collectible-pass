import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const { userId, qrCodeData, locationName } = await req.json();

    if (!userId || !qrCodeData) {
      return NextResponse.json({ error: 'User ID and QR code data required' }, { status: 400 });
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

    // Get campaign progress
    const { data: campaignProgress, error: progressError } = await supabaseAdmin
      .from('campaign_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (progressError || !campaignProgress) {
      return NextResponse.json({ error: 'Campaign progress not found' }, { status: 404 });
    }

    // Check if stamp already collected for this QR code
    const { data: existingStamp } = await supabaseAdmin
      .from('stamps')
      .select('*')
      .eq('campaign_progress_id', campaignProgress.id)
      .eq('qr_code_data', qrCodeData)
      .single();

    if (existingStamp) {
      return NextResponse.json({ 
        error: 'สแตมป์นี้ถูกเก็บไปแล้ว',
        alreadyCollected: true 
      }, { status: 400 });
    }

    // Get next stamp number
    const { data: stamps } = await supabaseAdmin
      .from('stamps')
      .select('stamp_number')
      .eq('campaign_progress_id', campaignProgress.id)
      .order('stamp_number', { ascending: true });

    const nextStampNumber = (stamps?.length || 0) + 1;

    if (nextStampNumber > campaignProgress.total_stamps) {
      return NextResponse.json({ 
        error: 'เก็บสแตมป์ครบแล้ว',
        allCollected: true 
      }, { status: 400 });
    }

    // Create new stamp
    const { data: newStamp, error: stampError } = await supabaseAdmin
      .from('stamps')
      .insert({
        id: uuidv4(),
        campaign_progress_id: campaignProgress.id,
        stamp_number: nextStampNumber,
        location_name: locationName || `ร้านที่ ${nextStampNumber}`,
        qr_code_data: qrCodeData,
        collected_at: new Date().toISOString()
      })
      .select()
      .single();

    if (stampError) {
      console.error('Stamp creation error:', stampError);
      return NextResponse.json({ error: 'Failed to create stamp' }, { status: 500 });
    }

    // Update campaign progress
    const { error: updateError } = await supabaseAdmin
      .from('campaign_progress')
      .update({
        stamps_collected: nextStampNumber,
        updated_at: new Date().toISOString()
      })
      .eq('id', campaignProgress.id);

    if (updateError) {
      console.error('Campaign progress update error:', updateError);
      return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      stamp: newStamp,
      progress: {
        stampsCollected: nextStampNumber,
        totalStamps: campaignProgress.total_stamps,
        isComplete: nextStampNumber >= campaignProgress.total_stamps
      }
    });

  } catch (error) {
    console.error('Stamp collection error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
