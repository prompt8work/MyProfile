"use client";

import { useMemo, useState } from "react";
import ArrowLink from "../ui/ArrowLink";

export type ToolListItem = {
  slug: string;
  name: string;
  type?: string;
  category?: string;
  tags?: string[];
  description: string;
  hasResearch?: boolean;
  videoCount?: number;
  resourceCount?: number;
};

// PRD 04.1 §23/§24: "at minimum, search, category, content type, tags" and
// listing cards that communicate this is a research repository, not a
// simple tool directory. Sanity-backed filtering (the whole list is
// already fetched server-side) rather than a search index — the dataset
// is small enough that client-side filtering is the right amount of
// complexity, per §23's explicit "do not overbuild" guidance.
export default function ToolsFilterGrid({ tools }: { tools: ToolListItem[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [category, setCategory] = useState("All");

  const types = useMemo(() => ["All", ...Array.from(new Set(tools.map((t) => t.type).filter(Boolean) as string[]))], [tools]);
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(tools.map((t) => t.category).filter(Boolean) as string[]))],
    [tools]
  );

  const filtered = tools.filter((t) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      (t.tags ?? []).some((tag) => tag.toLowerCase().includes(q));
    const matchesType = type === "All" || t.type === type;
    const matchesCategory = category === "All" || t.category === category;
    return matchesQuery && matchesType && matchesCategory;
  });

  const selectClass = "font-mono text-xs bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-lg px-3 py-2.5";

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools & research…"
          aria-label="Search tools and research"
          className="flex-1 text-sm bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-400 rounded-lg px-4 py-2.5"
        />
        {types.length > 2 && (
          <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Filter by type" className={selectClass}>
            {types.map((t) => (
              <option key={t} value={t}>
                {t === "All" ? "All Types" : t}
              </option>
            ))}
          </select>
        )}
        {categories.length > 2 && (
          <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category" className={selectClass}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All Categories" : c}
              </option>
            ))}
          </select>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="border border-neutral-800 rounded-2xl p-10 text-center">
          <p className="text-neutral-400 text-sm">No tools match that search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((t) => (
            <div key={t.slug} className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10.5px] text-cyan-500 tracking-wide">{t.category?.toUpperCase()}</span>
                {t.type && t.type !== "Tool" && (
                  <span className="font-mono text-[10px] text-neutral-400 border border-neutral-700 rounded-full px-2 py-0.5">
                    {t.type}
                  </span>
                )}
              </div>
              <h2 className="font-display text-lg font-semibold text-white">{t.name}</h2>
              <p className="text-sm text-neutral-300 leading-relaxed">{t.description}</p>

              {(t.hasResearch || !!t.videoCount || !!t.resourceCount) && (
                <div className="flex gap-3 text-[11px] text-neutral-400 font-mono">
                  {t.hasResearch && <span>Research</span>}
                  {!!t.videoCount && <span>{t.videoCount} Video{t.videoCount > 1 ? "s" : ""}</span>}
                  {!!t.resourceCount && <span>{t.resourceCount} Resource{t.resourceCount > 1 ? "s" : ""}</span>}
                </div>
              )}

              <div className="mt-1">
                <ArrowLink href={`/ai-lab/tools/${t.slug}`} theme="dark" size="sm">
                  View Details
                </ArrowLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
