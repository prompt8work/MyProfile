import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../../../../components/Nav";
import SiteFooter from "../../../../components/SiteFooter";
import ArrowLink from "../../../../components/ui/ArrowLink";
import RelatedContent from "../../../../components/ai-lab/RelatedContent";
import { client } from "../../../../sanity/lib/client";
import { automationBySlugQuery, automationSlugsQuery } from "../../../../sanity/lib/queries";
import { buildMetadata } from "../../../../lib/site";

export const revalidate = 60;

type AutomationDetail = {
  slug: string;
  title: string;
  description: string;
  problem?: string;
  trigger?: string;
  steps?: { label: string; description?: string }[];
  architecture?: string;
  input?: string;
  output?: string;
  limitations?: string;
  securityNotes?: string;
  tools?: { slug: string; name: string }[];
  relatedContent?: { _type: "project" | "tool" | "prompt"; slug: string; title?: string; name?: string }[];
};

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(automationSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const automation: AutomationDetail | null = await client.fetch(automationBySlugQuery, { slug });
  if (!automation) return {};
  return buildMetadata({
    title: `${automation.title} — Automations — PromptAtWork`,
    description: automation.description,
    path: `/ai-lab/automations/${automation.slug}`,
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

export default async function AutomationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const automation: AutomationDetail | null = await client.fetch(automationBySlugQuery, { slug });
  if (!automation) notFound();

  return (
    <div className="min-h-screen bg-neutral-900">
      <Nav />
      <section className="w-full bg-neutral-900 min-h-screen">
        <div className="max-w-[800px] mx-auto px-5 sm:px-10 pt-16 sm:pt-20 pb-24 sm:pb-28 flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <ArrowLink href="/ai-lab/automations" theme="dark" size="sm" direction="back">
              Automation Gallery
            </ArrowLink>
            <span className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">AUTOMATION</span>
            <h1 className="font-display text-3xl sm:text-[42px] font-semibold text-white leading-tight">{automation.title}</h1>
            <p className="text-[16px] leading-relaxed text-neutral-300 max-w-[600px]">{automation.description}</p>

            {automation.tools && automation.tools.length > 0 && (
              <div className="flex gap-4 flex-wrap">
                {automation.tools.map((t) => (
                  <ArrowLink key={t.slug} href={`/ai-lab/tools/${t.slug}`} theme="dark" size="sm">
                    {t.name}
                  </ArrowLink>
                ))}
              </div>
            )}
          </div>

          {automation.steps && automation.steps.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <h2 className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">WORKFLOW</h2>
              <div className="flex flex-col sm:flex-row sm:items-stretch gap-2 sm:gap-0">
                {automation.steps.map((step, i) => (
                  <div key={`${step.label}-${i}`} className="flex sm:flex-1 items-center">
                    <div className="flex-1 bg-neutral-800 border border-neutral-700 rounded-xl p-4 flex flex-col gap-1">
                      <span className="font-mono text-[10.5px] text-cyan-500 tracking-wide">{step.label.toUpperCase()}</span>
                      {step.description && <p className="text-[13px] text-neutral-300 leading-snug">{step.description}</p>}
                    </div>
                    {i < automation.steps!.length - 1 && (
                      <span className="hidden sm:flex items-center px-2 text-cyan-600 shrink-0">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-8">
            <Section heading="Problem" body={automation.problem} />
            <Section heading="Architecture" body={automation.architecture} />
            <Section heading="Input" body={automation.input} />
            <Section heading="Output" body={automation.output} />
            <Section heading="Limitations" body={automation.limitations} />
            <Section heading="Security Notes" body={automation.securityNotes} />

            <RelatedContent items={automation.relatedContent} />
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
