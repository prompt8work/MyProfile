import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import Nav from "../../components/Nav";
import SiteFooter from "../../components/SiteFooter";
import SectionHeading from "../../components/ui/SectionHeading";
import ArrowLink from "../../components/ui/ArrowLink";
import { client } from "../../sanity/lib/client";
import { experienceQuery } from "../../sanity/lib/queries";

export const metadata: Metadata = {
  title: "Experience — PromptAtWork",
  description: "Professional journey from software engineering into AI solution engineering and prompt engineering.",
};

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
    <div className="min-h-screen bg-neutral-50">
      <Nav />
      <section className="w-full">
        <div className="max-w-[900px] mx-auto px-5 sm:px-10 pt-16 sm:pt-20 pb-24 sm:pb-28">
          <SectionHeading
            eyebrow="EXPERIENCE"
            title="Professional Journey"
            description="From full-stack and lead software engineering into AI solution engineering and prompt engineering — see the Resume for the full breakdown of skills and education."
            align="start"
          />

          <div className="relative flex flex-col gap-12">
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-neutral-200" aria-hidden="true" />

            {roles.map((r, idx) => {
              const current = !r.endDate;
              return (
                <div key={idx} className="relative pl-11">
                  <span
                    className={`absolute left-0 top-1 w-[31px] h-[31px] rounded-full border-[1.5px] flex items-center justify-center ${
                      current ? "bg-plum-600 border-plum-600" : "bg-white border-neutral-300"
                    }`}
                  >
                    <Briefcase className={`w-3.5 h-3.5 ${current ? "text-white" : "text-neutral-500"}`} />
                  </span>

                  <div className="flex flex-col gap-2">
                    {current && (
                      <span className="font-mono text-[11px] font-semibold text-plum-600 tracking-wide">CURRENT</span>
                    )}
                    <h3 className="font-display text-xl font-semibold text-neutral-900">{r.role}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-600">
                      <span className="font-semibold">{r.company}</span>
                      <span>·</span>
                      <span>{r.location}</span>
                      <span>·</span>
                      <span className="font-mono text-[12.5px]">{formatPeriod(r)}</span>
                    </div>
                    <ul className="flex flex-col gap-1.5 mt-1">
                      {r.responsibilities.map((b, bi) => (
                        <li key={bi} className="flex items-start text-sm text-neutral-700 leading-relaxed">
                          <span className="text-plum-600 mr-2 mt-0.5">▸</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-14 pt-8 border-t border-neutral-200">
            <ArrowLink href="/resume">View Full Resume</ArrowLink>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
