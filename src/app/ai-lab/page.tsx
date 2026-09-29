import type { Metadata } from "next";
import Link from "next/link";
import PageTransition from "../../components/PageTransition";
import DocsArticle from "../../components/docs/DocsArticle";
import LabLoopDiagram from "../../components/docs/LabLoopDiagram";
import Callout, { InlineCode } from "../../components/docs/Callout";
import WordReveal from "../../components/motion/WordReveal";
import IntroFade from "../../components/motion/IntroFade";
import Reveal from "../../components/motion/Reveal";
import { process } from "../../../data/homeContent";
import { buildMetadata } from "../../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "AI Lab — PromptAtWork",
  description:
    "Every project, case study, engineering capability, AI tool review, experiment, prompt and automation — in one place.",
  path: "/ai-lab",
});

const headline = "Everything I build, test and learn. In one place.";

// "You want X → go here" routing, docs-style: bold lead-in, then the link.
const routes = [
  {
    lead: "You want to see shipped work.",
    body: (
      <>
        Start with <Link href="/ai-lab/work">Work &amp; Case Studies</Link> — problem, architecture, results and
        learnings for each project.
      </>
    ),
  },
  {
    lead: "You want to know what I can build.",
    body: (
      <>
        <Link href="/ai-lab/engineering">Engineering</Link> lists each capability with the project that proves it.
      </>
    ),
  },
  {
    lead: "You are evaluating an AI tool.",
    body: (
      <>
        <Link href="/ai-lab/tools">Tools &amp; Research</Link> has hands-on reviews, best use cases and where each
        tool falls short.
      </>
    ),
  },
  {
    lead: "You want something you can use today.",
    body: (
      <>
        Copy a template from the <Link href="/ai-lab/prompts">Prompt Library</Link>, or follow an end-to-end
        workflow in <Link href="/ai-lab/automations">Automations</Link>.
      </>
    ),
  },
  {
    lead: "You want the honest version.",
    body: (
      <>
        <Link href="/ai-lab/experiments">Experiments</Link> record what worked, what failed and what I decided
        next.
      </>
    ),
  },
];

export default function AiLabPage() {
  return (
    <PageTransition>
      <DocsArticle>
        <header className="pb-10 border-b border-neutral-200">
          <IntroFade as="span" className="font-mono text-xs tracking-[0.14em] font-semibold text-cyan-700">
            AI LAB
          </IntroFade>
          <WordReveal
            as="h1"
            className="mt-4 font-display text-[40px] sm:text-[56px] leading-[1.04] font-semibold tracking-tight text-neutral-900"
          >
            {headline}
          </WordReveal>
          <IntroFade as="p" after={headline} step={1} className="mt-6 text-[18px] leading-relaxed text-neutral-600 max-w-[560px]">
            Projects, case studies, engineering notes, tool research, experiments, prompts and automations — documented
            as I build, so you can read the whole picture without hopping between pages.
          </IntroFade>
          <IntroFade after={headline} step={2} className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/ai-lab/work"
              className="motion-btn inline-flex items-center rounded-md bg-neutral-900 px-5 py-3 text-[14.5px] font-semibold text-white hover:bg-neutral-800 hover:text-white"
            >
              Read the case studies
            </Link>
            <Link
              href="/ai-lab/tools"
              className="motion-btn inline-flex items-center rounded-md border border-neutral-300 bg-white px-5 py-3 text-[14.5px] font-semibold text-neutral-900 hover:border-neutral-900 hover:text-neutral-900"
            >
              Browse tools &amp; research
            </Link>
          </IntroFade>
        </header>

        <div className="mt-10">
          <Reveal>
            <p className="text-[17px] leading-[1.75] text-neutral-700">
              The lab is organised the way the work actually happens. A tool gets explored, an idea gets tested, the
              useful parts get built into something real, and what I learned gets written down — as a case study, a
              reusable prompt or a workflow someone else can follow.
            </p>
          </Reveal>

          <h2 id="find-your-starting-point" className="mt-14 font-sans text-[26px] font-semibold tracking-tight text-neutral-900 scroll-mt-28">
            Find your starting point
          </h2>
          <LabLoopDiagram />
          <p className="text-[15.5px] leading-[1.75] text-neutral-700">
            Every section runs on the same loop. Bigger work enters earlier and goes round more often; it doesn&apos;t
            become a different way of working.
          </p>

          <ul className="mt-6 flex flex-col gap-4">
            {routes.map((r) => (
              <li key={r.lead} className="text-[15.5px] leading-[1.75] text-neutral-700">
                <strong className="font-semibold text-neutral-900">{r.lead}</strong> {r.body}
              </li>
            ))}
          </ul>

          <h2 id="how-i-work" className="mt-14 font-sans text-[26px] font-semibold tracking-tight text-neutral-900 scroll-mt-28">
            How I work
          </h2>
          <ol className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {process.map((p) => (
              <li key={p.step} className="flex gap-4">
                <span className="font-mono text-[12px] font-semibold text-cyan-700 pt-1">{p.step}</span>
                <div>
                  <p className="text-[15.5px] font-semibold text-neutral-900">{p.title}</p>
                  <p className="text-[14.5px] leading-relaxed text-neutral-600">{p.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <Callout title="Unsure where to start?">
              Press <InlineCode>⌘K</InlineCode> (or <InlineCode>Ctrl K</InlineCode>) to search everything in the lab.
              If that&apos;s not enough, <Link href="/contact">ask me directly</Link>.
            </Callout>
          </div>
        </div>
      </DocsArticle>
    </PageTransition>
  );
}
