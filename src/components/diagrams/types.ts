// Shape returned by diagramsProjection (src/sanity/lib/queries.ts). Schema:
// src/sanity/schemaTypes/processDiagram.ts.

export type StepKind = "trigger" | "input" | "ai" | "decision" | "action" | "store" | "human" | "output";

export type DiagramStep = {
  label: string;
  detail?: string;
  kind?: StepKind;
  metric?: string;
  before?: string;
  after?: string;
  edgeLabel?: string;
};

export type Diagram = {
  key: string;
  title: string;
  kind: "flow" | "loop" | "analogy" | "advanced";
  placement?: string;
  caption?: string;
  steps?: DiagramStep[];
  loopBackTo?: number;
  loopLabel?: string;
  concept?: string;
  analogy?: string;
  pairs?: { concept: string; analogy: string }[];
  mermaid?: string;
};
