import { createClient } from "@supabase/supabase-js";

type Database = {
  public: {
    Tables: {
      registrations: {
        Row: {
          id: string;
          name: string;
          organization: string;
          title: string;
          phone_raw: string;
          phone_normalized: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          organization: string;
          title: string;
          phone_raw: string;
          phone_normalized: string;
          email: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<{
          id: string;
          name: string;
          organization: string;
          title: string;
          phone_raw: string;
          phone_normalized: string;
          email: string;
          created_at: string;
          updated_at: string;
        }>;
        Relationships: [];
      };
    };
  };
};

export type RegistrationInsert =
  Database["public"]["Tables"]["registrations"]["Insert"];
export type RegistrationUpdate =
  Database["public"]["Tables"]["registrations"]["Update"];

export function getSupabaseAdminConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Supabase 환경변수(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)를 설정해주세요.",
    );
  }

  return { supabaseUrl, serviceRoleKey };
}

export function getSupabaseAdminClient() {
  const { supabaseUrl, serviceRoleKey } = getSupabaseAdminConfig();

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
