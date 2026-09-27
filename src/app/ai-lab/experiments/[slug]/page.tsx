import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../../../../components/Nav";
import SiteFooter from "../../../../components/SiteFooter";
import ArrowLink from "../../../../components/ui/ArrowLink";
import RelatedContent from "../../../../components/ai-lab/RelatedContent";
import { client } from "../../../../sanity/lib/client";
import { experimentBySlugQuery, experimentSlugsQuery } from "../../../../sanity/lib/queries";
import { buildMetadata } from "../../../../lib/site";

export const revalidate = 60;

type ExperimentDetail = {
  slug: string;
  title: string;
  objective: string;
  problem?: string;
  setup?: string;
  promptOrWorkflow?: string;
  input?: string;
  output?: string;
  whatWorked?: string;
  whatFailed?: string;
  learning?: string;
  useCases?: string[];
  tool?: { slug: string; name: string };
  relatedContent?: { _type: "project" | "tool" | "prompt"; slug: string; title?: string; name?: string }[];
};

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(experimentSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const experiment: ExperimentDetail | null = await client.fetch(experimentBySlugQuery, { slug });
  if (!experiment) return {};
  return buildMetadata({
    title: `${experiment.title} — Experiments — PromptAtWork`,
    description: experiment.objective,
    path: `/ai-lab/experiments/${experiment.slug}`,
    type: "article",
  });
}

function Section({ heading, body }: { heading: string; body?: string }) {
  if (!body) return null;
  return (
    <div className="flex flex-col gap-2.5">
      <h2 className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">{heading.toUpperCase()}</h2>
      <p className="text-[15px] leading-relaxed text-neutral-300 whitespace-pre-wrap">{body}</p>
    </div>
  );
}

export default async function ExperimentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experiment: ExperimentDetail | null = await client.fetch(experimentBySlugQuery, { slug });
  if (!experiment) notFound();

  return (
    <div className="min-h-screen bg-neutral-900">
      <Nav />
      <section className="w-full bg-neutral-900 min-h-screen">
        <div className="max-w-[800px] mx-auto px-5 sm:px-10 pt-16 sm:pt-20 pb-24 sm:pb-28 flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <ArrowLink href="/ai-lab/experiments" theme="dark" size="sm" direction="back">
              Experiments
            </ArrowLink>
            <span className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">EXPERIMENT</span>
            <h1 className="font-display text-3xl sm:text-[42px] font-semibold text-white leading-tight">{experiment.title}</h1>
            <p className="text-[16px] leading-relaxed text-neutral-300 max-w-[600px]">{experiment.objective}</p>
            {experiment.tool && (
              <ArrowLink href={`/ai-lab/tools/${experiment.tool.slug}`} theme="dark" size="sm">
                Used {experiment.tool.name}
              </ArrowLink>
            )}
          </div>

          <div className="flex flex-col gap-8">
            <Section heading="Problem" body={experiment.problem} />
            <Section heading="Setup" body={experiment.setup} />
            <Section heading="Prompt / Workflow" body={experiment.promptOrWorkflow} />
            <Section heading="Input" body={experiment.input} />
            <Section heading="Output" body={experiment.output} />

            {(experiment.whatWorked || experiment.whatFailed) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {experiment.whatWorked && (
                  <div className="flex flex-col gap-2.5">
                    <h2 className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">WHAT WORKED</h2>
                    <p className="text-[15px] leading-relaxed text-neutral-300">{experiment.whatWorked}</p>
                  </div>
                )}
                {experiment.whatFailed && (
                  <div className="flex flex-col gap-2.5">
                    <h2 className="font-mono text-xs tracking-wide text-neutral-400 font-semibold">WHAT FAILED</h2>
                    <p className="text-[15px] leading-relaxed text-neutral-300">{experiment.whatFailed}</p>
                  </div>
                )}
              </div>
            )}

            <Section heading="Learning" body={experiment.learning} />

            {experiment.useCases && experiment.useCases.length > 0 && (
              <div className="flex flex-col gap-2.5">
                <h2 className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">USE CASES</h2>
                <ul className="flex flex-col gap-1.5">
                  {experiment.useCases.map((u) => (
                    <li key={u} className="flex items-start text-sm text-neutral-300">
                      <span className="text-cyan-500 mr-2 mt-0.5">▸</span>
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <RelatedContent items={experiment.relatedContent} />
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
