"use client";

import { useState } from "react";
import LinkedinIcon from "../icons/LinkedinIcon";

// PRD 04.2 FR-03/FR-04/FR-06/NFR-02: a standard LinkedIn share URL, not an
// API integration — LinkedIn opens with the canonical PromptAtWork blog URL
// pre-filled; the user still writes and publishes the LinkedIn post
// themselves. No LinkedIn API key or OAuth involved.
export default function ShareActions({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can be unavailable — the URL is still visible/
      // selectable on the page either way.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <a
        href={shareUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Share "${title}" on LinkedIn`}
        className="inline-flex items-center gap-2 border border-neutral-300 text-neutral-700 text-sm font-semibold px-4 py-2.5 rounded-full hover:border-plum-400 hover:text-plum-700 transition-colors"
      >
        <LinkedinIcon className="w-4 h-4" />
        Share on LinkedIn
      </a>
      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center gap-2 border border-neutral-300 text-neutral-700 text-sm font-semibold px-4 py-2.5 rounded-full hover:border-plum-400 hover:text-plum-700 transition-colors"
      >
        {copied ? "Link Copied!" : "Copy Link"}
      </button>
    </div>
  );
}
