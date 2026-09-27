/**
 * Adds one new Tool document — "Claude Code" — as a Tool Research &
 * Learning Repository entry (PRD 04.1), separate from the existing
 * "Anthropic Claude" LLM-provider entry (04.1 §5.1 explicitly lists
 * "Claude" and "Claude Code" as distinct example tools). This is purely
 * additive: it does not modify any of the 4 already-seeded tool
 * documents, so it's a safe way to exercise every new field (overview,
 * researchContent, practicalScenarios, sources, resources, relatedVideos)
 * with real content rather than leaving them all empty and unverified.
 *
 * The research content itself is accurate, verifiable product information
 * about a real, publicly documented tool — not a personal claim being
 * fabricated on anyone's behalf. myExperience is grounded in an
 * already-true, already-documented fact: this website was built using
 * Claude Code, through the PRD-first workflow described in the seeded
 * blog post and the AI-Assisted Full-Stack Application project.
 *
 * The bundled resource ("Quick Reference") is real authored content
 * (scripts/assets/claude-code-quick-reference.md), uploaded as a genuine
 * Sanity file asset — not a placeholder link.
 *
 * Run with: npx tsx scripts/seed-tool-claude-code.ts
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { readFileSync } from "node:fs";
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

async function main() {
  const fileBuffer = readFileSync(new URL("./assets/claude-code-quick-reference.md", import.meta.url));
  const asset = await client.assets.upload("file", fileBuffer, {
    filename: "claude-code-quick-reference.md",
    contentType: "text/markdown",
  });
  console.log("  ✓ uploaded quick-reference file asset");

  await client.createOrReplace({
    _id: "tool-claude-code",
    _type: "tool",
    slug: { _type: "slug", current: "claude-code" },
    name: "Claude Code",
    type: "Tool",
    category: "AI Coding Tool",
    tags: ["AI Coding", "Agentic Development", "MCP", "CLI"],
    description: "Anthropic's agentic coding tool — runs in the terminal, an IDE, or the SDK, and can plan, edit, run commands and iterate across a whole codebase.",
    officialUrl: "https://claude.com/claude-code",
    pricing: "Included with Claude Pro/Max subscriptions, or pay-as-you-go via the Claude API.",
    overview:
      "Claude Code is Anthropic's agentic coding tool: instead of autocompleting one line at a time, it reads a codebase, plans a multi-step change, edits files, runs shell commands and tests, and iterates on the result — all from a natural-language instruction. It's built for developers who want an AI collaborator that can carry a task from description to a working, verified change, not just suggest snippets.",
    whatItDoes:
      "An agentic CLI/IDE/SDK tool that plans and executes multi-step coding tasks: reading and editing files, running shell commands, searching the web, and calling external tools via MCP (Model Context Protocol) servers — all inside an approval-gated loop the developer controls.",
    researchContent:
      "Core capabilities: file read/write/edit, shell command execution, web search and fetch, and subagent delegation for isolating large or parallel tasks. " +
      "Skills are packaged, reusable instruction sets Claude Code loads on demand for a specific kind of task (this very feature — the AI Lab Tools rebuild — was implemented by loading this project's own established conventions as context, the same mechanism). " +
      "MCP (Model Context Protocol) lets Claude Code connect to external tools and data sources — databases, design tools, project trackers — through a standard interface, so the same agent can act across a real toolchain rather than just the local filesystem. " +
      "Hooks let a user run their own shell commands at defined points in Claude Code's lifecycle (e.g. before a tool call, after a session ends) for custom validation or automation. " +
      "Slash commands provide reusable, parameterized prompts saved as project or personal files. " +
      "Permission modes range from asking approval for every action to fully autonomous execution within defined bounds — the developer chooses the tradeoff between speed and oversight per session.",
    useCases: [
      "Large-repository exploration and refactoring across many files at once",
      "Turning a written spec/PRD into working, tested code end-to-end",
      "Automating repetitive multi-step coding tasks (migrations, boilerplate, test generation)",
      "Debugging by reproducing an issue, reading logs, and iterating on a fix in one loop",
      "AI-assisted documentation kept in sync with the actual codebase",
    ],
    practicalScenarios:
      "A general scenario Claude Code is well-suited to: given a legacy repository with no up-to-date documentation, ask it to explore the codebase, summarize the architecture, and flag any inconsistencies between what the code does and what any existing docs claim. This is a capability described generally here — see Related Experiments below for cases where it was actually used, not just described.",
    strengths: [
      "Handles multi-file, multi-step tasks without needing every step spelled out",
      "Runs real commands and tests, so it can verify its own changes rather than just proposing them",
      "MCP support means it can act across an existing toolchain instead of being limited to the local filesystem",
      "Permission model lets the developer dial oversight up or down per task",
    ],
    limitations: [
      "Autonomous execution still benefits from a human reviewing diffs before they're trusted, especially on unfamiliar codebases",
      "Effectiveness on a very large, poorly-documented codebase depends heavily on how well the task is scoped up front",
      "Requires a Claude subscription or API access — no fully offline/free tier",
      "Best results come from an iterative, PRD-first workflow rather than a single vague instruction for a large task",
    ],
    myExperience:
      "This website — promptatwork.com, including this very Tools & Research rebuild — was built using Claude Code, through a PRD-first workflow: each phase was written up as its own plan before implementation started, and every feature was verified in a real browser (or against the real Supabase/Sanity backends) before being called done, rather than just trusting that the code compiled.",
    researchStatus: "Published",
    lastUpdated: new Date().toISOString(),
    reviewedVersion: "Claude 5 family",
    lastReviewed: "September 2026",
    sources: [
      { label: "Official Website", url: "https://claude.com/claude-code" },
      { label: "Anthropic Documentation", url: "https://docs.claude.com" },
    ],
    resources: [
      {
        _key: "resource-quick-reference",
        title: "Claude Code — Quick Reference",
        resourceType: "Reference Guide",
        description: "A one-page summary of core concepts: skills, MCP, hooks, subagents and permission modes.",
        file: { _type: "file", asset: { _type: "reference", _ref: asset._id } },
        version: "1.0",
        publishedAt: new Date().toISOString(),
      },
    ],
    relatedContent: [ref("project-ai-assisted-full-stack-application"), ref("blog-building-promptatwork")],
    publishedAt: new Date().toISOString(),
  });

  console.log("  ✓ Claude Code tool document created");
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
