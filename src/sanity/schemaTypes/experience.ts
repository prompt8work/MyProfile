import { defineField, defineType } from "sanity";

// PRD §70. Uses real startDate/endDate rather than a hardcoded "period"
// string — endDate left empty means "Present," and displayOrder controls
// the timeline order explicitly rather than relying on document creation
// order (which Sanity doesn't guarantee).
export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "company", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "startDate", type: "date", validation: (r) => r.required() }),
    defineField({ name: "endDate", type: "date", description: "Leave empty for the current role" }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({ name: "responsibilities", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "technologies", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "achievements", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "displayOrder",
      type: "number",
      description: "Lower numbers show first (most recent = 0)",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrderAsc",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "role", subtitle: "company" },
  },
});
