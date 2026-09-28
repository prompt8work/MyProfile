import { NextRequest } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { getResume, pdfFilename } from "../../../lib/resume";
import { ResumePdf } from "../../../lib/resume-pdf";

// Generates the downloadable resume PDF from the Sanity Resume document —
// the same data the /resume page renders, so the two always match.
// Same revalidation window as the page: a Sanity edit shows up in both
// within a minute.
export const revalidate = 60;

// Interim access control (Phase 9 — see Docs/development-plan/09-v2-data-recuration.md):
// the /resume page itself stays public, but the PDF is not — only reachable
// with a matching ?token= until Phase 10's real admin login replaces this.
// 404 (not 401/403) on a missing/mismatched token so the route's existence
// isn't revealed to anyone probing it.
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const expected = process.env.RESUME_DOWNLOAD_TOKEN;
  if (!expected || token !== expected) {
    return new Response("Not found", { status: 404 });
  }

  const resume = await getResume();
  const pdf = await renderToBuffer(ResumePdf({ resume }));

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${pdfFilename(resume)}"`,
    },
  });
}
