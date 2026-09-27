import type { Metadata } from "next";
import Image from "next/image";
import Nav from "../../components/Nav";
import SiteFooter from "../../components/SiteFooter";
import Button from "../../components/ui/Button";
import ArrowLink from "../../components/ui/ArrowLink";
import { summary, passions } from "../../../data";
import { buildMetadata } from "../../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "About — PromptAtWork",
  description: "AI Solution Engineer specializing in prompt engineering, generative AI, AI-assisted development and automation.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Nav />

      <section className="w-full">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10 pt-16 sm:pt-20 pb-20 grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-12 items-start">
          <div className="relative w-full max-w-[380px] mx-auto md:mx-0 aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_48px_rgba(27,26,23,0.14)]">
            <Image
              src="/images/Hero_image_portrait.png"
              alt="Niharika Dhande"
              fill
              sizes="(max-width: 768px) 380px, 40vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col gap-5">
            <span className="font-mono text-xs tracking-wide text-plum-600 font-semibold">ABOUT</span>
            <h1 className="font-display text-3xl sm:text-[40px] font-semibold text-neutral-900 leading-tight">
              Niharika Dhande
            </h1>
            <p className="font-mono text-sm text-plum-700">AI Solution Engineer · Prompt Engineer</p>

            <p className="text-[16px] leading-relaxed text-neutral-700">{summary}</p>

            <p className="text-[16px] leading-relaxed text-neutral-700">
              I design and build practical AI solutions by combining software engineering, prompt engineering, RAG,
              multi-LLM systems, automation and AI-assisted development — the goal is always evidence, not
              speculation: a working system, a measured result, something documented well enough that someone else
              can learn from it.
            </p>

            <div className="flex gap-3 flex-wrap mt-1">
              <Button href="/resume">View Resume</Button>
              <Button href="/experience" variant="secondary">
                See Experience
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-neutral-100">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10 py-16 sm:py-20">
          <span className="font-mono text-xs tracking-wide text-plum-600 font-semibold">WHAT DRIVES THE WORK</span>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-neutral-900 mt-3 mb-8">Professional Interests</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {passions.map((p, i) => {
              const [title, ...rest] = p.split(" - ");
              return (
                <div key={i} className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-2">
                  <h3 className="font-display text-lg font-semibold text-neutral-900">{title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{rest.join(" - ")}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10 py-16 sm:py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-2xl font-semibold text-neutral-900">Want the full story?</h2>
            <p className="text-sm text-neutral-600">Skills, timeline and case studies live on their own pages.</p>
          </div>
          <div className="flex gap-6 flex-wrap">
            <ArrowLink href="/experience">Experience</ArrowLink>
            <ArrowLink href="/projects">Projects</ArrowLink>
            <ArrowLink href="/#contact">Contact</ArrowLink>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
