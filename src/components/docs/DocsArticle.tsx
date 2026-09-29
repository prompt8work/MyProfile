import type { ReactNode } from "react";
import DocsToc from "./DocsToc";
import DocsPrevNext from "./DocsPrevNext";

/**
 * Centre + right columns of the AI Lab hub: the page's content at reading
 * width, with "On this page" beside it on wide screens and previous/next
 * links at the foot.
 */
export default function DocsArticle({ children }: { children: ReactNode }) {
  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-12 px-5 sm:px-10 lg:px-14 pt-10 sm:pt-14 pb-20">
      <article data-docs-content className="min-w-0 max-w-[720px]">
        {children}
        <DocsPrevNext />
      </article>
      <aside className="hidden xl:block">
        <div className="sticky top-[105px]">
          <DocsToc />
        </div>
      </aside>
    </div>
  );
}
