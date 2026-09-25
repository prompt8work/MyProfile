import { client } from "../../sanity/lib/client";
import { projectsQuery } from "../../sanity/lib/queries";
import SectionHeading from "../ui/SectionHeading";
import ArrowLink from "../ui/ArrowLink";
import ProjectCard, { type ProjectCardData } from "../ui/ProjectCard";

export default async function SelectedWork() {
  const publicProjects: ProjectCardData[] = await client.fetch(projectsQuery);

  return (
    <section id="work" className="w-full bg-neutral-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 py-24 sm:py-28">
        <SectionHeading
          eyebrow="SELECTED WORK"
          title="Projects & Case Studies"
          action={<ArrowLink href="/projects">View All Projects</ArrowLink>}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publicProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
