import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

// Dynamic Open Graph share image — code-generated per request, not a
// static file, so real page titles render as real text (per the design
// spec's own reasoning in Docs/design/asset-prompt-library.md §10.1:
// baked-in text from an image generator won't update when titles change).
// Wired in via buildMetadata() in src/lib/site.ts, so every page that
// already calls buildMetadata() picks this up automatically.
export const runtime = "nodejs";

// Colors match the site's real, already-shipped design tokens
// (src/app/globals.css) — not the older plum-only OG spec, since the
// live "P/" mark (Nav.tsx, SiteFooter.tsx) is the actual established
// brand identity to reuse.
const VARIANTS = {
  blog: { bg: "#faf8f4", accent: "#5b2a49", text: "#1e1b17", sub: "#7d7566", markBg: "#1e1b17" },
  project: { bg: "#1e1b17", accent: "#0fb4c4", text: "#faf8f4", sub: "#a39c8e", markBg: "#faf8f4" },
  tool: { bg: "#1e1b17", accent: "#0fb4c4", text: "#faf8f4", sub: "#a39c8e", markBg: "#faf8f4" },
  training: { bg: "#faf8f4", accent: "#e3b563", text: "#1e1b17", sub: "#7d7566", markBg: "#1e1b17" },
} as const;

export type OgVariant = keyof typeof VARIANTS;

let headshotDataUri: string | null = null;
function getHeadshotDataUri(): string {
  if (!headshotDataUri) {
    const buf = readFileSync(path.join(process.cwd(), "public/images/headshot.png"));
    headshotDataUri = `data:image/png;base64,${buf.toString("base64")}`;
  }
  return headshotDataUri;
}

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = truncate(searchParams.get("title") || "PromptAtWork", 90);
  const variantKey = (searchParams.get("variant") as OgVariant) || "blog";
  const v = VARIANTS[variantKey] ?? VARIANTS.blog;
  // Longer titles need a smaller size to avoid awkward mid-word wraps
  // against the fixed-width text column.
  const titleFontSize = title.length > 55 ? 38 : title.length > 38 ? 44 : 52;

  return new ImageResponse(
    <div style={{ display: "flex", width: "1200px", height: "630px", background: v.bg, position: "relative" }}>
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: v.accent,
          opacity: 0.14,
          top: -140,
          left: 660,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 40px 72px 72px",
          width: 700,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 44 }}>
          <div
            style={{
              display: "flex",
              width: 54,
              height: 54,
              borderRadius: 14,
              background: v.markBg,
              color: v.accent,
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            P/
          </div>
          <div style={{ display: "flex", fontSize: 27, fontWeight: 600, color: v.text }}>PromptAtWork</div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: titleFontSize,
            fontWeight: 700,
            color: v.text,
            lineHeight: 1.2,
            maxWidth: 580,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 23, color: v.sub, marginTop: 32 }}>promptatwork.com</div>
      </div>

      <div
        style={{
          display: "flex",
          position: "absolute",
          right: 64,
          top: 65,
          width: 500,
          height: 500,
          borderRadius: "50%",
          overflow: "hidden",
          border: `6px solid ${v.accent}`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- next/image doesn't work inside ImageResponse */}
        <img src={getHeadshotDataUri()} width={500} height={500} style={{ objectFit: "cover" }} alt="" />
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
