/**
 * Checks content drafts against the site's content rules before they go
 * anywhere near Sanity: required fields, the diagram minimums for each
 * type, valid placements, blog inline markers, and that every number in
 * the draft appears in the author's own source text.
 *
 * Run with: npx tsx scripts/check-content.ts Docs/content-drafts/<slug>.json [more.json…]
 * Exits 1 if any draft has errors.
 */
import { existsSync, readFileSync } from "node:fs";
import { checkDraft, formatReport, type Draft } from "./lib/content-rules";

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("Usage: npx tsx scripts/check-content.ts Docs/content-drafts/<slug>.json");
  process.exit(2);
}

let failed = false;
for (const file of files) {
  const draft = JSON.parse(readFileSync(file, "utf8")) as Draft;
  const source = draft.source && existsSync(draft.source) ? readFileSync(draft.source, "utf8") : null;
  const report = checkDraft(draft, source);
  console.log(formatReport(file, report) + "\n");
  if (report.errors.length) failed = true;
}
process.exit(failed ? 1 : 0);
