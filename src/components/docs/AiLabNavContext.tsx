"use client";

import { createContext, useContext, type ReactNode } from "react";

export type DocsEntry = { title: string; href: string; summary?: string };
export type DocsGroup = { title: string; href: string; items: DocsEntry[] };

const Ctx = createContext<DocsGroup[]>([]);

/**
 * The AI Lab sidebar tree, fetched once by the ai-lab layout and shared
 * with everything that needs it on the client: the sidebar, ⌘K search and
 * the previous/next links at the foot of each page.
 */
export function AiLabNavProvider({ groups, children }: { groups: DocsGroup[]; children: ReactNode }) {
  return <Ctx.Provider value={groups}>{children}</Ctx.Provider>;
}

export function useAiLabNav() {
  return useContext(Ctx);
}

/** Every page in reading order: each group's landing page, then its entries. Anchors are skipped. */
export function flattenPages(groups: DocsGroup[]): DocsEntry[] {
  return groups.flatMap((g) => [
    { title: g.items.find((i) => i.href === g.href)?.title ?? g.title, href: g.href },
    ...g.items.filter((i) => !i.href.includes("#") && i.href !== g.href),
  ]);
}
