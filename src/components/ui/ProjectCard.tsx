import Tag from "./Tag";
import ArrowLink from "./ArrowLink";

// Only the fields the card actually renders — decoupled from the full
// detail-page Project type on purpose, so this works with either the
// listing query's shape or the full one without a cast.
export type ProjectCardData = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  stats?: string[];
  tech: string[];
};

const coverIcons: Record<string, string> = {
  "ai-workflow-automation-platform": "M13 2 3 14h7l-1 8 10-12h-7z",
  "rag-meeting-intelligence-platform": "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM21 21l-4.3-4.3",
  "ai-assisted-full-stack-application": "m16 18 6-6-6-6M8 6l-6 6 6 6",
  "ai-generated-marketing-visuals": "M3 3h18v18H3zM8 9l1.5 1.5M16 15l5 6",
};

const fallbackIcon = "M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0";

export default function ProjectCard({ project }: { project: ProjectCardData }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-[18px] overflow-hidden flex flex-col">
      <div className="h-[170px] bg-gradient-to-br from-neutral-800 to-neutral-900 relative flex items-center justify-center">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--color-cyan-500)" strokeWidth="1.1" opacity="0.6">
          <path d={coverIcons[project.slug] ?? fallbackIcon} />
        </svg>
        <span className="absolute top-3.5 left-4 font-mono text-[10.5px] text-neutral-300 bg-white/10 px-2.5 py-1 rounded-full">
          {project.category}
        </span>
      </div>
      <div className="p-6 flex flex-col gap-3">
        <h3 className="font-display text-xl font-semibold text-neutral-900">{project.title}</h3>
        <p className="text-sm leading-relaxed text-neutral-600">{project.summary}</p>
        {project.stats && (
          <div className="flex gap-3.5 flex-wrap">
            {project.stats.map((s) => (
              <span key={s} className="font-mono text-[11.5px] text-cyan-700 font-semibold">
                {s}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <div className="mt-1">
          <ArrowLink href={`/projects/${project.slug}`} size="sm">
            View Case Study
          </ArrowLink>
        </div>
      </div>
    </div>
  );
}
