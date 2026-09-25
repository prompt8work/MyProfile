"use client";

import { motion } from "framer-motion";
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
    <motion.div initial="initial" animate="in" variants={pageVariants} transition={pageTransition}>
      {children}
    </motion.div>
  );
}
