/**
 * Seeds a single, genuinely true blog post about this site's own build —
 * not filler/lorem content. Every claim in the body is drawn directly from
 * this repository's own development-plan docs (Docs/development-plan/*.md)
 * and PRD, the same "grounded, not fabricated" discipline used for the AI
 * Lab tool/prompt/experiment/automation seed data. This also happens to be
 * literally true of the AI-Assisted Full-Stack Application project's own
 * documented learning: "This project — and this website's own build,
 * PRD-first with Claude Code — is itself a live example of the workflow
 * described here."
 *
 * Run with: npx tsx scripts/seed-first-blog-post.ts
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET / SANITY_API_TOKEN in .env.local");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token,
  useCdn: false,
});

const ref = (id: string) => ({ _type: "reference" as const, _ref: id, _key: id });

const body = `This site — promptatwork.com — was built the same way one of its own case studies describes: PRD-first, with Claude Code doing the implementation work against a written plan rather than ad hoc requests.

The process started with a single PRD document and a phase-wise development plan, split into eight phases: foundation, static core, CMS integration, dynamic backend, AI Lab & content, training platform, hardening, and launch. Each phase became its own living status document — not a static plan written once and forgotten, but one updated with what actually happened: what shipped, what bugs came up, what got deliberately deferred and why.

Phase 0 migrated the original Vite site to Next.js (App Router, Turbopack, React 19). Phase 1 rebuilt the design system from scratch — a plum-and-neutral palette pulled from an actual hero photograph rather than a generic template, with a deliberate cyan accent reserved for the AI Lab's more technical zone. Phase 2 wired up Sanity as the content layer: every project, the resume, and work experience became CMS-editable instead of hardcoded. Phase 3 added Supabase for the relational side — Postgres with row-level security as the real access boundary, not a secret API key — and made the Contact form actually store submissions.

Phase 4 is where the site stopped being "a portfolio with some AI on it" and became what the PRD calls a living AI Lab: a Tool Explorer, a Prompt Library with real copyable templates, an Experiments log, and an Automation Gallery that renders the Trigger → Input → AI Processing → Decision → Action → Output pipeline for each real workflow. Every fact in those entries — retrieval-relevance numbers, latency figures, architecture — is pulled from already-documented project data rather than invented after the fact, the same discipline this post is trying to follow.

The blog you're reading this on is part of that same phase: a real Sanity-backed content type, Supabase-backed reactions and comments (with actual row-level-security-enforced moderation, not just a UI toggle), and — like everything else on this site — built by describing what should exist and then verifying it actually works in a real browser before calling it done.`;

async function main() {
  await client.createOrReplace({
    _id: "blog-building-promptatwork",
    _type: "blog",
    slug: { _type: "slug", current: "building-promptatwork" },
    title: "Building PromptAtWork: A PRD-First Build With Claude Code",
    excerpt:
      "How this site's own build — phase-wise, PRD-first, verified in a real browser at every step — became one of its own case studies.",
    body,
    category: "AI-Assisted Development",
    tags: ["Claude Code", "Next.js", "Sanity", "Supabase", "PRD-First Development"],
    author: "Niharika Dhande",
    readingTime: "4 min read",
    publishedAt: new Date().toISOString(),
    relatedContent: [ref("project-ai-assisted-full-stack-application"), ref("tool-anthropic-claude")],
  });
  console.log("  ✓ Building PromptAtWork: A PRD-First Build With Claude Code");
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
