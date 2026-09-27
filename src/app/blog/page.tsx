import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "../../components/Nav";
import SiteFooter from "../../components/SiteFooter";
import SectionHeading from "../../components/ui/SectionHeading";
import Tag from "../../components/ui/Tag";
import { client } from "../../sanity/lib/client";
import { blogPostsQuery } from "../../sanity/lib/queries";
import { buildMetadata } from "../../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Blog — PromptAtWork",
  description: "Writing on AI solution engineering, prompt engineering and AI-assisted development.",
  path: "/blog",
});

export const revalidate = 60;

type BlogListItem = {
  slug: string;
  title: string;
  excerpt: string;
  category?: string;
  author?: string;
  readingTime?: string;
  publishedAt: string;
  coverImage?: string;
};

export default async function BlogPage() {
  const posts: BlogListItem[] = await client.fetch(blogPostsQuery);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Nav />
      <section className="w-full">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-16 sm:pt-20 pb-24 sm:pb-28">
          <SectionHeading
            eyebrow="CONTENT"
            title="Blog"
            description="Writing on AI solution engineering, prompt engineering and AI-assisted development — documented as it happens."
            align="start"
          />

          {posts.length === 0 ? (
            <div className="border border-neutral-200 rounded-2xl p-10 text-center">
              <p className="text-neutral-600">No posts published yet — check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden flex flex-col hover:border-plum-300 transition-colors"
                >
                  {post.coverImage && (
                    <div className="relative w-full aspect-[16/9]">
                      <Image src={post.coverImage} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {post.category && <Tag variant="plum">{post.category}</Tag>}
                      {post.readingTime && <span className="text-xs text-neutral-600">{post.readingTime}</span>}
                    </div>
                    <h2 className="font-display text-xl font-semibold text-neutral-900 group-hover:text-plum-700 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-neutral-600 leading-relaxed">{post.excerpt}</p>
                    <span className="text-xs text-neutral-600">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
