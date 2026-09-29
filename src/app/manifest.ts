import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PromptAtWork — Niharika Dhande",
    short_name: "PromptAtWork",
    description:
      "A living portfolio of practical AI engineering — built, documented and taught in the open.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f4",
    theme_color: "#1e1b17",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
