// Canonical project data — the single source both the homepage "Selected
// Work" preview and the full /projects listing + /projects/[slug] detail
// pages read from. Shaped to match the PRD's future Sanity `Project` schema
// (PRD §64) and detail-page structure (PRD §20), so Phase 2's CMS migration
// swaps the data source without changing the page templates.
//
// Detail content below is grounded in what the PRD (§18) and the resume
// data actually say. Anything more specific than that (exact dates, named
// clients, anecdote-level detail) isn't invented — it's left as a
// bracketed placeholder for the real case-study write-up.

export type ProjectVisibility = "public" | "generalized" | "private";

export type Project = {
  slug: string;
  title: string;
  category: string;
  visibility: ProjectVisibility;
  confidentialityNote?: string;
  summary: string;
  stats?: string[];
  tech: string[];
  aiModels?: string[];
  overview: string;
  problem: string;
  context: string;
  solution: string;
  role: string;
  architecture: string;
  workflow: string;
  challenges: string;
  results: string;
  learnings: string;
};

export const projects: Project[] = [
  {
    slug: "ai-workflow-automation-platform",
    title: "AI Workflow Automation Platform",
    category: "Full Stack · Automation",
    visibility: "generalized",
    confidentialityNote:
      "Client and proprietary implementation details are omitted per the confidentiality model (PRD §22) — this is a generalized case study.",
    summary: "Multi-LLM orchestration engine that automates enterprise task workflows end-to-end.",
    tech: ["C#", "Angular", "OpenAI", "Gemini", "FastAPI"],
    aiModels: ["OpenAI", "Gemini"],
    overview:
      "A workflow automation platform that routes tasks through multiple LLM providers, turning prospect requirements into working prototypes and production-ready solutions.",
    problem:
      "Converting prospect requirements and technical presentations into working software prototypes fast enough to keep pace with a live sales/demo cycle.",
    context:
      "Built while working across Web, AI/ML and Cloud service demonstrations, supporting outreach campaigns that needed a working proof of concept within a matter of days, not weeks.",
    solution:
      "An AI chatbot and workflow layer built on OpenAI and Gemini APIs, backed by a C#/Angular application shell, that turns structured input into a working prototype quickly enough to demo live.",
    role: "Sole technical analyst and solutions engineer — architecture, prompt design, and the full-stack implementation.",
    architecture:
      "C#/.NET backend, Angular front end, FastAPI service layer for AI orchestration, with OpenAI and Gemini as interchangeable LLM providers behind a common interface.",
    workflow: "[ Detailed step-by-step workflow diagram to be added ]",
    challenges:
      "[ Specific technical obstacles and how they were resolved — to be added for the full case study ]",
    results: "Contributed to 500+ production-ready solutions and prompts built for prospect presentations, with reported 10x productivity improvements on affected workflows.",
    learnings: "[ Key takeaways from building and shipping this — to be added ]",
  },
  {
    slug: "rag-meeting-intelligence-platform",
    title: "RAG-Based Meeting Intelligence Platform",
    category: "RAG · Web App",
    visibility: "generalized",
    confidentialityNote:
      "Client and proprietary implementation details are omitted per the confidentiality model (PRD §22) — this is a generalized case study.",
    summary: "Hybrid retrieval over meeting transcripts with multi-LLM synthesis for searchable, grounded answers.",
    stats: ["100+ concurrent users", "p95 <3s", "45%→89% retrieval relevance"],
    tech: ["Python", "FastAPI", "FAISS", "Sentence Transformers", "Groq", "OpenAI", "Anthropic", "Gemini", "Google Drive API"],
    aiModels: ["Groq", "OpenAI", "Anthropic", "Gemini"],
    overview:
      "A RAG-based intelligent chatbot over meeting transcripts, built on Python/FastAPI with Groq for sub-second response times.",
    problem:
      "Meeting content piles up faster than anyone can search it manually — the platform needed to answer questions grounded in real transcript content, not a generic LLM guess.",
    context:
      "Meeting transcripts synced via the Google Drive API, indexed and made queryable through a hybrid retrieval pipeline.",
    solution:
      "A retrieval-augmented generation pipeline: FAISS vector search plus Sentence Transformer embeddings for hybrid retrieval, synthesized through Groq for sub-second response times, with OpenAI/Anthropic/Gemini available as alternate synthesis backends.",
    role: "Designed and built the RAG pipeline end-to-end — retrieval, embedding strategy, and the multi-LLM synthesis layer.",
    architecture:
      "Google Drive API → transcript ingestion → Sentence Transformer embeddings → FAISS hybrid retrieval → Groq/OpenAI/Anthropic/Gemini synthesis → chat interface.",
    workflow: "[ Detailed step-by-step workflow diagram to be added ]",
    challenges: "Retrieval relevance was the core challenge — see Results for the measured improvement from hybrid retrieval tuning.",
    results:
      "Supports 100+ concurrent users with p95 response times under 3 seconds; retrieval relevance improved from 45% to 89% through hybrid retrieval tuning.",
    learnings: "[ Key takeaways from building and shipping this — to be added ]",
  },
  {
    slug: "ai-assisted-full-stack-application",
    title: "AI-Assisted Full-Stack Application",
    category: "AI-Assisted Dev",
    visibility: "public",
    summary:
      "Built end-to-end through a BMAD workflow — discovery, PRD, architecture, UX, development and QA driven by AI-assisted tooling.",
    tech: ["BMAD", "Claude Code", "React", "TypeScript"],
    overview:
      "A full-stack application built using the BMAD (discovery → PRD → architecture → UX → development → QA) method with Claude Code as the primary AI-assisted development tool.",
    problem: "Demonstrating that AI-assisted development can carry a project through every phase — not just code generation — while keeping a clear paper trail of decisions.",
    context:
      "An independent build used to prove out the BMAD workflow itself: every phase from initial discovery through PRD, architecture, UX and QA handled with AI assistance, documented as it happened.",
    solution:
      "A structured, phase-by-phase build: each stage (discovery, PRD, architecture, UX, development, QA) produced its own artifact before the next phase started, with Claude Code doing the implementation work against those artifacts.",
    role: "Drove the entire BMAD workflow solo — product definition through shipped code.",
    architecture: "React + TypeScript front end; architecture and phase artifacts documented alongside the code itself.",
    workflow:
      "Discovery → PRD → Architecture → UX → Development → QA, each phase gated on the previous phase's written artifact rather than skipped ahead.",
    challenges: "[ Specific challenges from running a fully AI-assisted workflow — to be added ]",
    results: "[ Concrete outcomes and metrics from this build — to be added ]",
    learnings:
      "This project — and this website's own build, PRD-first with Claude Code — is itself a live example of the workflow described here.",
  },
  {
    slug: "ai-generated-marketing-visuals",
    title: "AI-Generated Marketing Visuals",
    category: "AI Creative",
    visibility: "public",
    summary: "Independent exploration of image and video generation tools for campaign-ready creative.",
    tech: ["Midjourney", "DALL·E", "Runway", "Sora", "Pika", "Stable Diffusion", "Adobe Firefly"],
    overview: "Independent experimentation across the current generation of AI image and video tools, evaluated for campaign-ready creative output.",
    problem: "Understanding which generative visual tools are actually production-ready for marketing use, versus which are still novelty-grade.",
    context: "Self-directed exploration, not a client engagement — testing each tool's strengths, limitations and practical use cases directly.",
    solution:
      "Hands-on experiments across Midjourney, DALL·E, Runway, Sora, Pika, Stable Diffusion and Adobe Firefly, comparing output quality, control and iteration speed for marketing-style visuals.",
    role: "Independent researcher and practitioner — ran every experiment personally.",
    architecture: "N/A — tool evaluation and prompt experimentation, not a software architecture.",
    workflow: "Prompt → generate → evaluate against campaign-brief-style criteria → iterate.",
    challenges: "[ Specific tool limitations encountered — to be added ]",
    results: "[ Example outputs and campaign-readiness verdicts — to be added ]",
    learnings: "[ Which tools proved production-ready and which didn't — to be added ]",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.visibility !== "private" && p.slug === slug);
}

export const publicProjects = projects.filter((p) => p.visibility !== "private");
