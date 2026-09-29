import type { Metadata } from "next";
import PageTransition from "../../../components/PageTransition";
import DocsArticle from "../../../components/docs/DocsArticle";
import DocsHeader, { DocsTag } from "../../../components/docs/DocsHeader";
import ArrowLink from "../../../components/ui/ArrowLink";
import Reveal from "../../../components/motion/Reveal";
import { engineeringSections } from "../../../../data/engineering";
import { currentlyStrengthening } from "../../../../data/currentlyStrengthening";
import { buildMetadata } from "../../../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Engineering — AI Lab — PromptAtWork",
  description:
    "Full-Stack AI Engineering, Generative AI, RAG & Knowledge Systems, Agentic AI, AI-Assisted Development and AI Automation — grounded in real, shipped work.",
  path: "/ai-lab/engineering",
});

export default function EngineeringPage() {
  return (
    <PageTransition>
      <DocsArticle>
        <DocsHeader
          eyebrow="AI Lab / Engineering"
          title="Generative AI, Agentic AI, RAG & Full-Stack AI Development"
          description="A software engineering foundation applied to Generative AI. Each area below links to the real project or content behind it."
        />

        <div>
        {engineeringSections.map((s) => (
          <Reveal key={s.id} className="py-8 first:pt-0 border-t border-neutral-200 first:border-t-0">
            <section className="flex flex-col gap-3">
              <span className="font-mono text-[10.5px] tracking-[0.14em] font-semibold text-neutral-500">{s.eyebrow}</span>
              <h2 id={s.id} className="scroll-mt-28 font-sans text-[21px] sm:text-[22px] font-semibold tracking-tight text-neutral-900">
                {s.title}
              </h2>
              <p className="text-[15.5px] leading-[1.75] text-neutral-700">{s.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.items.map((item) => (
                  <DocsTag key={item}>{item}</DocsTag>
                ))}
              </div>
              <div className="pt-1">
                <ArrowLink href={s.link.href} size="sm">
                  Evidence: {s.link.label}
                </ArrowLink>
              </div>
            </section>
          </Reveal>
        ))}
        </div>

        <Reveal className="mt-2 pt-8 border-t border-neutral-200">
          <section className="flex flex-col gap-3">
            <h2 id="currently-strengthening" className="scroll-mt-28 font-sans text-[21px] sm:text-[22px] font-semibold tracking-tight text-neutral-900">
              Currently strengthening
            </h2>
            <p className="text-[15.5px] leading-[1.75] text-neutral-700">
              Alongside applied AI engineering, I&apos;m formalising these deeper software engineering fundamentals
              through structured, ongoing practice.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {currentlyStrengthening.map((item) => (
                <DocsTag key={item}>{item}</DocsTag>
              ))}
            </div>
          </section>
        </Reveal>
      </DocsArticle>
    </PageTransition>
  );
}
