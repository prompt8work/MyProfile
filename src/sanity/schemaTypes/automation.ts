import { defineField, defineType } from "sanity";

// PRD §68. `steps` models the Trigger → Input → AI Processing → Decision →
// Action → Output visualization from §27 as an ordered list of labeled
// stages, rather than five separate fixed fields — a real automation may
// have more or fewer stages than that exact five-step shape.
export default defineType({
  name: "automation",
  title: "Automation",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "problem", type: "text" }),
    defineField({ name: "trigger", type: "string" }),
    defineField({
      name: "steps",
      type: "array",
      of: [
        {
          type: "object",
          name: "step",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", type: "string" }),
          ],
        },
      ],
    }),
    defineField({ name: "tools", type: "array", of: [{ type: "reference", to: [{ type: "tool" }] }] }),
    defineField({ name: "architecture", type: "text" }),
    defineField({ name: "input", type: "text" }),
    defineField({ name: "output", type: "text" }),
    defineField({ name: "limitations", type: "text" }),
    defineField({ name: "securityNotes", type: "text", description: "Sensitive info must never be exposed here — PRD §28" }),
    defineField({
      name: "relatedContent",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }, { type: "tool" }] }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
