import ArrowLink from "../ui/ArrowLink";

type RelatedItem = {
  _type: "project" | "tool" | "prompt" | "experiment" | "automation" | "blog" | "training";
  slug: string;
  title?: string;
  name?: string;
};

const hrefFor: Record<RelatedItem["_type"], (slug: string) => string> = {
  project: (slug) => `/projects/${slug}`,
  tool: (slug) => `/ai-lab/tools/${slug}`,
  prompt: (slug) => `/ai-lab/prompts/${slug}`,
  experiment: (slug) => `/ai-lab/experiments/${slug}`,
  automation: (slug) => `/ai-lab/automations/${slug}`,
  blog: (slug) => `/blog/${slug}`,
  training: (slug) => `/training/${slug}`,
};

export default function RelatedContent({
  items,
  theme = "dark",
}: {
  items?: RelatedItem[];
  theme?: "light" | "dark";
}) {
  if (!items || items.length === 0) return null;

  const headingColor = theme === "dark" ? "text-cyan-500" : "text-plum-600";
  const borderColor = theme === "dark" ? "border-neutral-800" : "border-neutral-200";

  return (
    <div className={`flex flex-col gap-2.5 pt-4 border-t ${borderColor}`}>
      <h2 className={`font-mono text-xs tracking-wide font-semibold ${headingColor}`}>RELATED CONTENT</h2>
      <div className="flex flex-col gap-1.5">
        {items.map((item) => (
          <ArrowLink key={`${item._type}-${item.slug}`} href={hrefFor[item._type](item.slug)} theme={theme} size="sm">
            {item.title ?? item.name}
          </ArrowLink>
        ))}
      </div>
    </div>
  );
}
