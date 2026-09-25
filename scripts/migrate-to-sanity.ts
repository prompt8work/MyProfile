/**
 * One-off migration: pushes the existing static data/*.ts content into
 * Sanity as real documents, so the CMS starts populated instead of empty.
 * Run with: npx tsx scripts/migrate-to-sanity.ts
 *
 * Uses createOrReplace with deterministic _ids throughout, so running this
 * again (e.g. after editing the static data further) updates the same
 * documents rather than creating duplicates.
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "next-sanity";
import { projects } from "../data/projects";
import { currentExperience, previousExperience } from "../data/experience";
import { summary } from "../data/summary";
import { skills } from "../data/skills";
import { education } from "../data/education";
import { achievements } from "../data/achievements";
import { passions } from "../data/passions";

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

// "Feb 2024" -> "2024-02-01". Good enough for a day-precision date field —
// none of the source data specifies an exact day.
function parseMonthYear(s: string): string {
  const [month, year] = s.trim().split(" ");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const mi = months.indexOf(month);
  if (mi === -1) throw new Error(`Unrecognized month in "${s}"`);
  return `${year}-${String(mi + 1).padStart(2, "0")}-01`;
}

function parsePeriod(period: string): { startDate: string; endDate?: string } {
  const [startRaw, endRaw] = period.split("–").map((s) => s.trim());
  const startDate = parseMonthYear(startRaw);
  if (endRaw === "Present") return { startDate };
  return { startDate, endDate: parseMonthYear(endRaw) };
}

async function migrateProjects() {
  console.log(`Migrating ${projects.length} projects...`);
  for (const p of projects) {
    await client.createOrReplace({
      _id: `project-${p.slug}`,
      _type: "project",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      category: p.category,
      visibility: p.visibility,
      confidentialityNote: p.confidentialityNote,
      summary: p.summary,
      stats: p.stats,
      tech: p.tech,
      aiModels: p.aiModels,
      overview: p.overview,
      problem: p.problem,
      context: p.context,
      solution: p.solution,
      role: p.role,
      architecture: p.architecture,
      workflow: p.workflow,
      challenges: p.challenges,
      results: p.results,
      learnings: p.learnings,
      publishedAt: new Date().toISOString(),
    });
    console.log(`  ✓ ${p.title}`);
  }
}

async function migrateExperience() {
  console.log("Migrating experience...");
  const entries = [
    { ...currentExperience, points: currentExperience.achievements },
    ...previousExperience,
  ];

  const ids: string[] = [];
  for (const [i, e] of entries.entries()) {
    const { startDate, endDate } = parsePeriod(e.period);
    const id = `experience-${i}`;
    await client.createOrReplace({
      _id: id,
      _type: "experience",
      company: e.company,
      role: e.role,
      location: e.location,
      startDate,
      endDate,
      responsibilities: e.points,
      displayOrder: i,
    });
    ids.push(id);
    console.log(`  ✓ ${e.role} @ ${e.company}`);
  }
  return ids;
}

async function migrateResume(experienceIds: string[]) {
  console.log("Migrating resume...");
  // education.ts mixes a certification in with real degrees — split
  // explicitly by content rather than guessing programmatically.
  const [csm, gniit, bsc] = education;

  await client.createOrReplace({
    _id: "resume-singleton",
    _type: "resume",
    summary,
    skills: [
      { _key: "primary", category: "Lead Generation & Sales", items: skills.primary },
      { _key: "technical", category: "Technical Expertise", items: skills.technical },
      { _key: "tools", category: "Tools & Platforms", items: skills.tools },
      { _key: "ai_api", category: "AI APIs & Models", items: skills.AI_API },
    ],
    experience: experienceIds.map((id, i) => ({
      _key: `exp-${i}`,
      _type: "reference",
      _ref: id,
    })),
    education: [gniit, bsc].map((e, i) => ({ _key: `edu-${i}`, ...e })),
    certifications: [
      {
        _key: "cert-0",
        name: csm.degree,
        issuer: csm.institution,
        credentialId: csm.details?.replace("Certificate ID: ", ""),
      },
    ],
    achievements: achievements.map((a, i) => ({ _key: `ach-${i}`, ...a })),
    interests: passions,
    updatedAt: new Date().toISOString(),
  });
  console.log("  ✓ Resume");
}

async function main() {
  await migrateProjects();
  const experienceIds = await migrateExperience();
  await migrateResume(experienceIds);
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
