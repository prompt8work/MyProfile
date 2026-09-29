import { ImageResponse } from "next/og";

// iOS home-screen icon — same mark as icon.tsx, larger and with more
// interior padding since iOS applies its own rounded-corner mask on top.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: 180,
        height: 180,
        background: "#1e1b17",
        color: "#0fb4c4",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 76,
        fontWeight: 700,
      }}
    >
      P/
    </div>,
    { ...size },
  );
}
