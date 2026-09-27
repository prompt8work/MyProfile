import { defineField, defineType } from "sanity";

// PRD §25 structure.
export default defineType({
  name: "experiment",
  title: "Experiment",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "objective", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "tool", type: "reference", to: [{ type: "tool" }] }),
    defineField({ name: "problem", type: "text" }),
    defineField({ name: "setup", type: "text" }),
    defineField({ name: "promptOrWorkflow", title: "Prompt / Workflow", type: "text" }),
    defineField({ name: "input", type: "text" }),
    defineField({ name: "output", type: "text" }),
    defineField({ name: "whatWorked", type: "text" }),
    defineField({ name: "whatFailed", type: "text" }),
    defineField({ name: "learning", type: "text" }),
    defineField({ name: "useCases", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "relatedContent",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }, { type: "tool" }, { type: "prompt" }] }],
    }),
    defineField({ name: "publishedAt", type: "datetime" }),
  ],
  preview: {
    select: { title: "title", subtitle: "objective" },
  },
});
