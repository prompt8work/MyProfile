"use client";

import { useEffect, useId, useState } from "react";

// Site palette (globals.css tokens) so Mermaid output matches the drawn
// diagrams. Authors never style nodes themselves.
const themeVariables = {
  fontSize: "14px",
  primaryColor: "#f6f1f4", // plum-50
  primaryBorderColor: "#be96b0", // plum-300
  primaryTextColor: "#2e2a24", // neutral-800
  secondaryColor: "#e9e7f8", // lavender-100
  secondaryBorderColor: "#b6ade6",
  tertiaryColor: "#ffffff",
  tertiaryBorderColor: "#d2cbbb",
  lineColor: "#7d7566", // neutral-500
  textColor: "#2e2a24",
  edgeLabelBackground: "#ffffff",
  clusterBkg: "#faf8f4",
  clusterBorder: "#d2cbbb",
  noteBkgColor: "#f2efe9",
  noteBorderColor: "#d2cbbb",
  actorBkg: "#f6f1f4",
  actorBorder: "#be96b0",
  signalColor: "#443f36",
  labelBoxBkgColor: "#f6f1f4",
};

/**
 * Advanced diagrams (branching decisions, architecture, sequences) from
 * Mermaid source. Mermaid is imported only when one of these is on the
 * page. Until it renders — or if it can't — the source stays readable.
 */
export default function MermaidDiagram({ code }: { code: string }) {
  const id = `mmd-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import("mermaid")
      .then(async ({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          fontFamily: getComputedStyle(document.body).fontFamily,
          themeVariables,
          flowchart: { htmlLabels: true, curve: "basis", padding: 12 },
        });
        const { svg } = await mermaid.render(id, code);
        if (!cancelled) setSvg(svg);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [code, id]);

  if (svg) {
    return (
      <div
        className="overflow-x-auto [&_svg]:mx-auto [&_svg]:max-w-full [&_svg]:h-auto"
        // Mermaid's strict security level sanitises its SVG output.
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {failed && <p className="text-[13px] text-error">This diagram couldn&apos;t be drawn. Its source is below.</p>}
      <pre
        className={`whitespace-pre-wrap font-mono text-[12.5px] leading-relaxed text-neutral-600 ${failed ? "" : "opacity-60"}`}
        aria-busy={!failed}
      >
        {code}
      </pre>
    </div>
  );
}
