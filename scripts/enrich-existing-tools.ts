/**
 * Adds Phase 4.1 research fields (overview, researchContent, use cases,
 * practical scenarios, strengths, limitations, sources, review metadata)
 * to the 4 tools seeded in Phase 4's original AI Lab slice: OpenAI,
 * Anthropic Claude, Google Gemini, Groq.
 *
 * Uses `.patch(id).set({...}).commit()`, not createOrReplace — this only
 * touches the fields listed below and leaves every existing field
 * (name, slug, category, description, officialUrl, pricing, whatItDoes,
 * myExperience, publishedAt) completely untouched, so nothing already
 * working can regress.
 *
 * Content is accurate, publicly-verifiable product information about
 * real, widely-documented platforms — the same "grounded, not fabricated"
 * standard as the Claude Code entry and the rest of this project's seed
 * data. `myExperience` on each doc (already real, already grounded in
 * this project's own migrated project data) is left untouched; this
 * script only adds the general research/review layer around it.
 *
 * Run with: npx tsx scripts/enrich-existing-tools.ts
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
const now = new Date().toISOString();

const patches: Record<string, Record<string, unknown>> = {
  "tool-openai": {
    type: "Tool",
    tags: ["LLM Provider", "GPT", "API", "Structured Outputs"],
    overview:
      "OpenAI is the LLM provider behind the GPT model family and ChatGPT. Its API exposes text, structured-output (JSON schema-constrained) and function/tool-calling capabilities, used here as one of the interchangeable synthesis backends behind the AI Workflow Automation Platform's chatbot.",
    researchContent:
      "GPT-family models are accessed via a REST API with strong support for JSON-schema-constrained structured outputs and function/tool calling — the two capabilities the AI Workflow Automation Platform's requirements-to-prototype pipeline relies on most directly. ChatGPT (the consumer product) sits on the same underlying models with a chat interface, file upload, and Projects/Custom GPTs for reusable configured assistants. The API is priced per token, varying by model tier (smaller/faster models cost less than the largest/most capable ones), with usage-based billing rather than a flat subscription for API access specifically.",
    useCases: [
      "Structured-output generation matched to a fixed JSON schema",
      "Function/tool calling to connect a model to external systems",
      "General-purpose chat and reasoning tasks",
      "Rapid prototyping via ChatGPT's Projects/Custom GPTs for one-off configured assistants",
    ],
    practicalScenarios:
      "A general scenario OpenAI's API suits well: given a fixed downstream schema (e.g. a database row shape), use structured outputs to guarantee every response is schema-valid JSON rather than parsing free-form text and hoping it's well-formed.",
    strengths: [
      "Mature, widely-adopted API with broad tooling and library support",
      "Strong structured-output and function-calling reliability",
      "Large model lineup covering a range of cost/capability tradeoffs",
    ],
    limitations: [
      "Cost scales with usage and can climb quickly for high-volume production traffic",
      "No fully offline or self-hosted option",
      "Rate limits require real handling (backoff/retry) in production systems, not just at prototype scale",
    ],
    researchStatus: "Published",
    lastUpdated: now,
    reviewedVersion: "GPT-4 family",
    lastReviewed: "September 2026",
    sources: [
      { label: "Official Website", url: "https://openai.com" },
      { label: "API Documentation", url: "https://platform.openai.com/docs" },
    ],
  },

  "tool-anthropic-claude": {
    type: "Tool",
    tags: ["LLM Provider", "Claude", "API", "Long Context"],
    overview:
      "Anthropic's Claude model family, accessed via API or the Claude.ai product, with a strong reputation for long-context reasoning and reliability on complex multi-step tasks. Claude Code — Anthropic's separate agentic coding tool — has its own dedicated research entry; this page covers Claude as a model/API provider.",
    researchContent:
      "Claude models are available via API (used here as one of the multi-LLM synthesis backends in the RAG-based meeting intelligence platform) and via Claude.ai, which adds Projects (persistent context for a body of work), Artifacts (live-rendered code/content outputs), and file upload. The API supports a large context window, which matters directly for retrieval-augmented use cases where a synthesis step needs to reason over many retrieved chunks at once rather than a short excerpt.",
    useCases: [
      "Long-context reasoning over large retrieved-document sets",
      "Multi-step agentic tasks via the API",
      "General synthesis backend in a multi-LLM architecture",
    ],
    practicalScenarios:
      "A general scenario Claude's long context window suits well: synthesizing an answer from a large batch of retrieved transcript or document chunks in a single call, rather than needing a separate summarization pass first to fit a smaller context window.",
    strengths: [
      "Large context window, useful for RAG-style synthesis over many retrieved chunks",
      "Consistent, reliable behavior on complex multi-step reasoning",
      "Claude.ai's Projects/Artifacts are genuinely useful for iterative work, not just chat",
    ],
    limitations: [
      "Usage-based API cost scales with both input and output tokens, which matters more here given the large-context use case",
      "Regional availability varies",
      "No fully offline/self-hosted option",
    ],
    researchStatus: "Published",
    lastUpdated: now,
    reviewedVersion: "Claude 5 family",
    lastReviewed: "September 2026",
    sources: [
      { label: "Official Website", url: "https://www.anthropic.com" },
      { label: "Anthropic Documentation", url: "https://docs.claude.com" },
    ],
    relatedContent: [ref("tool-claude-code")],
  },

  "tool-google-gemini": {
    type: "Tool",
    tags: ["LLM Provider", "Multimodal", "API"],
    overview:
      "Google's Gemini model family, with strong native multimodal support (text, image, and beyond) via the Gemini API/AI Studio, and an enterprise path through Vertex AI. Used here as one of the interchangeable LLM backends in the AI Workflow Automation Platform and as an alternate RAG synthesis backend.",
    researchContent:
      "Gemini models are natively multimodal — accepting text and image (and, depending on model/tier, audio/video) input in the same request, rather than requiring a separate vision-specific model or pipeline. Google AI Studio provides a free-tier path to the API for lower-volume use, with Vertex AI as the path for enterprise-scale deployment with Google Cloud's broader infrastructure and access controls.",
    useCases: [
      "Multimodal tasks combining text and image input in one request",
      "Cost-conscious prototyping via the AI Studio free tier",
      "An alternate synthesis backend in a multi-LLM architecture",
    ],
    practicalScenarios:
      "A general scenario Gemini's multimodal support suits well: a single request that needs to reason jointly over a screenshot and accompanying text instructions, rather than running separate vision and text passes and merging the results manually.",
    strengths: [
      "Native multimodal input handling in a single request",
      "Free tier via AI Studio, useful for prototyping before committing to paid usage",
      "Straightforward path to enterprise scale via Vertex AI for teams already on Google Cloud",
    ],
    limitations: [
      "Feature and model-version rollout timing can lag or lead other providers depending on the capability",
      "Vertex AI's enterprise path adds Google Cloud-specific setup overhead compared to a plain API key",
    ],
    researchStatus: "Published",
    lastUpdated: now,
    reviewedVersion: "Gemini 2.x family",
    lastReviewed: "September 2026",
    sources: [{ label: "Official Website", url: "https://ai.google.dev" }],
  },

  "tool-groq": {
    type: "Platform",
    tags: ["Inference Platform", "LPU", "Low Latency", "Open Models"],
    overview:
      "Groq is an inference platform, not a model provider — it hosts open models (Llama, Mixtral and others) on custom LPU (Language Processing Unit) hardware built specifically for extremely low-latency inference. Chosen here as the primary synthesis backend for the RAG-based meeting intelligence platform specifically for its speed.",
    researchContent:
      "Groq's LPU architecture is purpose-built for inference rather than being a general-purpose GPU repurposed for the task, which is what gives it a real, measurable latency advantage over typical GPU-hosted inference for the same open model. The API is OpenAI-SDK-compatible, meaning a codebase already using the OpenAI SDK's request/response shape can often point it at Groq's endpoint with minimal changes — relevant here since the RAG platform's architecture already treats LLM backends as interchangeable behind a common interface.",
    useCases: [
      "Latency-sensitive synthesis where sub-second response time matters more than access to the single most capable frontier model",
      "RAG pipelines where retrieval already adds latency, so the synthesis step needs to be as fast as possible",
      "Prototyping against an OpenAI-SDK-compatible endpoint without provider lock-in",
    ],
    practicalScenarios:
      "A general scenario Groq suits well: a user-facing chat interface where perceived responsiveness matters — sub-second time-to-first-token keeps the interaction feeling live rather than making the user wait on a visible spinner.",
    strengths: [
      "Genuinely fast inference — this was the deciding factor for using it in the RAG meeting intelligence platform, not just a marketing claim",
      "OpenAI-SDK-compatible API, low switching friction",
      "Free tier available",
    ],
    limitations: [
      "Hosts open models Groq chooses to serve, not proprietary frontier models from other labs",
      "Free-tier rate limits are real constraints for higher-volume production traffic",
    ],
    researchStatus: "Published",
    lastUpdated: now,
    reviewedVersion: "GroqCloud",
    lastReviewed: "September 2026",
    sources: [
      { label: "Official Website", url: "https://groq.com" },
      { label: "GroqCloud Documentation", url: "https://console.groq.com/docs" },
    ],
  },
};

async function main() {
  for (const [id, fields] of Object.entries(patches)) {
    await client.patch(id).set(fields).commit();
    console.log(`  ✓ ${id}`);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
