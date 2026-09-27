/**
 * Seeds the first real Training/Course document, replacing the static
 * `trainingBatch` placeholder that used to live in data/homeContent.ts.
 *
 * Content discipline: title, duration, mode ("8 Weeks", "Online") and the
 * course subject ("Prompt Engineering") are carried forward verbatim from
 * that already-real static data, not invented fresh. learningOutcomes and
 * topics reuse the exact "Prompt Engineering" expertise items already
 * claimed elsewhere on the site (data/homeContent.ts's `expertise` array:
 * "Prompt systems", "Structured outputs", "Evaluation & regression
 * testing", "Guardrails") rather than inventing a new curriculum.
 *
 * Deliberately does NOT seed a real batch here — a batch's start date is
 * a genuine scheduling decision only the site owner can make, and
 * inventing one would misrepresent an actual commitment. The course page
 * will show its honest "no batches scheduled right now" empty state until
 * real batch/schedule data is added (via the Supabase dashboard, or by
 * asking Claude to add specific dates once decided).
 *
 * Run with: npx tsx scripts/seed-training.ts
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

async function main() {
  await client.createOrReplace({
    _id: "training-prompt-engineering",
    _type: "training",
    slug: { _type: "slug", current: "prompt-engineering" },
    title: "Prompt Engineering",
    description:
      "A cohort-based, hands-on course in prompt engineering — building reliable prompt systems, structured outputs, evaluation/regression testing, and guardrails, the same practices used across the projects documented in this site's own AI Lab.",
    learningOutcomes: [
      "Design reliable prompt systems, not one-off prompts",
      "Generate structured, schema-constrained outputs consistently",
      "Build evaluation and regression tests for prompts before shipping changes",
      "Apply guardrails so a prompt fails safely instead of silently",
    ],
    topics: ["Prompt systems", "Structured outputs", "Evaluation & regression testing", "Guardrails"],
    audience:
      "Engineers, product folks, and teams building with LLMs who want a structured, hands-on foundation in prompt engineering.",
    duration: "8 Weeks",
    mode: "Online",
    instructor: "Niharika Dhande",
    registrationEnabled: true,
    publishedAt: new Date().toISOString(),
  });

  console.log("  ✓ Prompt Engineering training document created");
  console.log("\nDone. No batch seeded — see this script's own header comment for why.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
