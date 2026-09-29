import type { CSSProperties, ReactNode } from "react";
import { introDelay } from "../../lib/motion";

/**
 * Page-intro fade-up for whatever follows a WordReveal headline (subtitle,
 * buttons, meta). CSS only, so it plays on first paint. `after` is the
 * headline text; `step` orders elements after it — the delay itself is
 * always computed from the tokens, never passed in.
 */
export default function IntroFade({
  children,
  after = "",
  step = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  after?: string;
  step?: number;
  as?: "div" | "p" | "span";
  className?: string;
}) {
  return (
    <Tag
      data-reveal="fadeUp"
      style={{ "--motion-delay": `${introDelay(after, step)}s` } as CSSProperties}
      className={`motion-intro ${className}`}
    >
      {children}
    </Tag>
  );
}
