import { ViewTransition, type ReactNode } from "react";

/**
 * The outermost element of every page. Route changes crossfade the page
 * (`page-exit` / `page-enter` in globals.css) while Nav and SiteFooter,
 * which carry their own fixed view-transition-name, stay still.
 *
 * It has to be the page's *outermost* element: React only runs a
 * ViewTransition's enter/exit when it is the top of the subtree being
 * inserted or removed. Per the Next 16 view-transitions guide it lives in
 * each page, not the layout — layouts persist, so enter/exit never fire
 * there. Detail pages pass `key={slug}` so moving between two items of
 * the same route still counts as an exit + enter.
 */
export default function PageTransition({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div className={className}>{children}</div>
    </ViewTransition>
  );
}
