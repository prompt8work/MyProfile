import { defineField, defineType } from "sanity";

// PRD §67, categories from §26.
const categories = [
  "Coding",
  "Research",
  "RAG",
  "Testing",
  "Documentation",
  "Marketing",
  "Image Generation",
  "Video Generation",
  "Automation",
  "Agents",
  "Productivity",
];

export default defineType({
  name: "prompt",
  title: "Prompt",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "category", type: "string", options: { list: categories }, validation: (r) => r.required() }),
    defineField({ name: "purpose", type: "text", rows: 2 }),
    defineField({ name: "prompt", type: "text", rows: 8, validation: (r) => r.required() }),
    defineField({ name: "variables", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "exampleInput", type: "text" }),
    defineField({ name: "exampleOutput", type: "text" }),
    defineField({ name: "tool", type: "reference", to: [{ type: "tool" }] }),
    defineField({ name: "tips", type: "text" }),
    defineField({
      name: "relatedContent",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }, { type: "tool" }] }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
