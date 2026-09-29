import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  // The resume PDF route reads its fonts from disk at runtime; make sure
  // they're traced into that function's deployment bundle. Same reasoning
  // for /og, which reads the headshot photo from disk to compose the
  // social share image.
  outputFileTracingIncludes: {
    "/resume/download": ["./assets/fonts/**/*"],
    "/og": ["./public/images/headshot.png"],
  },
  // Work, Engineering and About were folded into the AI Lab hub and the
  // homepage (Docs/development-plan/11-ai-lab-docs-hub.md). Permanent so
  // search engines and shared links move to the new URLs.
  async redirects() {
    return [
      { source: "/projects", destination: "/ai-lab/work", permanent: true },
      { source: "/projects/:slug", destination: "/ai-lab/work/:slug", permanent: true },
      { source: "/engineering", destination: "/ai-lab/engineering", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
