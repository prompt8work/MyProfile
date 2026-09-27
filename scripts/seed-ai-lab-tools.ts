/**
 * Seeds a first set of AI Tool entries. Unlike migrate-to-sanity.ts, this
 * isn't reading from an existing static file — there was no prior "tools"
 * data anywhere in the codebase. Factual fields (name, category, official
 * URL) are just facts. The `myExperience` field for each tool is grounded
 * in what the migrated project data (data/projects.ts) already documents
 * about using that tool — not invented commentary. `strengths`/
 * `limitations` are left empty: that's a genuine first-person opinion this
 * script has no basis to write, so it's left for the real write-up rather
 * than filled with plausible-sounding placeholder text.
 *
 * Run with: npx tsx scripts/seed-ai-lab-tools.ts
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

const tools = [
  {
    slug: "openai",
    name: "OpenAI",
    category: "LLM Provider",
    description: "GPT-family models and APIs — used here for chatbot synthesis and structured-output generation.",
    officialUrl: "https://openai.com",
    pricing: "Usage-based API pricing; ChatGPT has a free tier and paid Plus/Pro plans.",
    whatItDoes: "Hosted large language models accessible via API, plus the ChatGPT consumer product.",
    myExperience:
      "Used as one of the LLM backends in the AI Workflow Automation Platform's chatbot, where it contributed to a reported 10x productivity improvement on affected workflows, and as an alternate synthesis backend in the RAG-based meeting intelligence platform alongside Anthropic, Gemini and Groq.",
  },
  {
    slug: "anthropic-claude",
    name: "Anthropic Claude",
    category: "LLM Provider",
    description: "Claude models via API, and Claude Code for AI-assisted development.",
    officialUrl: "https://www.anthropic.com",
    pricing: "Usage-based API pricing; Claude.ai has free and paid tiers.",
    whatItDoes: "Hosted large language models via API, and an agentic coding tool (Claude Code) for AI-assisted development workflows.",
    myExperience:
      "One of the multi-LLM synthesis backends in the RAG-based meeting intelligence platform. Claude Code specifically was the primary tool behind the AI-Assisted Full-Stack Application project, run through a full BMAD workflow (discovery → PRD → architecture → UX → development → QA) — and this website's own build followed the same PRD-first, AI-assisted approach.",
  },
  {
    slug: "google-gemini",
    name: "Google Gemini",
    category: "LLM Provider",
    description: "Google's multimodal LLM family, via API.",
    officialUrl: "https://ai.google.dev",
    pricing: "Usage-based API pricing with a free tier for lower-volume use.",
    whatItDoes: "Hosted large language models via API, with strong multimodal (text/image) support.",
    myExperience:
      "Used alongside OpenAI in the AI Workflow Automation Platform's chatbot (part of the reported 10x productivity improvement), and as an alternate synthesis backend in the RAG-based meeting intelligence platform.",
  },
  {
    slug: "groq",
    name: "Groq",
    category: "Inference Platform",
    description: "LPU-based inference hosting, run here as the low-latency default for RAG synthesis.",
    officialUrl: "https://groq.com",
    pricing: "Usage-based API pricing with a free tier.",
    whatItDoes: "Extremely fast LLM inference hosting, used to serve open models with very low latency.",
    myExperience:
      "The primary synthesis backend for the RAG-based meeting intelligence platform, chosen specifically to hit sub-second response times at 100+ concurrent users (p95 under 3 seconds end-to-end, including retrieval).",
  },
];

async function main() {
  for (const t of tools) {
    await client.createOrReplace({
      _id: `tool-${t.slug}`,
      _type: "tool",
      slug: { _type: "slug", current: t.slug },
      name: t.name,
      category: t.category,
      description: t.description,
      officialUrl: t.officialUrl,
      pricing: t.pricing,
      whatItDoes: t.whatItDoes,
      myExperience: t.myExperience,
      publishedAt: new Date().toISOString(),
    });
    console.log(`  ✓ ${t.name}`);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
