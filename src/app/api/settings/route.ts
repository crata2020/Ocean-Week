import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = String(body.id);
    const is_active = Boolean(body.is_active);
    const youtube_url = body.youtube_url ? String(body.youtube_url) : null;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdminClient();
    const { data, error } = await supabaseAdmin
      .from("site_settings")
      // @ts-ignore
      .update({ 
        is_active, 
        youtube_url, 
        updated_at: new Date().toISOString() 
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
