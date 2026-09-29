"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DURATION, iconPop } from "../../lib/motion";

/**
 * Every copy-to-clipboard button: the copy icon pops into a check and the
 * label reads "Copied" for 1.8s. Visual variant comes from `className`.
 */
export default function CopyButton({
  text,
  label,
  className = "",
}: {
  text: string;
  label: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), DURATION.copiedFor * 1000);
    } catch {
      // Clipboard API can be unavailable (e.g. insecure context) — the text
      // is still selectable on the page either way.
    }
  }

  return (
    <button type="button" onClick={handleCopy} className={`motion-btn inline-flex items-center gap-2 ${className}`}>
      <span className="relative w-4 h-4 inline-grid" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.svg
            key={copied ? "check" : "copy"}
            variants={iconPop}
            initial="hidden"
            animate="visible"
            exit="exit"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="[grid-area:1/1]"
          >
            {copied ? (
              <path d="M20 6 9 17l-5-5" />
            ) : (
              <>
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </>
            )}
          </motion.svg>
        </AnimatePresence>
      </span>
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
