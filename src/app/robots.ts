import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /studio is the Sanity Studio admin UI, not public content.
      // /resume/download requires a private token (see 09-v2-data-recuration.md)
      // and shouldn't be indexed or crawled regardless. /api holds only
      // machine endpoints (the Sanity revalidation webhook).
      disallow: ["/studio", "/resume/download", "/api"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
