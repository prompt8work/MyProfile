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

export type OgVariant = "blog" | "project" | "tool" | "training";

// Per-content-type OG accent (Docs/design/asset-prompt-library.md §10.2):
// Blog=plum/ivory (default), Project=cyan/dark, Tool & AI Lab=cyan/dark,
// Training=gold/ivory. Inferred from the path so existing buildMetadata()
// call sites don't need to pass it explicitly; an explicit `ogVariant`
// still overrides when a page wants something other than its default.
function inferOgVariant(path: string): OgVariant {
  if (path.startsWith("/ai-lab/work")) return "project";
  if (path.startsWith("/ai-lab")) return "tool";
  if (path.startsWith("/training")) return "training";
  return "blog";
}

// PRD §78 SEO: every public page should generate canonical URL + OpenGraph
// metadata, not just a title/description. One helper so every route gets
// the same shape rather than 20 near-identical generateMetadata bodies.
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  ogVariant,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  ogVariant?: OgVariant;
  // Page-specific search phrases; when omitted the root layout's sitewide
  // list (src/lib/seo.ts) applies.
  keywords?: string[];
}) {
  const canonicalUrl = getCanonicalUrl(path);
  const variant = ogVariant ?? inferOgVariant(path);
  const ogImageUrl = getCanonicalUrl(`/og?title=${encodeURIComponent(title)}&variant=${variant}`);
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: canonicalUrl },
    openGraph: { siteName: "PromptAtWork", locale: "en_IN", title, description, url: canonicalUrl, type, images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image" as const, title, description, images: [ogImageUrl] },
  };
}

// Master content doc §31 lists BreadcrumbList among the structured-data
// types the site should support; Phase 6 built the rest (Person, Article,
// Course, ItemList/VideoObject, TechArticle) but not this one. One helper
// so every page passes a plain [{ name, path }] list instead of
// hand-building the schema.org shape each time.
export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  };
}
