import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseAnonKey } from "./env";

// The anon/publishable key is safe here even though this client can be
// constructed server-side (Server Actions) — access control comes from
// each table's RLS policies (contact_message allows INSERT only for
// anon, no SELECT/UPDATE/DELETE), not from keeping this key secret.
// A service-role client, if a future phase needs one (e.g. the admin
// dashboard in Phase 6), belongs in a separate server-only file.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});
