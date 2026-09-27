import { client } from "../sanity/lib/client";
import { resumeQuery } from "../sanity/lib/queries";

// One loader for both consumers of the Sanity Resume document: the /resume
// web page and the generated PDF (/resume/download). Keeping the fetch and
// the derived fields here means the two can never drift apart.

export type Metric = { value: string; label: string };

export type ResumeRole = {
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
};

export type ResumeProject = {
  name: string;
  badge?: string;
  techLabel?: string;
  tech: string[];
  points: string[];
  description: string[];
};

export type Resume = {
  name: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  summary: string[];
  skills: { category: string; items: string[] }[];
  roles: ResumeRole[];
  earlierRolesHeading?: string;
  projects: ResumeProject[];
  certifications: { name: string; issuer?: string; credentialId?: string; date?: string }[];
  education: { degree: string; institution?: string; year?: string }[];
  teaching: { title: string; description?: string }[];
  heroStats: Metric[];
  numbers: Metric[];
  updatedAt?: string;
};

export const RESUME_PDF_PATH = "/resume/download";

export async function getResume(): Promise<Resume> {
  const raw = await client.fetch(resumeQuery);
  if (!raw) throw new Error("No Resume document found in Sanity");

  return {
    ...raw,
    // Older documents stored summary as a single text block.
    summary: typeof raw.summary === "string" ? raw.summary.split(/\n\s*\n/) : (raw.summary ?? []),
    skills: raw.skills ?? [],
    roles: raw.roles ?? [],
    projects: raw.projects ?? [],
  };
}

/** Roles with highlights get full entries; the rest form the compact "earlier" list. */
export function splitRoles(roles: ResumeRole[]) {
  return {
    featured: roles.filter((r) => r.highlights.length > 0),
    earlier: roles.filter((r) => r.highlights.length === 0),
  };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatMonthYear(iso: string): string {
  const [year, month] = iso.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

export function formatPeriod(startDate: string, endDate?: string): string {
  return `${formatMonthYear(startDate)} – ${endDate ? formatMonthYear(endDate) : "Present"}`;
}

/** "Scrum Alliance · ID 1894098-csm" style detail lines. */
export function educationLines(resume: Resume): { title: string; detail?: string }[] {
  const join = (...parts: (string | undefined)[]) => parts.filter(Boolean).join(" · ") || undefined;
  return [
    ...resume.certifications.map((c) => ({
      title: c.name,
      detail: join(c.issuer, c.credentialId ? `ID ${c.credentialId}` : undefined, c.date),
    })),
    ...resume.education.map((e) => ({ title: e.degree, detail: join(e.institution, e.year) })),
  ];
}

export function pdfFilename(resume: Resume): string {
  return `${resume.name.trim().replace(/\s+/g, "-")}-Resume.pdf`;
}
