import { contentPreview } from "../../../data/homeContent";
import SectionHeading from "../ui/SectionHeading";
import ArrowLink from "../ui/ArrowLink";
import Tag from "../ui/Tag";

const tagVariant: Record<string, "plum" | "cyan"> = {
  BLOG: "plum",
  LINKEDIN: "plum",
  YOUTUBE: "cyan",
};

export default function ContentPreview() {
  return (
    <section id="content" className="w-full bg-neutral-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 py-20 sm:py-24">
        <SectionHeading
          eyebrow="CONTENT"
          title="Latest Writing & Videos"
          action={<ArrowLink href="#content">View All</ArrowLink>}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
          {contentPreview.map((c) => (
            <div key={c.type} className="bg-white border border-neutral-200 rounded-2xl p-[22px] flex flex-col gap-3">
              <div className="self-start">
                <Tag variant={tagVariant[c.type]}>{c.type}</Tag>
              </div>
              <h4 className="text-[16px] font-semibold text-neutral-900 leading-snug">{c.title}</h4>
              <p className="text-[13px] text-neutral-600 leading-relaxed">{c.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
