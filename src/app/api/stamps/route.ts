import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
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

    // Get all stamps for this campaign
    const { data: stamps, error: stampsError } = await supabaseAdmin
      .from('stamps')
      .select('*')
      .eq('campaign_progress_id', campaignProgress.id)
      .order('stamp_number', { ascending: true });

    if (stampsError) {
      console.error('Stamps fetch error:', stampsError);
      return NextResponse.json({ error: 'Failed to fetch stamps' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      progress: {
        stampsCollected: campaignProgress.stamps_collected,
        totalStamps: campaignProgress.total_stamps,
        isComplete: campaignProgress.stamps_collected >= campaignProgress.total_stamps
      },
      stamps: stamps || []
    });

  } catch (error) {
    console.error('Stamps fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
