import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://pjxuvjcwlhcevwrecvof.supabase.co';
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_xx2YcnOEHFG6-4VyuYh2mQ_X8krD89z';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

async function test() {
  console.log('Testing with URL:', SUPABASE_URL);
  console.log('Testing with Key:', SERVICE_ROLE.substring(0, 15) + '...');

  const { data, error } = await supabase.storage.listBuckets();
  
  if (error) {
    console.error('ERROR Listing Buckets:', error.message);
  } else {
    console.log('SUCCESS! Found Buckets:', data.map(b => b.name));
  }
}

test();
