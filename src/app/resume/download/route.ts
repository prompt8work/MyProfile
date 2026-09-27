import { renderToBuffer } from "@react-pdf/renderer";
import { getResume, pdfFilename } from "../../../lib/resume";
import { ResumePdf } from "../../../lib/resume-pdf";

// Generates the downloadable resume PDF from the Sanity Resume document —
// the same data the /resume page renders, so the two always match.
// Same revalidation window as the page: a Sanity edit shows up in both
// within a minute.
export const revalidate = 60;

export async function GET() {
  const resume = await getResume();
  const pdf = await renderToBuffer(ResumePdf({ resume }));

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${pdfFilename(resume)}"`,
    },
  });
}
