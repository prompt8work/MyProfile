import { defineField, defineType } from "sanity";

// PRD §71. Singleton by convention — only one Resume document should exist;
// enforced later via Studio structure (a fixed "Resume" entry rather than a
// list), not yet critical while there's just one editor.
export default defineType({
  name: "resume",
  title: "Resume",
  type: "document",
  fields: [
    defineField({ name: "summary", type: "text", validation: (r) => r.required() }),
    defineField({
      name: "skills",
      type: "array",
      of: [
        {
          type: "object",
          name: "skillGroup",
          fields: [
            defineField({ name: "category", type: "string", validation: (r) => r.required() }),
            defineField({ name: "items", type: "array", of: [{ type: "string" }] }),
          ],
        },
      ],
    }),
    defineField({
      name: "experience",
      type: "array",
      of: [{ type: "reference", to: [{ type: "experience" }] }],
      description: "References the Experience documents — kept as a single source of career history, not duplicated here.",
    }),
    defineField({
      name: "education",
      type: "array",
      of: [
        {
          type: "object",
          name: "educationEntry",
          fields: [
            defineField({ name: "degree", type: "string", validation: (r) => r.required() }),
            defineField({ name: "institution", type: "string" }),
            defineField({ name: "details", type: "string" }),
            defineField({ name: "year", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "certifications",
      type: "array",
      of: [
        {
          type: "object",
          name: "certificationEntry",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "issuer", type: "string" }),
            defineField({ name: "credentialId", type: "string" }),
            defineField({ name: "date", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "achievements",
      type: "array",
      description: "Not in the PRD §71 field list, but the live Resume page has a Key Achievements section — added here rather than left unmigratable.",
      of: [
        {
          type: "object",
          name: "achievementEntry",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", type: "text", rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: "interests",
      type: "array",
      of: [{ type: "string" }],
      description: "Professional Interests section on the Resume page.",
    }),
    defineField({ name: "resumePdf", type: "file", description: "Downloadable PDF for the Export/Download action" }),
    defineField({ name: "updatedAt", type: "datetime" }),
  ],
  preview: {
    prepare: () => ({ title: "Resume" }),
  },
});
