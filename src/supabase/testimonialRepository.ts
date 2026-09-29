import { supabase } from "./client";

// Repository pattern (PRD §54) — the only file that touches the
// testimonial table directly.

export const SOURCE_CONTEXTS = ["training", "consulting", "general"] as const;
export type TestimonialSourceContext = (typeof SOURCE_CONTEXTS)[number];

export type TestimonialInput = {
  name: string;
  role?: string;
  organization?: string;
  quote: string;
  sourceContext: TestimonialSourceContext;
};

export async function createTestimonial(input: TestimonialInput): Promise<void> {
  // Deliberately NOT chaining .select() after .insert() — same RLS/
  // RETURNING reasoning as ContactRepository and CommentRepository.
  const { error } = await supabase.from("testimonial").insert({
    name: input.name,
    role: input.role || null,
    organization: input.organization || null,
    quote: input.quote,
    source_context: input.sourceContext,
    status: "PENDING",
  });

  if (error) {
    throw new Error(`Failed to create testimonial: ${error.message}`);
  }
}

export type PublishedTestimonial = {
  id: string;
  name: string;
  role?: string;
  organization?: string;
  quote: string;
  createdAt: string;
};

export async function getPublishedTestimonials(limit = 20): Promise<PublishedTestimonial[]> {
  // The RLS policy already restricts anon reads to status = 'PUBLISHED',
  // but the explicit filter here is defense in depth, not reliance on RLS
  // alone — same principle as CommentRepository.
  const { data, error } = await supabase
    .from("testimonial")
    .select("id, name, role, organization, quote, created_at")
    .eq("status", "PUBLISHED")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch testimonials: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    role: row.role ?? undefined,
    organization: row.organization ?? undefined,
    quote: row.quote,
    createdAt: row.created_at,
  }));
}
