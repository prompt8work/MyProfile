import { supabase } from "./client";

// Repository pattern (PRD §54) — the only file that touches the comment
// table directly.

export type CommentInput = {
  contentId: string;
  name: string;
  email: string;
  comment: string;
};

export async function createComment(input: CommentInput): Promise<void> {
  // Deliberately NOT chaining .select() after .insert() — same RLS/
  // RETURNING reasoning as ContactRepository. The RLS policy also enforces
  // status = 'PENDING' server-side, so this insert can't smuggle in any
  // other status even if a caller tried to.
  const { error } = await supabase.from("comment").insert({
    content_id: input.contentId,
    name: input.name,
    email: input.email,
    comment: input.comment,
    status: "PENDING",
  });

  if (error) {
    throw new Error(`Failed to create comment: ${error.message}`);
  }
}

export type PublishedComment = {
  id: string;
  name: string;
  comment: string;
  createdAt: string;
};

export async function getPublishedComments(contentId: string): Promise<PublishedComment[]> {
  // The RLS policy already restricts anon reads to status = 'PUBLISHED',
  // but the explicit filter here is defense in depth, not reliance on RLS
  // alone — the same principle as the Sanity `visibility != "private"`
  // queries.
  const { data, error } = await supabase
    .from("comment")
    .select("id, name, comment, created_at")
    .eq("content_id", contentId)
    .eq("status", "PUBLISHED")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch comments: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    comment: row.comment,
    createdAt: row.created_at,
  }));
}
