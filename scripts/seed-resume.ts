/**
 * Replaces the Resume singleton (resume-singleton) with the content of the
 * current hand-made resume PDF, in the expanded schema that now drives both
 * the /resume page and the generated PDF download (/resume/download).
 *
 * This is a one-time migration — after it runs, Sanity Studio is the place
 * to edit the resume. Re-running it overwrites any Studio edits.
 *
 * The previous document's achievements/interests/experience-references are
 * dropped (no longer part of the schema). The Experience documents
 * themselves are untouched; they still feed the /experience page.
 *
 * Run with: npx tsx scripts/seed-resume.ts
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

// Array-of-object items need a stable _key for Studio editing.
const keyed = <T extends object>(prefix: string, items: T[]) => items.map((item, i) => ({ _key: `${prefix}${i}`, ...item }));

const resume = {
  _id: "resume-singleton",
  _type: "resume",

  name: "Niharika Dhande",
  title: "Full-Stack AI Engineer",
  email: "niharikadhande1@gmail.com",
  phone: "+91 95842 54666",
  location: "Indore, Madhya Pradesh, India",
  linkedin: "linkedin.com/in/niharikasaxenadhande",

  summary: [
    "Generative AI Engineer with 8+ years of full-stack software engineering experience and 2+ years building and deploying production-grade GenAI systems. Skilled in scoping complex problems, designing scalable architectures, and delivering end-to-end AI solutions.",
    "Experienced in architecting multi-LLM orchestration platforms using OpenAI, Anthropic, Gemini, and Groq, with cost-aware routing, failover mechanisms, and performance optimisation. Designed and implemented evaluation and regression-testing frameworks that gate every production release.",
    "Proficient in Python, FastAPI, C#/.NET, generative AI, prompt engineering, and multi-model orchestration. Experienced in developing AI solutions within no-code and low-code environments, while leveraging modern tools and emerging engineering practices to improve developer productivity and delivery speed.",
  ],

  skills: keyed("skill", [
    {
      category: "LLM Systems",
      items: ["Multi-LLM routing & failover", "cost-aware model selection", "function/tool calling", "LangChain", "OpenAI GPT-4", "Claude 3.5", "Gemini", "Groq (Llama 3.3, Qwen 3.2)"],
    },
    {
      category: "Prompt Engineering",
      items: ["Chain-of-Thought", "few-shot", "ReAct", "role/persona", "structured outputs (JSON, Pydantic)", "guardrails", "500+ production prompts"],
    },
    {
      category: "RAG & Retrieval",
      items: ["FAISS", "Sentence Transformer embeddings", "hybrid FAISS + BM25 with Reciprocal Rank Fusion", "Redis caching"],
    },
    {
      category: "Evaluation & Quality",
      items: ["Prompt-evaluation harnesses", "regression suites", "canary rollout", "schema validation", "latency and cost budgets"],
    },
    {
      category: "Engineering",
      items: ["Python (FastAPI, Pydantic, Asyncio)", "C# / .NET / ASP.NET Core", "SQL Server", "REST", "microservices", "OAuth 2.0", "Angular", "React", "TypeScript"],
    },
    {
      category: "Cloud & Delivery",
      items: ["Azure AI Services", "Azure AI Search", "Docker", "CI/CD (Azure DevOps)", "Git", "multi-agent delivery workflows (BMAD)"],
    },
  ]),

  roles: keyed("role", [
    {
      role: "Generative AI & Prompt Engineer",
      company: "Gate6 Technologies Pvt. Ltd.",
      location: "Indore",
      startDate: "2024-02-01",
      highlights: [
        "Own generative AI development end to end — translating product goals into production systems serving real users at sub-3s p95 latency and 99%+ uptime.",
        "Authored and maintain 500+ production prompts across 18 content and document-generation modules, engineered for schema-valid, format-consistent structured output at 99.9% accuracy.",
        "Built a prompt-evaluation and regression harness that canary-rolls changes to a traffic slice before full release, protecting quality as prompts evolve.",
        "Architected multi-LLM routing and failover across OpenAI, Anthropic, Gemini and Groq with cost-aware model selection — 99%+ availability and graceful degradation through provider outages.",
        "Engineered a 4-stage pipeline with 5:1 token compression and TTL caching, cutting LLM spend ~80% while holding 99.9% structured-output accuracy.",
        "Documented prompt systems for cross-team reuse while switching fluidly across .NET/C#, Python (FastAPI) and Angular on Azure AI Services and Azure AI Search.",
      ],
    },
    { role: "Lead Software Engineer", company: "Cyber Infrastructure Pvt. Ltd.", location: "Indore", startDate: "2017-12-01", endDate: "2018-07-01", highlights: [] },
    { role: "Lead Software Engineer", company: "Galaxy Weblinks Pvt. Ltd.", location: "Indore", startDate: "2017-04-01", endDate: "2017-11-01", highlights: [] },
    { role: "Software Engineer", company: "Infobeans Technologies Pvt. Ltd.", location: "Indore", startDate: "2015-08-01", endDate: "2016-11-01", highlights: [] },
    { role: "Software Engineer", company: "Gate6 Technologies Pvt. Ltd.", location: "Indore", startDate: "2015-01-01", endDate: "2015-08-01", highlights: [] },
    { role: "Software Engineer", company: "Om Software Technologies Pvt. Ltd.", location: "Bhopal", startDate: "2013-07-01", endDate: "2014-10-01", highlights: [] },
    { role: "Dot Net Trainer", company: "NIIT Ltd", location: "Bhopal", startDate: "2010-07-01", endDate: "2014-03-01", highlights: [] },
  ]),
  earlierRolesHeading: "Earlier — .NET Engineering",

  projects: keyed("project", [
    {
      name: "RAG Applications",
      badge: "RAG",
      tech: ["Python", "FastAPI", "FAISS", "OpenAI / Anthropic / Gemini / Groq"],
      points: [
        "Production RAG service turning meeting transcripts into executive summaries and user stories — 100+ concurrent users, p95 < 3s, ~1.2GB footprint.",
        "Hybrid retrieval (FAISS + BM25 fused with Reciprocal Rank Fusion) lifted relevance from 45% to 89%; a regression suite gates every release.",
        "Cost-aware multi-LLM router with automatic failover picks the cheapest model meeting the quality bar per request at 99%+ uptime.",
      ],
      description: [],
    },
    {
      name: "AI Workflow Automation and Scheduling Tools (100+)",
      badge: "Automation",
      tech: ["Zapier", "n8n", "Workato", "Claude"],
      points: [
        "500+ production prompts across 18 SDLC modules (requirements, QA, dev) generating structured documents and test cases at 99.9% schema validity.",
        "Delivered across Python services, C# integrations and Angular UI on Azure — backend, AI layer and frontend inside one product surface.",
        "Cut per-document LLM spend sharply via prompt compression, response caching, request batching and cross-provider model selection.",
      ],
      description: [],
    },
    {
      name: "Voice AI Agent - Nextiva",
      badge: "Voice AI",
      tech: ["TypeScript", "Node.js", "React.js", "Groq", "Claude", "Big Data", "Vapi", "Twilio"],
      points: [
        "Shipped a complete application through AI-assisted delivery — discovery, PRD, architecture, UX, sprint planning, implementation and QA, with human validation at each gate.",
        "Multi-agent orchestration across Analyst, Architect, PM, UX, Developer and QA roles — agentic GenAI workflows applied to real product delivery.",
      ],
      description: [],
    },
    {
      name: "AI-Powered E-commerce, Campaign & Retreat Planning Platform",
      badge: "Platform",
      techLabel: "Key technologies",
      tech: [
        "AI agent orchestration",
        "Prompt engineering",
        "Prompt libraries",
        "OpenAI/ChatGPT",
        "Anthropic",
        "Google Gemini",
        "Grok",
        "AI image generation",
        "Multi-model failover",
        "Content automation",
        "Campaign generation",
        "E-commerce customization",
      ],
      points: [],
      description: [
        "Designed and developed an AI-powered centralized platform for a fashion, e-commerce, travel, and event organization business to streamline retreat/trip planning, campaign generation, product customization, marketing collateral, and customer engagement. The solution used AI agent orchestration and reusable prompt libraries to automate the creation of travel itineraries, market research, sales and marketing content, event campaigns, brochures, trip guides, and customized merchandise such as T-shirts, hoodies, caps, and promotional goodies.",
        "Integrated multiple AI models including Anthropic, OpenAI/ChatGPT, Google Gemini, and Grok, with automated fallback/failover mechanisms to maintain service continuity when a model was unavailable or reached usage limits. Implemented AI-powered image generation for branded merchandise and campaign creatives, along with a prompt development and management environment enabling teams to create, test, store, reuse, and standardize prompts across business workflows.",
      ],
    },
  ]),

  certifications: keyed("cert", [{ name: "Certified ScrumMaster (CSM)", issuer: "Scrum Alliance", credentialId: "1894098-csm" }]),
  education: keyed("edu", [
    { degree: "GNIIT Diploma, Software Engineering", institution: "NIIT Education Center", year: "2012" },
    { degree: "B.Sc. Biotechnology", institution: "Barkatullah University, Bhopal", year: "2010" },
  ]),
  teaching: keyed("teach", [
    {
      title: "Instructor — Prompt Engineering",
      description: "Delivers structured, production-grade prompt design training to college and corporate cohorts.",
    },
  ]),

  heroStats: keyed("stat", [
    { value: "8+", label: "Years engineering" },
    { value: "500+", label: "Production prompts" },
    { value: "99.9%", label: "Schema-valid output" },
  ]),
  numbers: keyed("num", [
    { value: "~80%", label: "LLM spend cut" },
    { value: "45→89%", label: "Retrieval relevance" },
    { value: "<3s", label: "p95 latency" },
    { value: "99%+", label: "Uptime" },
  ]),

  updatedAt: new Date().toISOString(),
};

async function main() {
  const res = await client.createOrReplace(resume);
  console.log(`Replaced ${res._id} (rev ${res._rev})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
