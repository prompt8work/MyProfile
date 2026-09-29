import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTransition from "../../../../components/PageTransition";
import DocsArticle from "../../../../components/docs/DocsArticle";
import DocsHeader, { DocsTag } from "../../../../components/docs/DocsHeader";
import ArrowLink from "../../../../components/ui/ArrowLink";
import ContentSection, { BlockLabel } from "../../../../components/ui/ContentSection";
import Reveal from "../../../../components/motion/Reveal";
import { Timeline, TimelineItem } from "../../../../components/motion/Timeline";
import RelatedContent, { type RelatedItem } from "../../../../components/ai-lab/RelatedContent";
import JsonLd from "../../../../components/JsonLd";
import { client } from "../../../../sanity/lib/client";
import { automationBySlugQuery, automationSlugsQuery } from "../../../../sanity/lib/queries";
import { buildBreadcrumbJsonLd, buildMetadata } from "../../../../lib/site";

export const revalidate = 60;

type AutomationDetail = {
  slug: string;
  title: string;
  category?: string;
  description: string;
  problem?: string;
  trigger?: string;
  steps?: { label: string; description?: string }[];
  architecture?: string;
  input?: string;
  output?: string;
  integrations?: string[];
  limitations?: string;
  securityNotes?: string;
  learnings?: string;
  tools?: { slug: string; name: string }[];
  relatedContent?: RelatedItem[];
};

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(automationSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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

export default async function AutomationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const automation: AutomationDetail | null = await client.fetch(automationBySlugQuery, { slug });
  if (!automation) notFound();

  return (
    <PageTransition key={slug}>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "AI Lab", path: "/ai-lab" },
          { name: "Automations", path: "/ai-lab/automations" },
          { name: automation.title, path: `/ai-lab/automations/${automation.slug}` },
        ])}
      />
      <DocsArticle>
        <DocsHeader
          eyebrow={["Automation", automation.category].filter(Boolean).join(" / ")}
          title={automation.title}
          description={automation.description}
        >
          {automation.tools && automation.tools.length > 0 && (
            <div className="flex gap-4 flex-wrap">
              {automation.tools.map((t) => (
                <ArrowLink key={t.slug} href={`/ai-lab/tools/${t.slug}`} size="sm">
                  {t.name}
                </ArrowLink>
              ))}
            </div>
          )}
        </DocsHeader>

        <div className="flex flex-col gap-10">
          {automation.steps && automation.steps.length > 0 && (
            <div className="flex flex-col gap-5">
              <Reveal>
                <BlockLabel>Workflow</BlockLabel>
              </Reveal>
              <Timeline markers="number">
                {automation.steps.map((step, i) => (
                  <TimelineItem key={`${step.label}-${i}`} title={step.label}>
                    {step.description && <p className="text-sm text-neutral-600 leading-relaxed">{step.description}</p>}
                  </TimelineItem>
                ))}
              </Timeline>
            </div>
          )}

          <ContentSection heading="Problem" body={automation.problem} />
          <ContentSection heading="Architecture" body={automation.architecture} />
          <ContentSection heading="Input" body={automation.input} />
          <ContentSection heading="Output" body={automation.output} />

          {automation.integrations && automation.integrations.length > 0 && (
            <Reveal className="flex flex-col gap-3">
              <BlockLabel>Integrations</BlockLabel>
              <div className="flex flex-wrap gap-1.5">
                {automation.integrations.map((i) => (
                  <DocsTag key={i}>{i}</DocsTag>
                ))}
              </div>
            </Reveal>
          )}

          <ContentSection heading="Limitations" body={automation.limitations} />
          <ContentSection heading="Security Notes" body={automation.securityNotes} />
          <ContentSection heading="Learnings" body={automation.learnings} />

          <RelatedContent items={automation.relatedContent} />
        </div>
      </DocsArticle>
    </PageTransition>
  );
}
