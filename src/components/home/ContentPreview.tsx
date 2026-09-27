import Link from "next/link";
import { client } from "../../sanity/lib/client";
import { blogPostsQuery, videosQuery } from "../../sanity/lib/queries";
import { personalInfo } from "../../../data";
import SectionHeading from "../ui/SectionHeading";
import ArrowLink from "../ui/ArrowLink";
import Tag from "../ui/Tag";
import LinkedinIcon from "../icons/LinkedinIcon";

// PRD 04.2: LinkedIn is a distribution channel for this site's own blog
// content, not a content source imported into it — so unlike Blog/YouTube,
// the LinkedIn card here is a static "follow" CTA, never fetched from
// Sanity, and never a stand-in for a missing imported post.
type Card = { type: "BLOG" | "YOUTUBE"; title: string; note: string; href?: string };

const tagVariant: Record<Card["type"], "plum" | "cyan"> = {
  BLOG: "plum",
  YOUTUBE: "cyan",
};

export default async function ContentPreview() {
  const [posts, videos] = await Promise.all([
    client.fetch<{ slug: string; title: string; excerpt: string }[]>(blogPostsQuery),
    client.fetch<{ slug: string; title: string; description?: string; externalUrl: string }[]>(videosQuery),
  ]);

  const cards: Card[] = [
    posts[0]
      ? { type: "BLOG", title: posts[0].title, note: posts[0].excerpt, href: `/blog/${posts[0].slug}` }
      : { type: "BLOG", title: "[ Article title to be published ]", note: "Excerpt preview will appear here once the first post goes live." },
    videos[0]
      ? { type: "YOUTUBE", title: videos[0].title, note: videos[0].description ?? "", href: "/videos" }
      : { type: "YOUTUBE", title: "[ Video title synced from channel ]", note: "Thumbnail, title and description sync automatically via the YouTube API." },
  ];

  return (
    <section id="content" className="w-full bg-neutral-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 py-20 sm:py-24">
        <SectionHeading
          eyebrow="CONTENT"
          title="Latest Writing & Videos"
          action={<ArrowLink href="/blog">View All</ArrowLink>}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
          {cards.map((c) => {
            const body = (
              <>
                <div className="self-start">
                  <Tag variant={tagVariant[c.type]}>{c.type}</Tag>
                </div>
                <h4 className="text-[16px] font-semibold text-neutral-900 leading-snug">{c.title}</h4>
                <p className="text-[13px] text-neutral-600 leading-relaxed">{c.note}</p>
              </>
            );
            const className = "bg-white border border-neutral-200 rounded-2xl p-[22px] flex flex-col gap-3";
            return c.href ? (
              c.href.startsWith("/") ? (
                <Link key={c.type} href={c.href} className={`${className} hover:border-plum-300 transition-colors`}>
                  {body}
                </Link>
              ) : (
                <a key={c.type} href={c.href} target="_blank" rel="noopener noreferrer" className={`${className} hover:border-plum-300 transition-colors`}>
                  {body}
                </a>
              )
            ) : (
              <div key={c.type} className={className}>
                {body}
              </div>
            );
          })}

          <a
            href={`https://${personalInfo.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neutral-900 rounded-2xl p-[22px] flex flex-col gap-3 hover:bg-neutral-800 transition-colors"
          >
            <div className="self-start w-9 h-9 rounded-full bg-white flex items-center justify-center">
              <LinkedinIcon className="w-4 h-4 text-neutral-900" />
            </div>
            <h4 className="text-[16px] font-semibold text-white leading-snug">Follow on LinkedIn</h4>
            <p className="text-[13px] text-neutral-300 leading-relaxed">
              New articles get shared there first — follow along, or check back here for the full write-up.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
