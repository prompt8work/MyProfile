import type { Metadata } from "next";
import CoverLetterContent from "../../components/CoverLetterContent";
import { buildMetadata } from "../../lib/site";

// A Server Component wrapper solely so this route can export `metadata` —
// Next.js doesn't allow that export from a Client Component, which is why
// this page had none at all before (a real gap, not a stylistic choice).
// All the actual interactive content (the print button) lives in
// CoverLetterContent, which stays a Client Component.
export const metadata: Metadata = buildMetadata({
  title: "Cover Letter — PromptAtWork",
  description: "Cover letter of Niharika Dhande, AI Solution Engineer.",
  path: "/cover-letter",
});

export default function CoverLetterPage() {
  return <CoverLetterContent />;
}
