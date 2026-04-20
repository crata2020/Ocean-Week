import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

const getEnv = (key: string, fallback: string) => {
  const val = process.env[key];
  if (!val || val === '' || val === 'undefined') return fallback;
  return val;
};

const SUPABASE_URL = getEnv('SUPABASE_URL', 'https://pjxuvjcwlhcevwrecvof.supabase.co');
const SUPABASE_SERVICE_ROLE_KEY = getEnv('SUPABASE_SERVICE_ROLE_KEY', 'sb_secret_xx2YcnOEHFG6-4VyuYh2mQ_X8krD89z');
const SUPABASE_ANON_KEY = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'sb_publishable_2Gc23VwTylXPrYUgYUA51A_N0VSiftX');

// We will try service role first, but have an anon client ready as fallback
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const supabaseAnon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder');

    if (!folder) return NextResponse.json({ error: 'No folder provided' }, { status: 400 });

    console.log(`Fetching exhibition images for folder: ${folder}`);

    // Strategy: Try Service Role first, if it returns empty, try Anon role
    let { data: listData, error: listError } = await supabaseAdmin.storage
      .from('exhibitions')
      .list(folder, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });

    // If Service Role failed to see anything, try Anon Role (works if storage is public)
    if (listError || !listData || listData.length === 0) {
      console.log('Service role returned empty or error, trying Anon role...');
      const { data: anonData, error: anonError } = await supabaseAnon.storage
        .from('exhibitions')
        .list(folder, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });
      
      if (!anonError && anonData && anonData.length > 0) {
        listData = anonData;
        listError = null;
      }
    }

    if (listError) {
      console.error('Supabase list error:', listError);
      return NextResponse.json({ 
        error: listError.message,
        details: listError
      }, { status: 500 });
    }

    // DEBUG: Discovery session
    let availableFolders: any[] = [];
    let availableBuckets: any[] = [];
    if (!listData || listData.length === 0) {
      // List all buckets to verify names
      const { data: bucketList } = await supabaseAdmin.storage.listBuckets();
      availableBuckets = (bucketList || []).map(b => b.name);

      // List root of our targeted bucket
      const { data: rootData } = await supabaseAdmin.storage.from('exhibitions').list();
      availableFolders = (rootData || []).filter(item => !item.id).map(item => item.name);
    }

    if (!listData || listData.length === 0) {
      return NextResponse.json({ 
        images: [], 
        message: 'No images found in this folder',
        requestedFolder: folder,
        availableFolders,
        availableBuckets,
        debug_info: `Found ${availableBuckets.length} buckets. Target: 'exhibitions'`
      });
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
