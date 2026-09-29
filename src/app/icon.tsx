import { ImageResponse } from "next/og";

// Favicon, generated to match the real "P/" mark already live in Nav.tsx
// and SiteFooter.tsx exactly (same colors, same shape) — reusing the
// site's actual established brand identity rather than introducing a new
// mark, per the master content doc's design-preserving rule.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: 32,
        height: 32,
        borderRadius: 8,
        background: "#1e1b17",
        color: "#0fb4c4",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 15,
        fontWeight: 700,
      }}
    >
      P/
    </div>,
    { ...size },
  );
}
