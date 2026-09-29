import Link from "next/link";
import SectionHeading from "../ui/SectionHeading";
import ArrowLink from "../ui/ArrowLink";
import { StaggerGrid, StaggerItem } from "../motion/StaggerGrid";
import { aiLabSections } from "../../lib/navigation";

/**
 * The homepage's single way into the AI Lab. Lists the lab's sections by
 * name only — no project cards or summaries — so nothing from the lab is
 * repeated here (Docs/development-plan/11-ai-lab-docs-hub.md).
 */
export default function AILabBand() {
  const sections = aiLabSections.filter((s) => s.href !== "/ai-lab");
  return (
    <section
      id="ai-lab"
      className="w-full border-t border-neutral-200 bg-white"
      style={{
        backgroundImage:
          "linear-gradient(var(--color-neutral-100) 1px, transparent 1px), linear-gradient(90deg, var(--color-neutral-100) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 py-20 sm:py-24">
        <SectionHeading
          eyebrow="AI LAB"
          title="All my work lives in one place"
          description="Case studies, engineering notes, tool research, experiments, prompts and automations — one hub with a sidebar, search and nothing to hunt for."
          action={<ArrowLink href="/ai-lab">Open the AI Lab</ArrowLink>}
        />

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200 rounded-xl overflow-hidden">
          {sections.map((s) => (
            <StaggerItem key={s.href} className="bg-white">
              <Link href={s.href} className="motion-arrow group h-full flex flex-col gap-1.5 p-6 hover:bg-plum-50">
                <span className="flex items-center justify-between gap-3 text-[16px] font-semibold text-neutral-900 group-hover:text-plum-700">
                  {s.label}
                  <svg className="motion-arrow-icon shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
                <span className="text-[14px] leading-relaxed text-neutral-600">{s.description}</span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
