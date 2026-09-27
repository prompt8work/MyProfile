import type { Metadata } from "next";
import Nav from "../../components/Nav";
import SiteFooter from "../../components/SiteFooter";
import ArrowLink from "../../components/ui/ArrowLink";
import { buildMetadata } from "../../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "AI Lab — PromptAtWork",
  description: "Hands-on exploration of AI tools, prompts, experiments and automations.",
  path: "/ai-lab",
});

const sections = [
  {
    title: "Tools & Research",
    href: "/ai-lab/tools",
    description: "Research, reviews, tutorials, practical use cases and learning resources for AI tools, features and concepts.",
    live: true,
    icon: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z",
  },
  {
    title: "Experiments",
    href: "/ai-lab/experiments",
    description: "Objective → setup → what worked, what failed, what was learned.",
    live: true,
    icon: "M9 3h6l1 4-4 5 4 5-1 4H9l-1-4 4-5-4-5 1-4Z",
  },
  {
    title: "Prompt Library",
    href: "/ai-lab/prompts",
    description: "Categorized, copyable prompts with example input/output.",
    live: true,
    icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  },
  {
    title: "Automations",
    href: "/ai-lab/automations",
    description: "Trigger → input → AI processing → decision → action → output, laid out end to end.",
    live: true,
    icon: "M13 2 3 14h7l-1 8 10-12h-7z",
  },
];

export default function AiLabPage() {
  return (
    <div className="min-h-screen bg-neutral-900">
      <Nav />
      <section
        className="w-full bg-neutral-900 bg-[radial-gradient(circle,rgba(15,180,196,0.12)_1px,transparent_1px)] bg-[length:26px_26px]"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-16 sm:pt-20 pb-24 sm:pb-28">
          <div className="flex flex-col gap-4 max-w-[640px] mb-14">
            <span className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">AI LAB</span>
            <h1 className="font-display text-3xl sm:text-[42px] font-semibold text-white">Where I Experiment</h1>
            <p className="text-[15px] leading-relaxed text-neutral-300">
              Hands-on exploration of AI tools, prompts, automations and creative workflows — documented as I build,
              not written up after the fact.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {sections.map((s) => (
              <div
                key={s.title}
                className={`bg-neutral-800 border border-neutral-700 rounded-2xl p-7 flex flex-col gap-4 ${
                  !s.live ? "opacity-60" : ""
                }`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-cyan-500)" strokeWidth="1.8">
                  <path d={s.icon} />
                </svg>
                <h2 className="font-display text-xl font-semibold text-white">{s.title}</h2>
                <p className="text-sm text-neutral-300 leading-relaxed">{s.description}</p>
                {s.live ? (
                  <ArrowLink href={s.href} theme="dark" size="sm">
                    Explore
                  </ArrowLink>
                ) : (
                  <span className="font-mono text-[11px] text-neutral-400 tracking-wide">NOT YET LIVE</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
