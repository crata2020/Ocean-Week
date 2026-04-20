'use server'

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://pjxuvjcwlhcevwrecvof.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_xx2YcnOEHFG6-4VyuYh2mQ_X8krD89z';

export async function getPhotosAction(folder: string) {
  try {
    console.log(`Action: Fetching photos for ${folder}`);
    
    // Use the Supabase Storage API directly via fetch to avoid client library hangs in dev mode
    const url = `${SUPABASE_URL}/storage/v1/object/list/exhibitions`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': SUPABASE_SERVICE_ROLE_KEY
      },
      body: JSON.stringify({
        prefix: folder,
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`Storage API error: ${response.status}`, errText);
      return { images: [] };
    }

    const data = await response.json();
    
    const images = (data || [])
      .filter((file: any) => !file.name.startsWith('.'))
      .map((file: any) => {
        return {
          name: file.name,
          url: `${SUPABASE_URL}/storage/v1/object/public/exhibitions/${folder}/${file.name}`
        };
      });

    console.log(`Action: Found ${images.length} images`);
    return { images };
  } catch (err: any) {
    console.error('Action caught error:', err.message);
    return { images: [] };
  }
}
