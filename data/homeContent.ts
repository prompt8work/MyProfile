// Homepage content per PRD §14-19. Kept separate from the legacy data/
// files (personalInfo, resume data, etc.) which still feed the Resume and
// Cover Letter pages unchanged. This becomes a Sanity-driven content type
// in Phase 2 — shaped with that migration in mind.

export const hero = {
  eyebrow: "AI SOLUTION ENGINEER · PROMPT ENGINEER",
  heading: "I build practical AI solutions through prompts, code, automation and experimentation.",
  description:
    "I explore, design and build AI-powered systems across prompt engineering, RAG, AI-assisted development, automation and emerging AI tools.",
  ctaPrimary: "Explore My Work",
  ctaSecondary: "View Resume",
  ctaTertiary: "Let's Talk",
};

export const metrics = [
  { value: "500+", label: "Production Prompts" },
  { value: "18", label: "Generation Modules" },
  { value: "99.9%", label: "Structured Output Accuracy" },
  { value: "80%", label: "LLM Cost Reduction" },
  { value: "100+", label: "Concurrent Users" },
  { value: "89%", label: "Retrieval Relevance" },
];

export const expertise = [
  {
    title: "Prompt Engineering",
    items: ["Prompt systems", "Structured outputs", "Evaluation & regression testing", "Guardrails"],
  },
  {
    title: "AI Solution Engineering",
    items: ["AI architecture", "APIs & LLM integration", "Production systems"],
  },
  {
    title: "RAG",
    items: ["Embeddings & vector search", "Hybrid retrieval, RRF", "Retrieval evaluation"],
  },
  {
    title: "AI Automation",
    items: ["AI workflows & APIs", "Agents", "Process automation"],
  },
  {
    title: "AI-Assisted Development",
    items: ["BMAD workflow, Claude Code", "AI coding & testing", "AI documentation"],
  },
  {
    title: "AI Tool Exploration",
    items: ["Tool research & comparison", "Hands-on experiments", "Practical tutorials"],
  },
];

// Project data moved to data/projects.ts (the canonical, PRD-shaped source
// for both this homepage preview and the /projects pages). Import from
// there directly — e.g. `import { publicProjects } from "../../../data/projects"`.

export const aiLabLinks = [
  { title: "Tools", href: "/ai-lab" },
  { title: "Experiments", href: "/ai-lab" },
  { title: "Prompt Library", href: "/ai-lab" },
  { title: "Automations", href: "/ai-lab" },
];

export const process = [
  { step: "01", title: "Explore", description: "Discover new AI tools, models and techniques worth testing." },
  { step: "02", title: "Build", description: "Design and build a practical solution — prompt, code or automation." },
  { step: "03", title: "Experiment", description: "Test rigorously, measure results and iterate on what works." },
  { step: "04", title: "Document", description: "Capture the process, learnings and architecture clearly." },
  { step: "05", title: "Share", description: "Publish as articles, LinkedIn posts or videos for the community." },
  { step: "06", title: "Teach", description: "Turn proven practice into training, workshops and courses." },
];

export const contentPreview = [
  { type: "BLOG", title: "[ Article title to be published ]", note: "Excerpt preview will appear here once the first post goes live." },
  { type: "LINKEDIN", title: "[ LinkedIn post to be imported ]", note: "Manually imported or synced posts will surface here." },
  { type: "YOUTUBE", title: "[ Video title synced from channel ]", note: "Thumbnail, title and description sync automatically via the YouTube API." },
];

export const trainingBatch = {
  status: "OPEN FOR REGISTRATION",
  seats: "20 seats",
  title: "Prompt Engineering — Weekend Batch",
  schedule: "Sat + Sun, 11 AM–1 PM",
  duration: "8 Weeks",
  mode: "Online",
  timezone: "IST",
};
