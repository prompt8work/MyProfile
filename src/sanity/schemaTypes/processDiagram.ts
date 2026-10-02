import { defineArrayMember, defineField } from "sanity";
import type { Placement } from "./diagramPlacements";

// Content rule (Docs/design/content-guidelines.md): every blog post and AI
// Lab entry explains a process, so each one carries at least one diagram.
// One object type serves all of them; the four kinds cover the diagram
// playbook — flow (steps, optionally data-driven with metrics), loop
// (iterative work), analogy (a concept explained through a familiar
// comparison) and advanced (Mermaid, for branching decisions and system
// architecture that boxes-and-arrows can't express).

export const stepKinds = [
  { title: "Trigger", value: "trigger" },
  { title: "Input", value: "input" },
  { title: "AI / model", value: "ai" },
  { title: "Decision", value: "decision" },
  { title: "Action", value: "action" },
  { title: "Data store", value: "store" },
  { title: "Human", value: "human" },
  { title: "Output", value: "output" },
];

const diagramKinds = [
  { title: "Flow — steps in order (add metrics for a data-driven flow)", value: "flow" },
  { title: "Loop — steps that repeat", value: "loop" },
  { title: "Analogy — concept explained through a comparison", value: "analogy" },
  { title: "Advanced — Mermaid (branching decisions, architecture, sequences)", value: "advanced" },
];

type Diagram = {
  kind?: string;
  steps?: unknown[];
  loopBackTo?: number;
  pairs?: unknown[];
  mermaid?: string;
};

// Built per content type (not registered globally) so `placement` can offer
// exactly that type's sections as a dropdown.
function diagramMember(placements: Placement[]) {
  return defineArrayMember({
    name: "processDiagram",
    title: "Diagram",
    type: "object",
    fields: [
      defineField({
        name: "key",
        type: "slug",
        description:
          "Short id, unique within this document. In a blog body, put [[diagram:your-key]] on its own line to place the diagram there.",
        validation: (r) => r.required(),
      }),
      defineField({ name: "title", type: "string", validation: (r) => r.required() }),
      defineField({
        name: "kind",
        type: "string",
        options: { list: diagramKinds, layout: "radio" },
        initialValue: "flow",
        validation: (r) => r.required(),
      }),
      defineField({
        name: "placement",
        type: "string",
        description: "Where this diagram appears — it's drawn right after the chosen section.",
        options: { list: placements },
        initialValue: "top",
        validation: (r) => r.required(),
      }),
      defineField({
        name: "caption",
        type: "text",
        rows: 2,
        description: "One or two sentences explaining what the diagram shows — it must make sense without the picture.",
        validation: (r) => r.required(),
      }),

      // --- flow + loop ------------------------------------------------------
      defineField({
        name: "steps",
        type: "array",
        hidden: ({ parent }) => !["flow", "loop"].includes((parent as Diagram)?.kind ?? ""),
        of: [
          defineArrayMember({
            type: "object",
            name: "diagramStep",
            fields: [
              defineField({ name: "label", type: "string", validation: (r) => r.required() }),
              defineField({ name: "detail", type: "string" }),
              defineField({ name: "kind", type: "string", options: { list: stepKinds }, initialValue: "action" }),
              defineField({
                name: "metric",
                type: "string",
                description: 'A measured result for this step, e.g. "p95 < 3s" — only real, sourced numbers.',
              }),
              defineField({ name: "before", type: "string", description: 'Before/after change, e.g. before "45%"…' }),
              defineField({ name: "after", type: "string", description: '…after "89%".' }),
              defineField({
                name: "edgeLabel",
                type: "string",
                description: 'Label on the arrow leaving this step, e.g. "~2,000 transcripts/day" or "if score < 0.7".',
              }),
            ],
            preview: { select: { title: "label", subtitle: "kind" } },
          }),
        ],
      }),
      defineField({
        name: "loopBackTo",
        type: "number",
        description: "Step number (1 = first) the loop returns to after the last step.",
        hidden: ({ parent }) => (parent as Diagram)?.kind !== "loop",
      }),
      defineField({
        name: "loopLabel",
        type: "string",
        description: 'What sends the process round again, e.g. "until relevance ≥ 85%".',
        hidden: ({ parent }) => (parent as Diagram)?.kind !== "loop",
      }),

      // --- analogy ------------------------------------------------------------
      defineField({
        name: "concept",
        type: "string",
        description: 'The technical idea, e.g. "Embeddings".',
        hidden: ({ parent }) => (parent as Diagram)?.kind !== "analogy",
      }),
      defineField({
        name: "analogy",
        type: "string",
        description: 'The familiar thing it is like, e.g. "A library catalogue".',
        hidden: ({ parent }) => (parent as Diagram)?.kind !== "analogy",
      }),
      defineField({
        name: "pairs",
        type: "array",
        hidden: ({ parent }) => (parent as Diagram)?.kind !== "analogy",
        of: [
          defineArrayMember({
            type: "object",
            name: "analogyPair",
            fields: [
              defineField({ name: "concept", type: "string", validation: (r) => r.required() }),
              defineField({ name: "analogy", type: "string", validation: (r) => r.required() }),
            ],
            preview: { select: { title: "concept", subtitle: "analogy" } },
          }),
        ],
      }),

      // --- advanced -----------------------------------------------------------
      defineField({
        name: "mermaid",
        title: "Mermaid source",
        type: "text",
        rows: 10,
        description:
          "Mermaid syntax (flowchart, sequenceDiagram, stateDiagram…). Colours come from the site theme — don't style nodes.",
        hidden: ({ parent }) => (parent as Diagram)?.kind !== "advanced",
      }),
    ],
    validation: (r) =>
      r.custom((d: Diagram | undefined) => {
        if (!d) return true;
        if (d.kind === "flow" || d.kind === "loop") {
          const n = d.steps?.length ?? 0;
          if (n < 2) return "A flow needs at least 2 steps.";
          if (d.kind === "loop" && (!d.loopBackTo || d.loopBackTo < 1 || d.loopBackTo >= n))
            return `Loop back to a step between 1 and ${n - 1}.`;
        }
        if (d.kind === "analogy" && (d.pairs?.length ?? 0) < 2)
          return "An analogy needs at least 2 concept ↔ analogy pairs.";
        if (d.kind === "advanced" && !d.mermaid?.trim()) return "Add the Mermaid source.";
        return true;
      }),
    preview: {
      select: { title: "title", kind: "kind", placement: "placement" },
      prepare: ({ title, kind, placement }) => ({ title, subtitle: [kind, placement].filter(Boolean).join(" · ") }),
    },
  });
}

/**
 * The `diagrams` field every blog post and AI Lab type carries. `placements`
 * are the sections of that type a diagram can follow; "top" (right after
 * the header) is always available. At least one diagram is required.
 */
export function diagramsField(placements: Placement[], { inlineNote = false } = {}) {
  const list = [{ title: "Top — after the header", value: "top" }, ...placements];
  return defineField({
    name: "diagrams",
    title: "Diagrams",
    description:
      "Every post explains a process — at least one diagram is required. Use several: an end-to-end flow, the architecture, results as a data-driven flow, and an analogy for the hardest idea." +
      (inlineNote
        ? ' Choose placement "Inline" and put [[diagram:your-key]] on its own line in the body to place a diagram mid-text.'
        : ""),
    type: "array",
    of: [diagramMember(list)],
    validation: (r) =>
      r
        .required()
        .min(1)
        .error("Every post needs at least one process diagram (Docs/design/content-guidelines.md).")
        .custom((items: { key?: { current?: string } }[] | undefined) => {
          if (!items) return true;
          const keys = items.map((d) => d.key?.current).filter(Boolean);
          return new Set(keys).size === keys.length || "Diagram keys must be unique within the document.";
        }),
  });
}
