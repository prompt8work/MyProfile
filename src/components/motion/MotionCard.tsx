import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The single card behaviour: lift, shadow, thin plum border glow, slow
 * image zoom, press. Pure CSS (`.motion-card` in globals.css, driven by the
 * tokens in lib/motion.ts), so it works inside Server Components and
 * needs no hydration. `tone` only swaps colours, never timing.
 */
export default function MotionCard({
  children,
  className = "",
  href,
  external = false,
  tone = "light",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  tone?: "light" | "dark";
  as?: "div" | "article";
}) {
  const cls = `motion-card ${className}`;

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" data-tone={tone} className={cls}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} data-tone={tone} className={cls}>
        {children}
      </Link>
    );
  }
  const Tag = as;
  return (
    <Tag data-tone={tone} className={cls}>
      {children}
    </Tag>
  );
}

/**
 * Image/cover area of a MotionCard. `children` sit on the zooming layer;
 * `overlay` (badges, play buttons) stays put on top.
 */
export function MotionCardMedia({
  children,
  overlay,
  className = "",
}: {
  children: ReactNode;
  overlay?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`motion-card-media relative overflow-hidden ${className}`}>
      <div className="motion-card-media-inner absolute inset-0">{children}</div>
      {overlay}
    </div>
  );
}
