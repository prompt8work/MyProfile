import type { Metadata } from "next";
import { client } from "../../sanity/lib/client";
import { projectsQuery } from "../../sanity/lib/queries";
import Nav from "../../components/Nav";
import SiteFooter from "../../components/SiteFooter";
import SectionHeading from "../../components/ui/SectionHeading";
import ProjectCard, { type ProjectCardData } from "../../components/ui/ProjectCard";
import { buildMetadata } from "../../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Projects & Case Studies — PromptAtWork",
  description: "AI solution engineering projects: workflow automation, RAG, AI-assisted development and AI creative work.",
  path: "/projects",
});

// Interim revalidation strategy until the Sanity webhook is wired up.
export const revalidate = 60;

// `visibility != "private"` is already filtered in the query itself
// (see queries.ts) — defense-in-depth, not just a UI-level hide.
export default async function ProjectsPage() {
  const publicProjects: ProjectCardData[] = await client.fetch(projectsQuery);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Nav />
      <section className="w-full">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-16 sm:pt-20 pb-24 sm:pb-28">
          <SectionHeading
            eyebrow="WORK"
            title="Projects & Case Studies"
            description="AI solution engineering across automation, retrieval, AI-assisted development and creative tooling."
            align="start"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publicProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
