import { createClient } from '@supabase/supabase-js';
import type { Database } from './supabase-admin';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pjxuvjcwlhcevwrecvof.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_2Gc23VwTylXPrYUgYUA51A_N0VSiftX';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Falling back to hardcoded values for development.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
