import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  'https://pjxuvjcwlhcevwrecvof.supabase.co',
  'sb_secret_xx2YcnOEHFG6-4VyuYh2mQ_X8krD89z' // This is a SECRET KEY, but I'm use it for debugging the hanging issue
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder');

    if (!folder) return NextResponse.json({ error: 'No folder' }, { status: 400 });

    const { data: listData, error: listError } = await supabaseAdmin.storage
      .from('exhibitions')
      .list(folder);

    if (listError) return NextResponse.json({ error: listError.message }, { status: 500 });

    const images = (listData || [])
      .filter(f => !f.name.startsWith('.'))
      .map(f => ({
        name: f.name,
        url: `https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/exhibitions/${folder}/${f.name}`
      }));

    return NextResponse.json({ images });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
