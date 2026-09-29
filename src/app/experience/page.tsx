import type { Metadata } from "next";
import Nav from "../../components/Nav";
import PageTransition from "../../components/PageTransition";
import SiteFooter from "../../components/SiteFooter";
import SectionHeading from "../../components/ui/SectionHeading";
import ArrowLink from "../../components/ui/ArrowLink";
import Reveal from "../../components/motion/Reveal";
import { Timeline, TimelineItem } from "../../components/motion/Timeline";
import { StaggerGrid, StaggerItem } from "../../components/motion/StaggerGrid";
import { client } from "../../sanity/lib/client";
import { experienceQuery } from "../../sanity/lib/queries";
import { buildMetadata } from "../../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Experience — PromptAtWork",
  description:
    "Professional journey combining a software engineering foundation with hands-on Generative AI engineering and prompt engineering.",
  path: "/experience",
});

// Interim revalidation strategy until the Sanity webhook is wired up.
export const revalidate = 60;

type ExperienceEntry = {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate?: string;
  responsibilities: string[];
};

function formatMonthYear(iso: string): string {
  const [year, month] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(month) - 1]} ${year}`;
}

function formatPeriod(entry: ExperienceEntry): string {
  const start = formatMonthYear(entry.startDate);
  const end = entry.endDate ? formatMonthYear(entry.endDate) : "Present";
  return `${start} – ${end}`;
}

export default async function ExperiencePage() {
  const roles: ExperienceEntry[] = await client.fetch(experienceQuery);

  return (
    <PageTransition className="min-h-screen bg-neutral-50">
      <Nav />
      <main>
        <section className="w-full">
          <div className="max-w-[1100px] mx-auto px-5 sm:px-10 pt-16 sm:pt-20 pb-24 sm:pb-28">
            <SectionHeading
              level="page"
              eyebrow="EXPERIENCE"
              title="Professional Journey"
              description="A software engineering foundation carried into Full-Stack AI Engineering and prompt engineering — see the Resume for the full breakdown of skills and education."
              align="start"
            />

            <Timeline>
              {roles.map((r, idx) => (
                <TimelineItem
                  key={idx}
                  eyebrow={!r.endDate ? "CURRENT" : undefined}
                  title={r.role}
                  meta={
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{r.company}</span>
                      <span>·</span>
                      <span>{r.location}</span>
                      <span>·</span>
                      <span className="font-mono text-[12.5px]">{formatPeriod(r)}</span>
                    </div>
                  }
                >
                  <StaggerGrid as="ul" className="flex flex-col gap-1.5 mt-1">
                    {r.responsibilities.map((b, bi) => (
                      <StaggerItem
                        as="li"
                        key={bi}
                        className="flex items-start text-sm text-neutral-700 leading-relaxed"
                      >
                        <span className="text-plum-600 mr-2 mt-0.5">▸</span>
                        <span>{b}</span>
                      </StaggerItem>
                    ))}
                  </StaggerGrid>
                </TimelineItem>
              ))}
            </Timeline>

            <Reveal className="mt-14 pt-8 border-t border-neutral-200">
              <ArrowLink href="/resume">View Full Resume</ArrowLink>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </PageTransition>
  );
}
