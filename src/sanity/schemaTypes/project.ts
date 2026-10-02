import { defineField, defineType } from "sanity";
import { diagramsField } from "./processDiagram";
import { diagramPlacements } from "./diagramPlacements";

// Mirrors data/projects.ts field-for-field (built for PRD §20's detail-page
// structure, which is more complete than the §64 schema stub) so the Phase 2
// migration is a data-source swap, not a page rebuild.
export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "category", type: "string", description: "e.g. \"RAG · Web App\"" }),
    defineField({
      name: "visibility",
      type: "string",
      options: { list: ["public", "generalized", "private"], layout: "radio" },
      initialValue: "public",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "confidentialityNote",
      type: "text",
      rows: 2,
      hidden: ({ document }) => document?.visibility === "public",
    }),
    defineField({ name: "summary", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "stats", type: "array", of: [{ type: "string" }], description: "e.g. \"100+ concurrent users\"" }),
    defineField({ name: "tech", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "aiModels", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "overview", type: "text" }),
    defineField({ name: "problem", type: "text" }),
    defineField({ name: "context", type: "text" }),
    defineField({ name: "solution", type: "text" }),
    defineField({ name: "role", type: "text" }),
    defineField({ name: "architecture", type: "text" }),
    defineField({ name: "workflow", type: "text" }),
    defineField({ name: "challenges", type: "text" }),
    defineField({ name: "results", type: "text" }),
    defineField({ name: "learnings", type: "text" }),
    diagramsField(diagramPlacements.project),
    defineField({
      name: "relatedContent",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }, { type: "tool" }, { type: "prompt" }, { type: "experiment" }, { type: "automation" }] }],
    }),
    defineField({ name: "publishedAt", type: "datetime" }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
