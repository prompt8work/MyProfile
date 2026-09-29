"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";
import { revealVariants, type RevealVariant } from "../../lib/motion";
import { useScrollReveal } from "./useScrollReveal";

type RevealTag = "div" | "section" | "li" | "span" | "p";

/**
 * Fade + 16px rise when scrolled into view, once. Wrap every section
 * heading and standalone block in this.
 */
export default function Reveal({
  children,
  as = "div",
  className = "",
  variant = "fadeUp",
  index = 0,
  id,
}: {
  children: ReactNode;
  as?: RevealTag;
  className?: string;
  variant?: RevealVariant;
  /** Position among siblings — only used to stagger the CSS intro on first paint. */
  index?: number;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { armed, animate } = useScrollReveal(ref);
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      id={id}
      initial={false}
      animate={animate}
      variants={revealVariants[variant]}
      data-reveal={variant}
      style={{ "--motion-i": index } as CSSProperties}
      className={`${armed ? "" : "motion-intro"} ${className}`}
    >
      {children}
    </Tag>
  );
}
