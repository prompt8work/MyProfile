import { defineArrayMember, defineField, defineType } from "sanity";

// PRD §71. Singleton by convention — only one Resume document should exist;
// enforced later via Studio structure (a fixed "Resume" entry rather than a
// list), not yet critical while there's just one editor.
//
// This document is the single source for BOTH the /resume web page and the
// downloadable PDF (/resume/download, generated on request). Edit here and
// both update — there is no separate PDF file to replace.
//
// Roles are kept inline rather than referencing Experience documents: the
// resume wording is tailored, and the Experience documents feed the
// /experience page with their own wording.

const metric = defineArrayMember({
  type: "object",
  name: "metric",
  fields: [
    defineField({ name: "value", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});

export default defineType({
  name: "resume",
  title: "Resume",
  type: "document",
  groups: [
    { name: "header", title: "Header", default: true },
    { name: "content", title: "Resume content" },
    { name: "website", title: "Website only" },
  ],
  fields: [
    defineField({ name: "name", type: "string", group: "header", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", group: "header", description: "e.g. AI Solution Engineer" }),
    defineField({ name: "email", type: "string", group: "header" }),
    defineField({ name: "phone", type: "string", group: "header" }),
    defineField({ name: "location", type: "string", group: "header" }),
    defineField({ name: "linkedin", type: "string", group: "header", description: "Without https://, e.g. linkedin.com/in/…" }),

    defineField({
      name: "summary",
      type: "array",
      group: "content",
      description: "One entry per paragraph.",
      of: [defineArrayMember({ type: "text", rows: 3 })],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "skills",
      title: "Core skills",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "skillGroup",
          fields: [
            defineField({ name: "category", type: "string", validation: (r) => r.required() }),
            defineField({ name: "items", type: "array", of: [{ type: "string" }] }),
          ],
          preview: { select: { title: "category" } },
        }),
      ],
    }),
    defineField({
      name: "roles",
      title: "Experience",
      type: "array",
      group: "content",
      description:
        "Most recent first. Roles with highlights appear as full entries; roles without highlights are listed compactly under the 'Earlier roles heading'.",
      of: [
        defineArrayMember({
          type: "object",
          name: "role",
          fields: [
            defineField({ name: "role", type: "string", validation: (r) => r.required() }),
            defineField({ name: "company", type: "string", validation: (r) => r.required() }),
            defineField({ name: "location", type: "string" }),
            defineField({ name: "startDate", type: "date", validation: (r) => r.required() }),
            defineField({ name: "endDate", type: "date", description: "Leave empty for the current role" }),
            defineField({ name: "highlights", type: "array", of: [{ type: "text", rows: 2 }] }),
          ],
          preview: { select: { title: "role", subtitle: "company" } },
        }),
      ],
    }),
    defineField({
      name: "earlierRolesHeading",
      type: "string",
      group: "content",
      initialValue: "Earlier — .NET Engineering",
    }),
    defineField({
      name: "projects",
      title: "Selected projects",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "resumeProject",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "tech", title: "Technologies", type: "array", of: [{ type: "string" }] }),
            defineField({
              name: "techLabel",
              type: "string",
              description: "Optional prefix before the technologies line in the PDF, e.g. 'Key technologies'",
            }),
            defineField({ name: "points", title: "Bullet points", type: "array", of: [{ type: "text", rows: 2 }] }),
            defineField({
              name: "description",
              title: "Paragraphs",
              type: "array",
              description: "Use instead of (or alongside) bullet points for prose descriptions.",
              of: [{ type: "text", rows: 4 }],
            }),
            defineField({ name: "badge", type: "string", description: "Website only — short card badge, e.g. RAG" }),
          ],
          preview: { select: { title: "name" } },
        }),
      ],
    }),
    defineField({
      name: "certifications",
      type: "array",
      group: "content",
      description: "Listed before education under 'Education & Certification'.",
      of: [
        defineArrayMember({
          type: "object",
          name: "certificationEntry",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "issuer", type: "string" }),
            defineField({ name: "credentialId", type: "string" }),
            defineField({ name: "date", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "education",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "educationEntry",
          fields: [
            defineField({ name: "degree", type: "string", validation: (r) => r.required() }),
            defineField({ name: "institution", type: "string" }),
            defineField({ name: "year", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "teaching",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "teachingEntry",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),

    defineField({
      name: "heroStats",
      type: "array",
      group: "website",
      description: "Floating stat cards next to the photo (3 fit best).",
      of: [metric],
    }),
    defineField({
      name: "numbers",
      title: "By the numbers",
      type: "array",
      group: "website",
      description: "4 fit best.",
      of: [metric],
    }),

    defineField({ name: "updatedAt", type: "datetime" }),
  ],
  preview: {
    prepare: () => ({ title: "Resume" }),
  },
});
