"use client";

import Link from "next/link";
import LinkedinIcon from "./icons/LinkedinIcon";
import { personalInfo } from "../../data";

// Absolute paths, same reasoning as Nav.tsx — this footer renders on every
// page, so a bare #anchor only ever works while already on "/".
const footerLinks: Record<string, { label: string; href: string; external?: boolean }[]> = {
  Work: [
    { label: "Projects", href: "/projects" },
    { label: "Case Studies", href: "/projects" },
  ],
  "AI Lab": [
    { label: "Tools", href: "/ai-lab/tools" },
    { label: "Experiments", href: "/ai-lab/experiments" },
    { label: "Prompt Library", href: "/ai-lab/prompts" },
    { label: "Automations", href: "/ai-lab/automations" },
  ],
  Content: [
    { label: "Blog", href: "/blog" },
    // LinkedIn is a distribution channel for this site's blog content, not
    // an imported content source (PRD 04.2) — this links out to the real
    // profile, not an internal placeholder anchor.
    { label: "Follow on LinkedIn", href: `https://${personalInfo.linkedin}`, external: true },
    { label: "YouTube", href: "/videos" },
  ],
  Training: [
    { label: "Courses", href: "/training" },
    { label: "Batches", href: "/training" },
    { label: "Workshops", href: "/training" },
  ],
};

export default function SiteFooter() {
  return (
    <footer className="w-full bg-neutral-900 border-t border-neutral-800">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-16 pb-9">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 pb-11 border-b border-neutral-800">
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-3.5">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-[9px] bg-cyan-500 text-neutral-900 font-mono font-bold text-[13px] flex items-center justify-center">
                P/
              </span>
              <span className="font-display text-[17px] font-semibold text-white">PromptAtWork</span>
            </div>
            <p className="text-[13px] text-neutral-300 leading-relaxed max-w-[220px]">
              A living portfolio of practical AI engineering — built, documented and taught in the open.
            </p>
            <div className="flex gap-2.5 mt-1">
              <a href="#" aria-label="GitHub" className="w-[34px] h-[34px] rounded-full border border-neutral-700 flex items-center justify-center text-neutral-300 hover:border-cyan-500 hover:text-cyan-500 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.29-1.68-1.29-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.7 5.38-5.27 5.67.42.36.78 1.07.78 2.16v3.2c0 .3.21.66.79.55A10.51 10.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" /></svg>
              </a>
              <a href={`https://${"linkedin.com/in/niharika-dhande-96b68822"}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-[34px] h-[34px] rounded-full border border-neutral-700 flex items-center justify-center text-neutral-300 hover:border-cyan-500 hover:text-cyan-500 transition-colors">
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-3">
              <span className="font-mono text-[11px] text-neutral-300 tracking-wide">{section.toUpperCase()}</span>
              {links.map((l) =>
                l.external ? (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13.5px] text-neutral-300 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link key={l.label} href={l.href} className="text-[13.5px] text-neutral-300 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                )
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-6">
          <span className="text-[12.5px] text-neutral-400">© 2026 Niharika Dhande. All rights reserved.</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="w-[38px] h-[38px] rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-cyan-500"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
