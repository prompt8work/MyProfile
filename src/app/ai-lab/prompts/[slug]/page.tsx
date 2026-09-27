import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../../../../components/Nav";
import SiteFooter from "../../../../components/SiteFooter";
import ArrowLink from "../../../../components/ui/ArrowLink";
import CopyPromptButton from "../../../../components/ai-lab/CopyPromptButton";
import RelatedContent from "../../../../components/ai-lab/RelatedContent";
import { client } from "../../../../sanity/lib/client";
import { promptBySlugQuery, promptSlugsQuery } from "../../../../sanity/lib/queries";
import { buildMetadata } from "../../../../lib/site";

export const revalidate = 60;

type PromptDetail = {
  slug: string;
  title: string;
  category: string;
  purpose?: string;
  prompt: string;
  variables?: string[];
  exampleInput?: string;
  exampleOutput?: string;
  tips?: string;
  tool?: { slug: string; name: string };
  relatedContent?: { _type: "project" | "tool" | "prompt"; slug: string; title?: string; name?: string }[];
};

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(promptSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const prompt: PromptDetail | null = await client.fetch(promptBySlugQuery, { slug });
  if (!prompt) return {};
  return buildMetadata({
    title: `${prompt.title} — Prompt Library — PromptAtWork`,
    description: prompt.purpose || prompt.title,
    path: `/ai-lab/prompts/${prompt.slug}`,
    type: "article",
  });
}

export default async function PromptDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prompt: PromptDetail | null = await client.fetch(promptBySlugQuery, { slug });
  if (!prompt) notFound();

  return (
    <div className="min-h-screen bg-neutral-900">
      <Nav />
      <section className="w-full bg-neutral-900 min-h-screen">
        <div className="max-w-[800px] mx-auto px-5 sm:px-10 pt-16 sm:pt-20 pb-24 sm:pb-28 flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <ArrowLink href="/ai-lab/prompts" theme="dark" size="sm" direction="back">
              Prompt Library
            </ArrowLink>
            <span className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">
              {prompt.category?.toUpperCase()}
            </span>
            <h1 className="font-display text-3xl sm:text-[42px] font-semibold text-white leading-tight">{prompt.title}</h1>
            {prompt.purpose && (
              <p className="text-[16px] leading-relaxed text-neutral-300 max-w-[600px]">{prompt.purpose}</p>
            )}
            {prompt.tool && (
              <ArrowLink href={`/ai-lab/tools/${prompt.tool.slug}`} theme="dark" size="sm">
                Used with {prompt.tool.name}
              </ArrowLink>
            )}
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2.5">
              <h2 className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">PROMPT</h2>
              <pre className="whitespace-pre-wrap font-mono text-[13.5px] leading-relaxed text-neutral-200 bg-neutral-800 border border-neutral-700 rounded-xl p-5">
                {prompt.prompt}
              </pre>
              <CopyPromptButton text={prompt.prompt} />
            </div>

            {prompt.variables && prompt.variables.length > 0 && (
              <div className="flex flex-col gap-2.5">
                <h2 className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">VARIABLES</h2>
                <div className="flex flex-wrap gap-2">
                  {prompt.variables.map((v) => (
                    <span
                      key={v}
                      className="font-mono text-xs text-cyan-400 bg-neutral-800 border border-neutral-700 rounded-full px-3 py-1"
                    >
                      {`{{${v}}}`}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {prompt.exampleInput && (
              <div className="flex flex-col gap-2.5">
                <h2 className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">EXAMPLE INPUT</h2>
                <p className="text-[15px] leading-relaxed text-neutral-300 whitespace-pre-wrap">{prompt.exampleInput}</p>
              </div>
            )}

            {prompt.exampleOutput && (
              <div className="flex flex-col gap-2.5">
                <h2 className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">EXAMPLE OUTPUT</h2>
                <p className="text-[15px] leading-relaxed text-neutral-300 whitespace-pre-wrap">{prompt.exampleOutput}</p>
              </div>
            )}

            {prompt.tips && (
              <div className="flex flex-col gap-2.5">
                <h2 className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">TIPS</h2>
                <p className="text-[15px] leading-relaxed text-neutral-300">{prompt.tips}</p>
              </div>
            )}

            <RelatedContent items={prompt.relatedContent} />
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
