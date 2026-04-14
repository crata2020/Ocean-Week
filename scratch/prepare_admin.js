import { getSupabaseAdminClient } from "./src/lib/supabase-admin.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabase = getSupabaseAdminClient();

async function prepareUser() {
  const name = "김준영";
  const phone_raw = "010-9512-6575";
  const phone_normalized = "01095126575";

  // Check if user exists
  const { data: existingUser, error: fetchError } = await supabase
    .from("registrations")
    .select("*")
    .eq("phone_normalized", phone_normalized)
    .maybeSingle();

  if (fetchError) {
    console.error("Error fetching user:", fetchError);
    return;
  }

  if (existingUser) {
    console.log(`User exists: ${existingUser.name} (${existingUser.role}). Updating to admin...`);
    const { error: updateError } = await supabase
      .from("registrations")
      .update({ role: "admin", name: name, phone_raw: phone_raw })
      .eq("id", existingUser.id);
    
    if (updateError) console.error("Error updating user:", updateError);
    else console.log("User updated to admin.");
  } else {
    console.log("User not found. Creating new admin user...");
    const { error: insertError } = await supabase
      .from("registrations")
      .insert({
        name: name,
        organization: "관리자",
        title: "관리자",
        phone_raw: phone_raw,
        phone_normalized: phone_normalized,
        email: "admin@example.com",
        role: "admin",
        selected_session_ids: ["day1-session1", "day2-session1", "day3-session1"], // Some sample sessions
        consent: true
      });
    
    if (insertError) console.error("Error inserting user:", insertError);
    else console.log("New admin user created.");
  }
}

prepareUser();
