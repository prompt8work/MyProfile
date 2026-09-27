import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../../../../components/Nav";
import SiteFooter from "../../../../components/SiteFooter";
import ArrowLink from "../../../../components/ui/ArrowLink";
import RelatedContent from "../../../../components/ai-lab/RelatedContent";
import JsonLd from "../../../../components/JsonLd";
import { client } from "../../../../sanity/lib/client";
import { toolBySlugQuery, toolSlugsQuery } from "../../../../sanity/lib/queries";
import { buildMetadata } from "../../../../lib/site";

export const revalidate = 60;

type ToolResource = {
  title: string;
  resourceType: string;
  description?: string;
  version?: string;
  publishedAt?: string;
  updatedAt?: string;
  fileUrl?: string;
  fileName?: string;
};

type ToolDetail = {
  slug: string;
  name: string;
  type?: string;
  category?: string;
  tags?: string[];
  description: string;
  officialUrl?: string;
  pricing?: string;
  overview?: string;
  whatItDoes?: string;
  whyExplored?: string;
  researchContent?: string;
  useCases?: string[];
  practicalScenarios?: string;
  strengths?: string[];
  limitations?: string[];
  myExperience?: string;
  researchStatus?: string;
  lastUpdated?: string;
  reviewedVersion?: string;
  lastReviewed?: string;
  sources?: { label: string; url: string }[];
  relatedVideos?: { slug: string; title: string; thumbnailUrl?: string; externalUrl: string }[];
  resources?: ToolResource[];
  relatedContent?: { _type: "project" | "tool" | "prompt" | "experiment" | "automation" | "blog"; slug: string; title?: string; name?: string }[];
  relatedExperiments?: { slug: string; title: string; objective?: string }[];
  relatedBlogs?: { slug: string; title: string; excerpt?: string }[];
};

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(toolSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool: ToolDetail | null = await client.fetch(toolBySlugQuery, { slug });
  if (!tool) return {};
  return buildMetadata({
    title: `${tool.name} — Tools & Research — PromptAtWork`,
    description: tool.description,
    path: `/ai-lab/tools/${tool.slug}`,
    type: "article",
  });
}

function Section({ id, heading, body }: { id?: string; heading: string; body?: string }) {
  if (!body) return null;
  return (
    <div id={id} className="flex flex-col gap-2.5 scroll-mt-24">
      <h2 className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">{heading.toUpperCase()}</h2>
      <p className="text-[15px] leading-relaxed text-neutral-300 whitespace-pre-wrap">{body}</p>
    </div>
  );
}

function ListSection({ id, heading, items, marker }: { id?: string; heading: string; items?: string[]; marker: string }) {
  if (!items || items.length === 0) return null;
  return (
    <div id={id} className="flex flex-col gap-2.5 scroll-mt-24">
      <h2 className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">{heading.toUpperCase()}</h2>
      <ul className="flex flex-col gap-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start text-sm text-neutral-300">
            <span className="text-cyan-500 mr-2 mt-0.5">{marker}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool: ToolDetail | null = await client.fetch(toolBySlugQuery, { slug });
  if (!tool) notFound();

  const toc = [
    tool.overview && { id: "overview", label: "Overview" },
    tool.researchContent && { id: "research", label: "Research" },
    tool.useCases?.length && { id: "best-use-cases", label: "Best Use Cases" },
    tool.limitations?.length && { id: "limitations", label: "Less-Suitable Scenarios" },
    tool.practicalScenarios && { id: "practical-scenarios", label: "Practical Scenarios" },
    tool.relatedVideos?.length && { id: "videos", label: "Videos" },
    tool.resources?.length && { id: "resources", label: "Learning Resources" },
    tool.relatedExperiments?.length && { id: "experiments", label: "Related Experiments" },
    (tool.relatedBlogs?.length || tool.relatedContent?.length) && { id: "related", label: "Related Content" },
  ].filter(Boolean) as { id: string; label: string }[];

  const techArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${tool.name} — Research & Review`,
    description: tool.description,
    ...(tool.lastUpdated ? { dateModified: tool.lastUpdated } : {}),
    author: { "@type": "Person", name: "Niharika Dhande" },
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <JsonLd data={techArticleJsonLd} />
      <Nav />
      <section className="w-full bg-neutral-900 min-h-screen">
        <div className="max-w-[800px] mx-auto px-5 sm:px-10 pt-16 sm:pt-20 pb-24 sm:pb-28 flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <ArrowLink href="/ai-lab/tools" theme="dark" size="sm" direction="back">
              Tools & Research
            </ArrowLink>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">
                {tool.category?.toUpperCase()}
              </span>
              {tool.type && tool.type !== "Tool" && (
                <span className="font-mono text-[10px] text-neutral-400 border border-neutral-700 rounded-full px-2 py-0.5">
                  {tool.type}
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl sm:text-[42px] font-semibold text-white leading-tight">{tool.name}</h1>
            <p className="text-[16px] leading-relaxed text-neutral-300 max-w-[600px]">{tool.description}</p>

            <div className="flex gap-4 flex-wrap items-center">
              {tool.officialUrl && (
                <a
                  href={tool.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-500 hover:text-cyan-400 text-sm font-semibold"
                >
                  Official Site ↗
                </a>
              )}
              {tool.pricing && <span className="text-sm text-neutral-400">{tool.pricing}</span>}
            </div>

            {tool.tags && tool.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((t) => (
                  <span key={t} className="font-mono text-[10.5px] bg-neutral-800 text-neutral-300 px-2.5 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {(tool.lastUpdated || tool.reviewedVersion || tool.lastReviewed) && (
              <div className="flex gap-4 flex-wrap text-xs text-neutral-400">
                {tool.lastUpdated && (
                  <span>
                    Last updated{" "}
                    {new Date(tool.lastUpdated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                )}
                {tool.reviewedVersion && <span>Reviewed version: {tool.reviewedVersion}</span>}
                {tool.lastReviewed && <span>Last reviewed: {tool.lastReviewed}</span>}
              </div>
            )}
          </div>

          {toc.length > 2 && (
            <nav className="flex flex-wrap gap-x-5 gap-y-2 py-4 border-y border-neutral-800">
              {toc.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="text-xs text-neutral-400 hover:text-cyan-500 transition-colors">
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          <div className="flex flex-col gap-8">
            <Section id="overview" heading="Overview" body={tool.overview} />
            <Section heading="What It Does" body={tool.whatItDoes} />
            <Section heading="Why I Explored It" body={tool.whyExplored} />
            <Section id="research" heading="Research" body={tool.researchContent} />

            <ListSection id="best-use-cases" heading="Best Use Cases" items={tool.useCases} marker="▸" />
            <ListSection id="limitations" heading="Limitations & Less-Suitable Scenarios" items={tool.limitations} marker="−" />
            <Section id="practical-scenarios" heading="Practical Scenarios" body={tool.practicalScenarios} />
            <Section heading="My Experience" body={tool.myExperience} />
            <ListSection heading="Strengths" items={tool.strengths} marker="+" />

            {tool.relatedVideos && tool.relatedVideos.length > 0 && (
              <div id="videos" className="flex flex-col gap-2.5 scroll-mt-24">
                <h2 className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">VIDEOS</h2>
                <div className="flex flex-col gap-1.5">
                  {tool.relatedVideos.map((v) => (
                    <a
                      key={v.slug}
                      href={v.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-[13.5px] text-cyan-500 hover:text-cyan-400"
                    >
                      ▶ {v.title}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {tool.resources && tool.resources.length > 0 && (
              <div id="resources" className="flex flex-col gap-2.5 scroll-mt-24">
                <h2 className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">LEARNING RESOURCES</h2>
                <div className="flex flex-col gap-2">
                  {tool.resources.map((r) => (
                    <div key={r.title} className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-[10px] text-cyan-500 tracking-wide">{r.resourceType.toUpperCase()}</span>
                        <span className="text-sm font-semibold text-white">{r.title}</span>
                        {r.description && <span className="text-xs text-neutral-400">{r.description}</span>}
                      </div>
                      {r.fileUrl && (
                        <a
                          href={r.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-cyan-500 hover:text-cyan-400 font-semibold whitespace-nowrap"
                        >
                          Download →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tool.relatedExperiments && tool.relatedExperiments.length > 0 && (
              <div id="experiments" className="flex flex-col gap-2.5 scroll-mt-24">
                <h2 className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">RELATED EXPERIMENTS</h2>
                <div className="flex flex-col gap-1.5">
                  {tool.relatedExperiments.map((e) => (
                    <ArrowLink key={e.slug} href={`/ai-lab/experiments/${e.slug}`} theme="dark" size="sm">
                      {e.title}
                    </ArrowLink>
                  ))}
                </div>
              </div>
            )}

            {tool.relatedBlogs && tool.relatedBlogs.length > 0 && (
              <div className="flex flex-col gap-2.5">
                <h2 className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">RELATED BLOG POSTS</h2>
                <div className="flex flex-col gap-1.5">
                  {tool.relatedBlogs.map((b) => (
                    <ArrowLink key={b.slug} href={`/blog/${b.slug}`} theme="dark" size="sm">
                      {b.title}
                    </ArrowLink>
                  ))}
                </div>
              </div>
            )}

            {tool.sources && tool.sources.length > 0 && (
              <div className="flex flex-col gap-2.5">
                <h2 className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">SOURCES</h2>
                <div className="flex flex-col gap-1.5">
                  {tool.sources.map((s) => (
                    <a
                      key={s.url}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13.5px] text-neutral-400 hover:text-cyan-500 transition-colors"
                    >
                      {s.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div id="related">
              <RelatedContent items={tool.relatedContent} theme="dark" />
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
