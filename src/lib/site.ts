// Single source of truth for the site's own canonical origin — used to
// build absolute URLs (LinkedIn share links, SEO canonical/OG tags) that
// must never resolve to a Sanity URL, a preview URL, or localhost. Set
// NEXT_PUBLIC_SITE_URL once a production domain is deployed; until then
// this falls back to localhost, which is correct for local testing but
// deliberately not something a real share link should ever go out with —
// see PRD 04.2 §8/§20.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export function getCanonicalUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

// PRD §78 SEO: every public page should generate canonical URL + OpenGraph
// metadata, not just a title/description. One helper so every route gets
// the same shape rather than 20 near-identical generateMetadata bodies.
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}) {
  const canonicalUrl = getCanonicalUrl(path);
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl, type },
    twitter: { card: "summary_large_image" as const, title, description },
  };
}
