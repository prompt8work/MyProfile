/**
 * Seeds the remaining AI Lab sub-areas: Prompt Library, Experiments,
 * Automation Gallery. Same grounding discipline as seed-ai-lab-tools.ts:
 * every factual claim (metrics, architecture, tool choices) is pulled from
 * the already-migrated project data (data/projects.ts) rather than
 * invented. Anything more specific than that — exact routing logic,
 * discarded approaches, named learnings — is left as a bracketed
 * placeholder rather than filled with plausible-sounding text.
 *
 * Prompt text itself is a genuine constructed artifact (a reusable
 * template), not a claim about a fact — it's written to match the
 * already-documented expertise areas (data/homeContent.ts's Prompt
 * Engineering list: structured outputs, evaluation/regression testing,
 * guardrails) and the real projects' documented architecture, but isn't
 * presented as a verbatim copy of undisclosed production prompt text.
 *
 * Run with: npx tsx scripts/seed-ai-lab-content.ts
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

const prompts = [
  {
    slug: "structured-requirements-extraction",
    title: "Structured Requirements Extraction",
    category: "Automation",
    purpose:
      "Extract structured, schema-conformant JSON from unstructured prospect requirements text — the kind of contract the AI Workflow Automation Platform's chatbot relies on to turn a conversation into a working prototype.",
    prompt:
      "You are a requirements-extraction engine. Read the input text and return ONLY valid JSON matching this schema — no prose, no markdown fences:\n\n{{target_schema}}\n\nRules:\n- If a field cannot be determined from the input, set it to null. Never guess or fabricate a value.\n- If the input contains multiple distinct requirements, return an array of objects, one per requirement.\n- Preserve the requester's original wording inside string fields; do not paraphrase.\n\nInput:\n{{raw_requirements_text}}",
    variables: ["raw_requirements_text", "target_schema"],
    exampleInput: "We need a dashboard that shows daily active users and lets admins export the data as CSV.",
    exampleOutput:
      '{"feature": "dashboard", "metrics": ["daily active users"], "actions": ["export as CSV"], "actor": "admin"}',
    tool: "tool-openai",
    tips:
      "Always inline the exact target schema rather than a free-form 'return JSON' instruction — model behavior on loosely-specified JSON drifts across model versions, but an inlined schema stays stable.",
    relatedContent: ["project-ai-workflow-automation-platform"],
  },
  {
    slug: "grounded-rag-answer-synthesis",
    title: "Grounded RAG Answer Synthesis with Citations",
    category: "RAG",
    purpose:
      "Synthesize an answer to a user's question strictly from retrieved transcript chunks, with inline citations — the core synthesis step behind the meeting intelligence platform's chat interface.",
    prompt:
      "Answer the question using ONLY the retrieved context below. Cite the chunk id(s) you used in square brackets after each claim, e.g. [chunk_12].\n\nIf the retrieved context does not contain enough information to answer, respond exactly: \"I couldn't find this in the meeting transcripts.\" Do not use outside knowledge.\n\nRetrieved context:\n{{retrieved_chunks}}\n\nQuestion:\n{{question}}",
    variables: ["question", "retrieved_chunks"],
    exampleInput: "What did we decide about the Q3 launch date?",
    exampleOutput: 'The team agreed to push the Q3 launch to August 15th [chunk_04].',
    tool: "tool-groq",
    tips:
      "Explicitly instruct the model to say when it doesn't know, in an exact fixed phrase. That single line is what keeps ungrounded, made-up answers out of a RAG-backed product — without it, models will confidently answer from prior knowledge instead of the retrieved context.",
    relatedContent: ["project-rag-meeting-intelligence-platform"],
  },
  {
    slug: "prompt-regression-test-case-generator",
    title: "Prompt Regression Test Case Generator",
    category: "Testing",
    purpose:
      "Generate a battery of edge-case test inputs for a production prompt before a model or prompt-version upgrade ships — matches the evaluation & regression-testing practice already part of this prompt engineering practice.",
    prompt:
      "You are generating a regression test suite for the following production prompt. Do not solve the prompt's task — only generate adversarial and edge-case inputs that could break it.\n\nPrompt under test:\n{{prompt_under_test}}\n\nExpected output schema:\n{{expected_output_schema}}\n\nGenerate 10 test inputs covering: empty/missing fields, conflicting instructions embedded in the input, unusually long input, non-English input, and at least one prompt-injection attempt. For each, state what failure mode it's designed to catch.",
    variables: ["prompt_under_test", "expected_output_schema"],
    tips:
      "Run this against every prompt before a model upgrade, not just new prompts — a prompt that passed on one model version can silently regress on the next without a fixed test battery to catch it.",
    relatedContent: [] as string[],
  },
];

const experiments = [
  {
    slug: "hybrid-retrieval-tuning-meeting-transcripts",
    title: "Hybrid Retrieval Tuning for Meeting Transcript Search",
    objective:
      "Improve retrieval relevance for the RAG-based meeting intelligence platform so that answers were reliably grounded in the actual transcript content, not a generic model guess.",
    tool: "tool-groq",
    problem:
      "Meeting content piled up faster than anyone could search it manually, and early retrieval-only answers weren't consistently grounded in the real transcript content.",
    setup:
      "FAISS vector search over Sentence Transformer embeddings, evaluated first as pure dense retrieval, then against a hybrid retrieval approach combining dense and keyword signals before synthesis through Groq.",
    promptOrWorkflow: "[ Exact hybrid scoring formula and reranking logic — not written up yet, to be added ]",
    input: "[ Representative test query set used for evaluation — to be added ]",
    output: "[ Example before/after retrieved-chunk comparison — to be added ]",
    whatWorked:
      "Hybrid retrieval measurably lifted relevance from 45% to 89% (see the RAG-Based Meeting Intelligence Platform project results), while Groq kept end-to-end p95 response time under 3 seconds at 100+ concurrent users.",
    whatFailed: "[ Approaches tried and discarded before landing on the hybrid approach — to be added ]",
    learning: "[ Key takeaway from this tuning process — to be added ]",
    useCases: ["Meeting transcript search", "Grounded Q&A over long-form audio content"],
    relatedContent: ["project-rag-meeting-intelligence-platform", "tool-groq"],
  },
  {
    slug: "multi-llm-routing-prospect-to-prototype",
    title: "Multi-LLM Routing for a Prospect-to-Prototype Chatbot",
    objective:
      "Route prospect requirement inputs through the LLM best suited to each sub-task, rather than a single fixed model, inside the AI Workflow Automation Platform's chatbot.",
    tool: "tool-openai",
    problem:
      "Converting prospect requirements and technical presentations into working software prototypes fast enough to keep pace with a live sales/demo cycle.",
    setup:
      "OpenAI and Gemini exposed behind a common interface in the FastAPI orchestration layer, with per-task routing logic deciding which provider handled a given step.",
    promptOrWorkflow: "[ Actual routing/task-classification logic — to be added ]",
    whatWorked:
      "Contributed to 500+ production-ready solutions and prompts built for prospect presentations, with a reported 10x productivity improvement on affected workflows (see the AI Workflow Automation Platform project results).",
    whatFailed: "[ Routing edge cases or model mismatches encountered — to be added ]",
    learning: "[ Key takeaway from running two providers behind one interface — to be added ]",
    useCases: ["Requirements-to-prototype automation", "Multi-model orchestration"],
    relatedContent: ["project-ai-workflow-automation-platform", "tool-openai", "tool-google-gemini"],
  },
];

const automations = [
  {
    slug: "prospect-requirements-to-prototype",
    title: "Prospect Requirements → Working Prototype",
    description: "Turns structured prospect requirements into a working software prototype during a live sales/demo cycle.",
    problem:
      "Converting prospect requirements and technical presentations into working software prototypes fast enough to keep pace with a live sales/demo cycle.",
    trigger: "New prospect requirements document submitted",
    steps: [
      { label: "Trigger", description: "Prospect requirements received" },
      { label: "Input", description: "Requirements parsed into a structured schema" },
      { label: "AI Processing", description: "Routed to OpenAI or Gemini depending on task type" },
      { label: "Decision", description: "[ Routing/decision logic — to be added ]" },
      { label: "Action", description: "Generates working prototype code and UI" },
      { label: "Output", description: "Demo-ready prototype delivered" },
    ],
    tools: ["tool-openai", "tool-google-gemini"],
    architecture:
      "C#/.NET backend, Angular front end, FastAPI service layer for AI orchestration, with OpenAI and Gemini as interchangeable LLM providers behind a common interface.",
    limitations: "[ Known limitations of this automation — to be added ]",
    securityNotes:
      "[ Full data-handling notes for prospect input to be added — no sensitive client data is exposed in this write-up ]",
    relatedContent: ["project-ai-workflow-automation-platform"],
  },
  {
    slug: "meeting-transcript-ingestion-indexing",
    title: "Meeting Transcript Ingestion & Indexing",
    description: "Syncs new meeting transcripts and makes them immediately searchable through the RAG chat interface.",
    problem:
      "Meeting content piled up faster than anyone could search it manually — new transcripts needed to become queryable without manual intervention.",
    trigger: "New file synced via the Google Drive API",
    steps: [
      { label: "Trigger", description: "Google Drive API detects a new transcript file" },
      { label: "Input", description: "Transcript text extracted" },
      { label: "AI Processing", description: "Sentence Transformer embeddings generated" },
      { label: "Decision", description: "[ Chunking/indexing decision logic — to be added ]" },
      { label: "Action", description: "Embeddings written to the FAISS index" },
      { label: "Output", description: "Transcript becomes queryable in the chat interface" },
    ],
    tools: ["tool-groq"],
    architecture:
      "Google Drive API → transcript ingestion → Sentence Transformer embeddings → FAISS hybrid retrieval → Groq/OpenAI/Anthropic/Gemini synthesis → chat interface.",
    limitations: "[ Known limitations of this automation — to be added ]",
    securityNotes: "[ Data-handling notes for transcript content — to be added ]",
    relatedContent: ["project-rag-meeting-intelligence-platform"],
  },
];

async function main() {
  console.log("Prompts:");
  for (const p of prompts) {
    await client.createOrReplace({
      _id: `prompt-${p.slug}`,
      _type: "prompt",
      slug: { _type: "slug", current: p.slug },
      title: p.title,
      category: p.category,
      purpose: p.purpose,
      prompt: p.prompt,
      variables: p.variables,
      exampleInput: p.exampleInput,
      exampleOutput: p.exampleOutput,
      tips: p.tips,
      ...(p.tool ? { tool: ref(p.tool) } : {}),
      relatedContent: p.relatedContent.map(ref),
    });
    console.log(`  ✓ ${p.title}`);
  }

  console.log("Experiments:");
  for (const e of experiments) {
    await client.createOrReplace({
      _id: `experiment-${e.slug}`,
      _type: "experiment",
      slug: { _type: "slug", current: e.slug },
      title: e.title,
      objective: e.objective,
      ...(e.tool ? { tool: ref(e.tool) } : {}),
      problem: e.problem,
      setup: e.setup,
      promptOrWorkflow: e.promptOrWorkflow,
      input: e.input,
      output: e.output,
      whatWorked: e.whatWorked,
      whatFailed: e.whatFailed,
      learning: e.learning,
      useCases: e.useCases,
      relatedContent: e.relatedContent.map(ref),
      publishedAt: new Date().toISOString(),
    });
    console.log(`  ✓ ${e.title}`);
  }

  console.log("Automations:");
  for (const a of automations) {
    await client.createOrReplace({
      _id: `automation-${a.slug}`,
      _type: "automation",
      slug: { _type: "slug", current: a.slug },
      title: a.title,
      description: a.description,
      problem: a.problem,
      trigger: a.trigger,
      steps: a.steps.map((s, i) => ({ ...s, _type: "step", _key: `step-${i}` })),
      tools: a.tools.map(ref),
      architecture: a.architecture,
      limitations: a.limitations,
      securityNotes: a.securityNotes,
      relatedContent: a.relatedContent.map(ref),
    });
    console.log(`  ✓ ${a.title}`);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
