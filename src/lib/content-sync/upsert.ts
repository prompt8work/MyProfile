import type { SanityClient } from "next-sanity";
import type { NormalizedContentItem } from "./types";

// PRD §87 Duplicate Prevention: "(source, external_id)" as the unique key.
// Sanity has no composite-unique-constraint concept, so the deterministic
// document _id below does the same job — createOrReplace against the same
// _id on a re-sync updates the existing document instead of creating a
// second one for the same video/post.
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 96);
}

export async function upsertVideo(client: SanityClient, item: NormalizedContentItem): Promise<void> {
  await client.createOrReplace({
    _id: `video-${item.source}-${item.externalId}`,
    _type: "video",
    slug: { _type: "slug", current: slugify(item.title) },
    title: item.title,
    thumbnailUrl: item.thumbnailUrl,
    description: item.description,
    publishedAt: item.publishedAt,
    source: item.source,
    externalId: item.externalId,
    externalUrl: item.externalUrl,
  });
}
