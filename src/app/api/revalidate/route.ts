import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Sanity → Next.js on-demand revalidation. Configure in sanity.io/manage →
// API → Webhooks: URL https://<site>/api/revalidate, trigger on
// create/update/delete, projection `{_type, "slug": slug.current}`, and the
// same secret as SANITY_REVALIDATE_SECRET. Pages keep `revalidate = 60` as
// a fallback in case a webhook delivery is ever missed.
//
// Revalidates the whole site rather than mapping each _type to its routes:
// content is cross-linked everywhere (homepage previews, AI Lab sidebar,
// relatedContent, sitemap), so a per-type map would silently miss pages.
// For a site this size a full refresh on publish is cheap — pages rebuild
// lazily on their next visit, not all at once.

type WebhookPayload = { _type?: string; slug?: string };

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return new Response("Revalidation not configured", { status: 500 });
  }

  try {
    // Third arg waits for Content Lake eventual consistency, so the
    // rebuilt pages don't re-fetch the pre-publish version.
    const { isValidSignature, body } = await parseBody<WebhookPayload>(request, secret, true);

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }
    if (!body?._type) {
      return new Response("Bad request", { status: 400 });
    }

    revalidatePath("/", "layout");
    return Response.json({ revalidated: true, type: body._type, slug: body.slug ?? null });
  } catch {
    return new Response("Error revalidating", { status: 500 });
  }
}
