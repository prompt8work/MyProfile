"use client";

import { motion, MotionConfig } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
};

const pageTransition = {
  type: "tween" as const,
  ease: "easeOut" as const,
  duration: 0.5,
};

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    // PRD §96: reducedMotion="user" makes every animated value here (and
    // any future motion.* added to this tree) snap straight to its end
    // state for a visitor with prefers-reduced-motion set, instead of
    // fading/sliding in — the same OS-level signal Tailwind's own
    // `motion-reduce:` variant reads, applied at the animation-engine
    // level so it can't be missed on a future addition here.
    <MotionConfig reducedMotion="user">
      <motion.div initial="initial" animate="in" variants={pageVariants} transition={pageTransition}>
        {children}
      </motion.div>
    </MotionConfig>
  );
}
