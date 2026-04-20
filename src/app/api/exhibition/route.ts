import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://pjxuvjcwlhcevwrecvof.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_xx2YcnOEHFG6-4VyuYh2mQ_X8krD89z';

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder');

    if (!folder) return NextResponse.json({ error: 'No folder provided' }, { status: 400 });

    console.log(`Fetching exhibition images for folder: ${folder}`);

    const { data: listData, error: listError } = await supabaseAdmin.storage
      .from('exhibitions')
      .list(folder, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });

    if (listError) {
      console.error('Supabase list error:', listError);
      return NextResponse.json({ error: listError.message }, { status: 500 });
    }

    if (!listData || listData.length === 0) {
      return NextResponse.json({ images: [], message: 'No images found in this folder' });
    }

    const images = listData
      .filter(f => !f.name.startsWith('.') && f.id !== null)
      .map(f => {
        const ext = f.name.substring(f.name.lastIndexOf('.'));
        const baseName = f.name.substring(0, f.name.lastIndexOf('.'));
        
        let displayName = baseName;
        try {
          // Decode URL-safe Base64
          const decoded = Buffer.from(baseName.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
          if (/[\u3131-\uD79D\w\s]/.test(decoded)) {
            displayName = decoded;
          }
        } catch (e) {}

        const { data: { publicUrl } } = supabaseAdmin.storage
          .from('exhibitions')
          .getPublicUrl(`${folder}/${f.name}`);

        return {
          name: displayName + ext,
          url: publicUrl
        };
      });

    return NextResponse.json({ images });
  } catch (err: any) {
    console.error('Exhibition API catch error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
