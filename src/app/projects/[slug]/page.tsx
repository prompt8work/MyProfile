import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "../../../sanity/lib/client";
import { projectBySlugQuery, projectSlugsQuery } from "../../../sanity/lib/queries";
import Nav from "../../../components/Nav";
import SiteFooter from "../../../components/SiteFooter";
import Tag from "../../../components/ui/Tag";
import ArrowLink from "../../../components/ui/ArrowLink";
import RelatedContent from "../../../components/ai-lab/RelatedContent";
import { buildMetadata } from "../../../lib/site";

type ProjectDetail = {
  slug: string;
  title: string;
  category: string;
  visibility: "public" | "generalized" | "private";
  confidentialityNote?: string;
  summary: string;
  stats?: string[];
  tech: string[];
  aiModels?: string[];
  overview: string;
  problem: string;
  context: string;
  solution: string;
  role: string;
  architecture: string;
  workflow: string;
  challenges: string;
  results: string;
  learnings: string;
  relatedContent?: {
    _type: "project" | "tool" | "prompt" | "experiment" | "automation";
    slug: string;
    title?: string;
    name?: string;
  }[];
};

// Interim revalidation strategy until the Sanity webhook is wired up.
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(projectSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project: ProjectDetail | null = await client.fetch(projectBySlugQuery, { slug });
  if (!project) return {};
  return buildMetadata({
    title: `${project.title} — PromptAtWork`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    type: "article",
  });
}

function Section({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="flex flex-col gap-2.5">
      <h2 className="font-mono text-xs tracking-wide text-plum-600 font-semibold">{heading.toUpperCase()}</h2>
      <p className="text-[15px] leading-relaxed text-neutral-700">{body}</p>
    </div>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // "visibility != private" is filtered in the query itself (queries.ts) —
  // a guessed slug for a private project returns null here, not the doc.
  const project: ProjectDetail | null = await client.fetch(projectBySlugQuery, { slug });
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-neutral-50">
      <Nav />

      <section className="w-full bg-neutral-900">
        <div className="max-w-[900px] mx-auto px-5 sm:px-10 pt-16 sm:pt-20 pb-14 flex flex-col gap-5">
          <ArrowLink href="/projects" theme="dark" size="sm" direction="back">
            All Projects
          </ArrowLink>
          <span className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">{project.category}</span>
          <h1 className="font-display text-3xl sm:text-[42px] font-semibold text-white leading-tight">{project.title}</h1>
          <p className="text-[16px] leading-relaxed text-neutral-300 max-w-[640px]">{project.summary}</p>

          {project.stats && (
            <div className="flex gap-5 flex-wrap mt-1">
              {project.stats.map((s) => (
                <span key={s} className="font-mono text-[13px] text-cyan-500 font-semibold">
                  {s}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-1">
            {project.tech.map((t) => (
              <span key={t} className="font-mono text-[11px] bg-neutral-800 text-neutral-300 px-2.5 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="max-w-[900px] mx-auto px-5 sm:px-10 py-16 sm:py-20 flex flex-col gap-10">
          <Section heading="Overview" body={project.overview} />
          <Section heading="Problem" body={project.problem} />
          <Section heading="Context" body={project.context} />
          <Section heading="Solution" body={project.solution} />
          <Section heading="My Role" body={project.role} />
          <Section heading="Architecture" body={project.architecture} />
          <Section heading="Workflow" body={project.workflow} />

          {project.aiModels && (
            <div className="flex flex-col gap-2.5">
              <h2 className="font-mono text-xs tracking-wide text-plum-600 font-semibold">AI MODELS</h2>
              <div className="flex flex-wrap gap-2">
                {project.aiModels.map((m) => (
                  <Tag key={m} variant="cyan">
                    {m}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          <Section heading="Challenges" body={project.challenges} />
          <Section heading="Results" body={project.results} />
          <Section heading="Learnings" body={project.learnings} />

          {project.confidentialityNote && (
            <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-5">
              <p className="text-[13px] text-neutral-600 leading-relaxed">
                <span className="font-semibold text-neutral-800">Confidentiality note: </span>
                {project.confidentialityNote}
              </p>
            </div>
          )}

          <RelatedContent items={project.relatedContent} theme="light" />

          <div className="pt-4 border-t border-neutral-200">
            <ArrowLink href="/projects">Back to all projects</ArrowLink>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
