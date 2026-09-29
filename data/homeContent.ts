// Homepage content per PRD §14-19. Kept separate from the legacy data/
// files (personalInfo, resume data, etc.) which still feed the Resume and
// Cover Letter pages unchanged. This becomes a Sanity-driven content type
// in Phase 2 — shaped with that migration in mind.

// Positioning per Docs/v2.0-data-driven-updates/PROMPTATWORK_WEBSITE_DATA_MASTER_CONTEXT.md
// §44/§56: "Full-Stack AI Engineer" as primary identity, "already
// practicing" framing rather than a career-transition narrative. The
// homepage previously led with a set of global numeric claims (500+
// Production Prompts, 99.9% Structured Output Accuracy, etc.) that the
// master doc's own §7/§51 rules flag as unsupported at the global level —
// removed per that governance rule; the real, contextualized numbers stay
// inside the specific project case studies they came from.
export const hero = {
  eyebrow: "FULL-STACK AI ENGINEER",
  // Rotates inside the hero pill, first entry is what the server renders.
  roles: ["PROMPT ENGINEER", "TRAINER", "BUILDER"],
  heading: "I build practical Generative AI, RAG and AI-powered applications — end to end.",
  description:
    "A software engineering foundation combined with hands-on Generative AI practice: prompt engineering, RAG, multi-LLM systems, AI-assisted development and automation — designed, built and shipped as real, working products, not just experiments.",
  ctaPrimary: "Explore My Work",
  ctaSecondary: "View Resume",
  ctaTertiary: "Let's Talk",
};

// "How I work" — shown on the AI Lab Overview page (src/app/ai-lab/page.tsx).
export const process = [
  { step: "01", title: "Explore", description: "Discover new AI tools, models and techniques worth testing." },
  { step: "02", title: "Build", description: "Design and build a practical solution — prompt, code or automation." },
  { step: "03", title: "Experiment", description: "Test rigorously, measure results and iterate on what works." },
  { step: "04", title: "Document", description: "Capture the process, learnings and architecture clearly." },
  { step: "05", title: "Share", description: "Publish as articles, LinkedIn posts or videos for the community." },
  { step: "06", title: "Teach", description: "Turn proven practice into training, workshops and courses." },
];

