import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data: buckets } = await supabase.storage.listBuckets();
  console.log('Buckets:', buckets?.map(b => b.name));

  const { data: polarFiles } = await supabase.storage.from('exhibitions').list('polar');
  console.log('Polar files:', polarFiles?.length);
  if (polarFiles?.length > 0) {
    console.log('Example polar file:', polarFiles[0].name);
  }

  const { data: underwaterFiles } = await supabase.storage.from('exhibitions').list('underwater');
  console.log('Underwater files:', underwaterFiles?.length);
}

check();
