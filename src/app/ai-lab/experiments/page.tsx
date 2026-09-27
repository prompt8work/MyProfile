import type { Metadata } from "next";
import Nav from "../../../components/Nav";
import SiteFooter from "../../../components/SiteFooter";
import ArrowLink from "../../../components/ui/ArrowLink";
import { client } from "../../../sanity/lib/client";
import { experimentsQuery } from "../../../sanity/lib/queries";
import { buildMetadata } from "../../../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Experiments — PromptAtWork",
  description: "Objective, setup, what worked, what failed, what was learned.",
  path: "/ai-lab/experiments",
});

export const revalidate = 60;

type ExperimentListItem = {
  slug: string;
  title: string;
  objective: string;
  toolName?: string;
};

export default async function ExperimentsPage() {
  const experiments: ExperimentListItem[] = await client.fetch(experimentsQuery);

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
            <span className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">AI LAB / EXPERIMENTS</span>
            <h1 className="font-display text-3xl sm:text-[42px] font-semibold text-white">Experiments</h1>
            <p className="text-[15px] leading-relaxed text-neutral-300">
              Objective → setup → what worked, what failed, what was learned — documented as I build, not written up
              after the fact.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {experiments.map((e) => (
              <div key={e.slug} className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6 flex flex-col gap-3">
                {e.toolName && (
                  <span className="font-mono text-[10.5px] text-cyan-500 tracking-wide self-start">
                    {e.toolName.toUpperCase()}
                  </span>
                )}
                <h2 className="font-display text-lg font-semibold text-white">{e.title}</h2>
                <p className="text-sm text-neutral-300 leading-relaxed">{e.objective}</p>
                <div className="mt-1">
                  <ArrowLink href={`/ai-lab/experiments/${e.slug}`} theme="dark" size="sm">
                    View Details
                  </ArrowLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
