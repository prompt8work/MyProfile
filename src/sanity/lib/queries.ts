import { groq } from "next-sanity";

// `visibility != "private"` is enforced in the query itself, not just in
// application code — the same defense-in-depth principle as
// `getProjectBySlug` in data/projects.ts (PRD §22): a private project
// should never even leave the dataset in a public-facing fetch, not just
// be hidden by the page that receives it.

export const projectsQuery = groq`
  *[_type == "project" && visibility != "private"] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    category,
    visibility,
    confidentialityNote,
    summary,
    stats,
    tech,
    aiModels,
    "coverImage": coverImage.asset->url
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && visibility != "private" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    category,
    visibility,
    confidentialityNote,
    summary,
    stats,
    tech,
    aiModels,
    overview,
    problem,
    context,
    solution,
    role,
    architecture,
    workflow,
    challenges,
    results,
    learnings,
    "coverImage": coverImage.asset->url
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && visibility != "private"].slug.current
`;

export const experienceQuery = groq`
  *[_type == "experience"] | order(displayOrder asc) {
    company,
    role,
    location,
    startDate,
    endDate,
    description,
    responsibilities,
    achievements,
    technologies
  }
`;

// Singleton by convention (see resume.ts) — [0] takes the first (only)
// document rather than requiring a known _id.
export const resumeQuery = groq`
  *[_type == "resume"][0] {
    summary,
    skills,
    education,
    certifications,
    achievements,
    interests,
    "resumePdfUrl": resumePdf.asset->url,
    updatedAt,
    "experience": experience[]->{
      company, role, location, startDate, endDate, description, responsibilities, achievements
    }
  }
`;
