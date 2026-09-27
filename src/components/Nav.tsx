"use client";

import { useState } from "react";
import Link from "next/link";

// Absolute paths throughout, even for homepage anchors (/#ai-lab, not
// #ai-lab) — a bare #anchor silently does nothing from any route other
// than "/", since there's no matching id on the current page to scroll to.
const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Work" },
  { href: "/ai-lab", label: "AI Lab" },
  { href: "/training", label: "Training" },
  { href: "/resume", label: "Resume" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-50/90 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-[10px] bg-neutral-900 text-cyan-500 font-mono font-semibold text-sm flex items-center justify-center">
            P/
          </span>
          <span className="font-display text-lg font-semibold text-neutral-900">PromptAtWork</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-neutral-700 hover:text-plum-600 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 bg-plum-600 hover:bg-plum-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors whitespace-nowrap"
        >
          Let&apos;s Connect
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-300 text-neutral-800"
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          )}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-neutral-200 bg-neutral-50 px-5 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-neutral-800"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 bg-plum-600 text-white text-sm font-semibold px-5 py-3 rounded-full mt-1"
          >
            Let&apos;s Connect
          </Link>
        </nav>
      )}
    </header>
  );
}
