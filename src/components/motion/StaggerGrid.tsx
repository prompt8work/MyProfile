"use client";

import { Children, createContext, isValidElement, useContext, useRef, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { useScrollReveal } from "./useScrollReveal";

const StaggerContext = createContext<{ armed: boolean; index: number }>({ armed: false, index: 0 });

/**
 * Every grid or list of cards on the site. Children (StaggerItem) appear one
 * after another, 70ms apart, with the same fade-up as Reveal.
 */
export function StaggerGrid({
  children,
  as = "div",
  className = "",
}: {
  children: ReactNode;
  as?: "div" | "ul" | "ol";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { armed, animate } = useScrollReveal(ref);
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      initial={false}
      animate={animate}
      variants={staggerContainer}
      className={className}
    >
      {Children.toArray(children).map((child, index) => (
        <StaggerContext.Provider
          key={isValidElement(child) && child.key != null ? child.key : index}
          value={{ armed, index }}
        >
          {child}
        </StaggerContext.Provider>
      ))}
    </Tag>
  );
}

export function StaggerItem({
  children,
  as = "div",
  className = "",
}: {
  children: ReactNode;
  as?: "div" | "li";
  className?: string;
}) {
  const { armed, index } = useContext(StaggerContext);
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      variants={fadeUp}
      data-reveal="fadeUp"
      style={{ "--motion-i": index } as CSSProperties}
      className={`${armed ? "" : "motion-intro"} ${className}`}
    >
      {children}
    </Tag>
  );
}
