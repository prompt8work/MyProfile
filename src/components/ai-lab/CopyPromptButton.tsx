"use client";

import { useState } from "react";

export default function CopyPromptButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can be unavailable (e.g. insecure context) — the
      // prompt text is still selectable/readable on the page either way.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="self-start inline-flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
    >
      {copied ? "Copied!" : "Copy Prompt"}
    </button>
  );
}
