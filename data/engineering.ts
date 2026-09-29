// AI Lab → Engineering (src/app/ai-lab/engineering/page.tsx). Master
// content doc §13 structure. Every section links to the real project/tool
// evidence that supports it (§32 internal-linking model) — no capability
// listed here without something concrete behind it. Also feeds the AI Lab
// sidebar's Engineering group (src/app/ai-lab/layout.tsx).

export type EngineeringSection = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
  link: { href: string; label: string };
};

export const engineeringSections: EngineeringSection[] = [
  {
    id: "full-stack-ai",
    eyebrow: "01 — FULL-STACK AI ENGINEERING",
    title: "Full-Stack AI Engineering",
    description:
      "AI-enabled web applications built end to end — frontend, backend, API design, model integration, and the product engineering to ship it, not just a notebook that works once.",
    items: [
      "AI-enabled web applications",
      "Frontend + backend integration",
      "API design",
      "Model integration",
      "AI-assisted coding",
    ],
    link: { href: "/ai-lab/work/ai-workflow-automation-platform", label: "AI Workflow Automation Platform" },
  },
  {
    id: "generative-ai",
    eyebrow: "02 — GENERATIVE AI ENGINEERING",
    title: "Generative AI Engineering",
    description:
      "LLM applications built on structured outputs and multi-model orchestration — routing work across OpenAI, Gemini, Groq and Claude behind a common interface, not locked to a single provider.",
    items: [
      "LLM applications",
      "Prompt engineering",
      "Structured outputs",
      "Multi-model systems",
      "Tool/function calling",
    ],
    link: { href: "/ai-lab/prompts", label: "Prompt Library" },
  },
  {
    id: "rag",
    eyebrow: "03 — RAG & KNOWLEDGE SYSTEMS",
    title: "RAG & Knowledge Systems",
    description:
      "Grounded retrieval pipelines — document ingestion, embeddings, hybrid search, and answer synthesis that cites real source content instead of guessing.",
    items: [
      "Document ingestion",
      "Embeddings",
      "Vector search",
      "Hybrid retrieval (keyword + semantic)",
      "Grounded answer generation",
    ],
    link: { href: "/ai-lab/work/rag-meeting-intelligence-platform", label: "RAG-Based Meeting Intelligence Platform" },
  },
  {
    id: "agentic-ai",
    eyebrow: "04 — AGENTIC AI",
    title: "Agentic AI",
    description:
      "Multi-LLM task routing and workflow orchestration are already part of shipped work; deeper agent patterns — state, memory, human-in-the-loop — are active, ongoing development, not a finished capability.",
    items: ["Task/workflow orchestration", "Multi-LLM routing", "Tool use"],
    link: { href: "/ai-lab/work/ai-workflow-automation-platform", label: "AI Workflow Automation Platform" },
  },
  {
    id: "ai-assisted-development",
    eyebrow: "05 — AI-ASSISTED SOFTWARE DEVELOPMENT",
    title: "AI-Assisted Software Development",
    description:
      "Structured, PRD-first development with AI coding tools — this website itself, and a separate full-stack application, were both built this way end to end.",
    items: ["BMAD workflow", "Claude Code", "PRD-first development", "AI-assisted architecture & testing"],
    link: { href: "/ai-lab/work/ai-assisted-full-stack-application", label: "AI-Assisted Full-Stack Application" },
  },
  {
    id: "ai-automation",
    eyebrow: "06 — AI AUTOMATION",
    title: "AI Automation",
    description:
      "Turning a manual, repeatable process into a triggered pipeline — input, AI processing, decision, output.",
    items: ["Workflow orchestration", "Triggers & integrations", "AI-driven decisions"],
    link: { href: "/ai-lab/automations", label: "Automations" },
  },
];
