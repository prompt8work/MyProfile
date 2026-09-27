import { supabase } from "./client";

// Repository pattern (PRD §54) — the only file that touches the
// contact_message table directly. Server Actions call this, never the
// Supabase client directly, so the query shape has exactly one place to
// change if the schema ever does.

export type ContactMessageInput = {
  name: string;
  email: string;
  organization?: string;
  purpose: string;
  message: string;
};

export async function createContactMessage(input: ContactMessageInput): Promise<void> {
  // Deliberately NOT chaining .select() after .insert(): Postgres RLS
  // requires a SELECT policy to satisfy RETURNING, and the anon role has
  // insert-only access (no SELECT policy exists — see the migration).
  // Chaining .select() here would make every submission fail. The caller
  // doesn't need the generated id back; success is "no error."
  const { error } = await supabase.from("contact_message").insert({
    name: input.name,
    email: input.email,
    organization: input.organization || null,
    purpose: input.purpose,
    message: input.message,
  });

  if (error) {
    throw new Error(`Failed to create contact message: ${error.message}`);
  }
}
