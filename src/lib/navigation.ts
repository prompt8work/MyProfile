// Single source for every site-wide link list: the header menu (Nav.tsx,
// used on every page including /resume), the AI Lab dropdown and sidebar
// groups, and the footer columns. Edit here, not in the components.
//
// Absolute paths throughout, even for homepage anchors (/#about, not
// #about) — a bare #anchor silently does nothing from any route other
// than "/", since there's no matching id on the current page to scroll to.

import { personalInfo } from "../../data";

export type NavLink = { href: string; label: string; external?: boolean };

export const brand = { mark: "P/", name: "PromptAtWork" };

// The AI Lab hub's groups, in reading order. Nav's dropdown and the AI Lab
// sidebar both list these; each group's entries are filled in from Sanity
// by the AI Lab layout.
export const aiLabSections: (NavLink & { description: string })[] = [
  { href: "/ai-lab", label: "Overview", description: "Where to start and how the lab is organised." },
  {
    href: "/ai-lab/work",
    label: "Work & Case Studies",
    description: "Shipped projects: problem, architecture, results and learnings.",
  },
  {
    href: "/ai-lab/engineering",
    label: "Engineering",
    description: "Capabilities, each backed by real project evidence.",
  },
  {
    href: "/ai-lab/tools",
    label: "Tools & Research",
    description: "Reviews, tutorials and use cases for AI tools.",
  },
  {
    href: "/ai-lab/experiments",
    label: "Experiments",
    description: "Objective, setup, what worked, what failed.",
  },
  { href: "/ai-lab/prompts", label: "Prompt Library", description: "Copyable prompts with example output." },
  {
    href: "/ai-lab/automations",
    label: "Automations",
    description: "Trigger → AI processing → action, end to end.",
  },
];

export const mainNav: (NavLink & { children?: typeof aiLabSections })[] = [
  { href: "/", label: "Home" },
  { href: "/ai-lab", label: "AI Lab", children: aiLabSections },
  { href: "/blog", label: "Blog" },
  { href: "/training", label: "Training" },
  { href: "/resume", label: "Resume" },
];

export const contactCta: NavLink = { href: "/contact", label: "Let's Connect" };

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "AI Lab",
    links: [
      { href: "/ai-lab/work", label: "Work & Case Studies" },
      { href: "/ai-lab/engineering", label: "Engineering" },
      { href: "/ai-lab/tools", label: "Tools & Research" },
      { href: "/ai-lab/prompts", label: "Prompt Library" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/videos", label: "Videos" },
      { href: "/training", label: "Training" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/testimonials", label: "Testimonials" },
      // LinkedIn is a distribution channel for this site's blog content, not
      // an imported content source (PRD 04.2).
      { href: `https://${personalInfo.linkedin}`, label: "LinkedIn", external: true },
      { href: "/resume", label: "Resume" },
    ],
  },
];

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
