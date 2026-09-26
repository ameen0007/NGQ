import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// This endpoint pings Supabase to prevent the free-tier project from pausing
// due to 7 days of inactivity. Set up an external cron to call this daily.

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Simple lightweight query — just check if we can reach Supabase
    const { error } = await supabase.from('profiles').select('id', { count: 'exact', head: true });

    if (error) {
      console.log('[keep-alive] Supabase ping failed:', error.message);
      return NextResponse.json(
        { status: 'error', message: error.message, timestamp: new Date().toISOString() },
        { status: 500 }
      );
    }

    console.log('[keep-alive] Supabase ping successful at', new Date().toISOString());
    return NextResponse.json({
      status: 'ok',
      message: 'Supabase is alive',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[keep-alive] Unexpected error:', err);
    return NextResponse.json(
      { status: 'error', message: 'Unexpected error' },
      { status: 500 }
    );
  }
}
