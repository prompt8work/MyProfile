import type { MetadataRoute } from "next";
import { client } from "../sanity/lib/client";
import {
  automationSlugsQuery,
  blogSlugsQuery,
  experimentSlugsQuery,
  projectSlugsQuery,
  promptSlugsQuery,
  toolSlugsQuery,
  trainingSlugsQuery,
} from "../sanity/lib/queries";
import { getCanonicalUrl } from "../lib/site";

// Real, generated URLs only — every dynamic segment below is pulled from
// the exact same Sanity queries the pages themselves use (never a
// hand-maintained list that can drift from what's actually published).
// /studio and /resume/download are deliberately excluded — see robots.ts.
export const revalidate = 3600;

const staticPaths = [
  "/",
  "/ai-lab",
  "/ai-lab/work",
  "/ai-lab/engineering",
  "/ai-lab/tools",
  "/ai-lab/experiments",
  "/ai-lab/prompts",
  "/ai-lab/automations",
  "/blog",
  "/contact",
  "/cover-letter",
  "/experience",
  "/privacy",
  "/resume",
  "/testimonials",
  "/training",
  "/videos",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, toolSlugs, promptSlugs, experimentSlugs, automationSlugs, blogSlugs, trainingSlugs] =
    await Promise.all([
      client.fetch<string[]>(projectSlugsQuery),
      client.fetch<string[]>(toolSlugsQuery),
      client.fetch<string[]>(promptSlugsQuery),
      client.fetch<string[]>(experimentSlugsQuery),
      client.fetch<string[]>(automationSlugsQuery),
      client.fetch<string[]>(blogSlugsQuery),
      client.fetch<string[]>(trainingSlugsQuery),
    ]);

  const dynamicPaths = [
    ...projectSlugs.map((s) => `/ai-lab/work/${s}`),
    ...toolSlugs.map((s) => `/ai-lab/tools/${s}`),
    ...promptSlugs.map((s) => `/ai-lab/prompts/${s}`),
    ...experimentSlugs.map((s) => `/ai-lab/experiments/${s}`),
    ...automationSlugs.map((s) => `/ai-lab/automations/${s}`),
    ...blogSlugs.map((s) => `/blog/${s}`),
    ...trainingSlugs.map((s) => `/training/${s}`),
  ];

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: getCanonicalUrl(path),
    lastModified: new Date(),
  }));
}
