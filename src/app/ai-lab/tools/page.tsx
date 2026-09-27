import type { Metadata } from "next";
import Nav from "../../../components/Nav";
import SiteFooter from "../../../components/SiteFooter";
import ArrowLink from "../../../components/ui/ArrowLink";
import ToolsFilterGrid, { type ToolListItem } from "../../../components/ai-lab/ToolsFilterGrid";
import { client } from "../../../sanity/lib/client";
import { toolsQuery } from "../../../sanity/lib/queries";
import { buildMetadata } from "../../../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Tools & Research — PromptAtWork",
  description: "AI tools, features, concepts and platforms researched hands-on — reviews, practical use cases and learning resources.",
  path: "/ai-lab/tools",
});

export const revalidate = 60;

export default async function ToolsPage() {
  const tools: ToolListItem[] = await client.fetch(toolsQuery);

  return (
    <div className="min-h-screen bg-neutral-900">
      <Nav />
      <section className="w-full bg-neutral-900 min-h-screen">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-16 sm:pt-20 pb-24 sm:pb-28">
          <div className="flex flex-col gap-4 mb-4">
            <ArrowLink href="/ai-lab" theme="dark" size="sm" direction="back">
              AI Lab
            </ArrowLink>
          </div>
          <div className="flex flex-col gap-4 max-w-[640px] mb-14">
            <span className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">AI LAB / TOOLS & RESEARCH</span>
            <h1 className="font-display text-3xl sm:text-[42px] font-semibold text-white">Tools & Research</h1>
            <p className="text-[15px] leading-relaxed text-neutral-300">
              Complete research, practical use cases, tutorials and learning resources for AI tools, features and
              concepts explored hands-on — not a generic feature comparison.
            </p>
          </div>

          <ToolsFilterGrid tools={tools} />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
