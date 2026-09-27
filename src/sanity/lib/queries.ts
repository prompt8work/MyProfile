import { groq } from "next-sanity";

// Shared projection for mixed-type relatedContent arrays (project | tool |
// prompt | experiment | automation) — `_type` lets the rendering component
// pick the right href/label per item without a second query. Declared
// first since several queries below reference it.
const relatedContentProjection = groq`
  relatedContent[]->{ _type, "slug": slug.current, title, name, category }
`;

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
    "coverImage": coverImage.asset->url,
    ${relatedContentProjection}
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
// document rather than requiring a known _id. Feeds both the /resume page
// and the generated PDF (/resume/download) — see src/lib/resume.ts.
export const resumeQuery = groq`
  *[_type == "resume"][0] {
    name, title, email, phone, location, linkedin,
    summary,
    "skills": skills[]{ category, "items": coalesce(items, []) },
    "roles": roles[]{ role, company, location, startDate, endDate, "highlights": coalesce(highlights, []) },
    earlierRolesHeading,
    "projects": projects[]{
      name, badge, techLabel,
      "tech": coalesce(tech, []),
      "points": coalesce(points, []),
      "description": coalesce(description, [])
    },
    "certifications": coalesce(certifications, []),
    "education": coalesce(education, []),
    "teaching": coalesce(teaching, []),
    "heroStats": coalesce(heroStats, []),
    "numbers": coalesce(numbers, []),
    updatedAt
  }
`;

// "!defined(researchStatus) || researchStatus == 'Published'" keeps the 4
// already-seeded tools (created before this field existed) visible without
// a data migration — PRD 04.1 §19 says the public site should normally
// show only Published, but that can't retroactively hide content that
// predates the field.
const publishedToolFilter = `_type == "tool" && (!defined(researchStatus) || researchStatus == "Published")`;

export const toolsQuery = groq`
  *[${publishedToolFilter}] | order(name asc) {
    "slug": slug.current,
    name,
    type,
    category,
    tags,
    description,
    officialUrl,
    pricing,
    "logo": logo.asset->url,
    "hasResearch": defined(researchContent),
    "videoCount": count(relatedVideos),
    "resourceCount": count(resources)
  }
`;

export const toolBySlugQuery = groq`
  *[${publishedToolFilter} && slug.current == $slug][0] {
    "slug": slug.current,
    name,
    type,
    category,
    tags,
    description,
    officialUrl,
    pricing,
    overview,
    whatItDoes,
    whyExplored,
    researchContent,
    useCases,
    practicalScenarios,
    strengths,
    limitations,
    myExperience,
    researchStatus,
    lastUpdated,
    reviewedVersion,
    lastReviewed,
    sources,
    "logo": logo.asset->url,
    "relatedVideos": relatedVideos[]->{ "slug": slug.current, title, thumbnailUrl, externalUrl },
    "resources": resources[]{ title, resourceType, description, version, publishedAt, updatedAt, "fileUrl": file.asset->url, "fileName": file.asset->originalFilename },
    ${relatedContentProjection},
    "relatedExperiments": *[_type == "experiment" && references(^._id)]{ "slug": slug.current, title, objective },
    "relatedBlogs": *[_type == "blog" && references(^._id) && publishedAt <= now()]{ "slug": slug.current, title, excerpt }
  }
`;

export const toolSlugsQuery = groq`*[${publishedToolFilter}].slug.current`;

export const promptsQuery = groq`
  *[_type == "prompt"] | order(category asc, title asc) {
    "slug": slug.current,
    title,
    category,
    purpose,
    "toolName": tool->name
  }
`;

export const promptBySlugQuery = groq`
  *[_type == "prompt" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    category,
    purpose,
    prompt,
    variables,
    exampleInput,
    exampleOutput,
    tips,
    "tool": tool->{ "slug": slug.current, name },
    ${relatedContentProjection}
  }
`;

export const promptSlugsQuery = groq`*[_type == "prompt"].slug.current`;

export const experimentsQuery = groq`
  *[_type == "experiment"] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    objective,
    "toolName": tool->name
  }
`;

export const experimentBySlugQuery = groq`
  *[_type == "experiment" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    objective,
    problem,
    setup,
    promptOrWorkflow,
    input,
    output,
    whatWorked,
    whatFailed,
    learning,
    useCases,
    "tool": tool->{ "slug": slug.current, name },
    ${relatedContentProjection}
  }
`;

export const experimentSlugsQuery = groq`*[_type == "experiment"].slug.current`;

export const automationsQuery = groq`
  *[_type == "automation"] | order(title asc) {
    "slug": slug.current,
    title,
    description,
    trigger
  }
`;

export const automationBySlugQuery = groq`
  *[_type == "automation" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    description,
    problem,
    trigger,
    steps,
    architecture,
    input,
    output,
    limitations,
    securityNotes,
    "tools": tools[]->{ "slug": slug.current, name },
    ${relatedContentProjection}
  }
`;

export const automationSlugsQuery = groq`*[_type == "automation"].slug.current`;

export const blogPostsQuery = groq`
  *[_type == "blog" && publishedAt <= now()] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    excerpt,
    category,
    tags,
    author,
    readingTime,
    publishedAt,
    "coverImage": coverImage.asset->url
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blog" && slug.current == $slug && publishedAt <= now()][0] {
    "slug": slug.current,
    title,
    excerpt,
    body,
    category,
    tags,
    author,
    readingTime,
    publishedAt,
    seoTitle,
    seoDescription,
    "coverImage": coverImage.asset->url,
    ${relatedContentProjection}
  }
`;

export const blogSlugsQuery = groq`*[_type == "blog" && publishedAt <= now()].slug.current`;

export const videosQuery = groq`
  *[_type == "video"] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    thumbnailUrl,
    description,
    publishedAt,
    playlist,
    externalUrl,
    externalId
  }
`;

export const trainingsQuery = groq`
  *[_type == "training" && registrationEnabled == true] | order(title asc) {
    "slug": slug.current,
    title,
    description,
    duration,
    mode,
    audience
  }
`;

export const trainingBySlugQuery = groq`
  *[_type == "training" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    description,
    learningOutcomes,
    topics,
    audience,
    duration,
    mode,
    instructor,
    registrationEnabled,
    testimonials,
    ${relatedContentProjection}
  }
`;

export const trainingSlugsQuery = groq`*[_type == "training" && registrationEnabled == true].slug.current`;
