"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import NavProgress from "./NavProgress";

/**
 * reducedMotion="user": every framer-motion transform snaps to its end
 * state for visitors with prefers-reduced-motion; the motion components
 * additionally skip their opacity reveals and loops in that case, and the
 * CSS-only effects switch off via the same media query in globals.css.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <NavProgress />
      {children}
    </MotionConfig>
  );
}
