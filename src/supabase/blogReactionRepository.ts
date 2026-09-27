import { supabase } from "./client";

// Repository pattern (PRD §54) — the only file that touches the
// blog_reaction table directly.

export type ReactionType = "like" | "love" | "insightful" | "useful" | "share";

export async function addReaction(contentId: string, reactionType: ReactionType, visitorHash: string): Promise<void> {
  // A duplicate (content_id, reaction_type, visitor_hash) hits the unique
  // index and errors with code 23505 — that's the same visitor clicking
  // the same reaction twice, not a real failure, so it's swallowed here
  // rather than surfaced as an error to the UI.
  const { error } = await supabase.from("blog_reaction").insert({
    content_id: contentId,
    reaction_type: reactionType,
    visitor_hash: visitorHash,
  });

  if (error && error.code !== "23505") {
    throw new Error(`Failed to add reaction: ${error.message}`);
  }
}

export type ReactionCounts = Record<ReactionType, number>;

export async function getReactionCounts(contentId: string): Promise<ReactionCounts> {
  const counts: ReactionCounts = { like: 0, love: 0, insightful: 0, useful: 0, share: 0 };

  const { data, error } = await supabase
    .from("blog_reaction")
    .select("reaction_type")
    .eq("content_id", contentId);

  if (error) {
    throw new Error(`Failed to fetch reaction counts: ${error.message}`);
  }

  for (const row of data ?? []) {
    const type = row.reaction_type as ReactionType;
    if (type in counts) counts[type] += 1;
  }

  return counts;
}
