import { ViewTransition, type ReactNode } from "react";
import { MORPH_CLASS } from "../../lib/motion";

/**
 * Shared-element morph between a card and its detail header. Both sides
 * must pass the same name from `morphName` in lib/motion.ts; timing comes
 * from the `.morph` view-transition class in globals.css.
 */
export default function Morph({ name, children }: { name: string; children: ReactNode }) {
  return (
    <ViewTransition name={name} share={MORPH_CLASS} default="none">
      {children}
    </ViewTransition>
  );
}
