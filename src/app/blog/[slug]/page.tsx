import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Nav from "../../../components/Nav";
import SiteFooter from "../../../components/SiteFooter";
import ArrowLink from "../../../components/ui/ArrowLink";
import Tag from "../../../components/ui/Tag";
import RelatedContent from "../../../components/ai-lab/RelatedContent";
import ReactionBar from "../../../components/blog/ReactionBar";
import ShareActions from "../../../components/blog/ShareActions";
import CommentForm from "../../../components/blog/CommentForm";
import JsonLd from "../../../components/JsonLd";
import { client } from "../../../sanity/lib/client";
import { blogPostBySlugQuery, blogSlugsQuery } from "../../../sanity/lib/queries";
import { getReactionCounts, type ReactionCounts } from "../../../supabase/blogReactionRepository";
import { getPublishedComments, type PublishedComment } from "../../../supabase/commentRepository";
import { getCanonicalUrl } from "../../../lib/site";

export const revalidate = 60;

type BlogPostDetail = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category?: string;
  tags?: string[];
  author?: string;
  readingTime?: string;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  coverImage?: string;
  relatedContent?: {
    _type: "project" | "tool" | "prompt" | "experiment" | "automation";
    slug: string;
    title?: string;
    name?: string;
  }[];
};

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(blogSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post: BlogPostDetail | null = await client.fetch(blogPostBySlugQuery, { slug });
  if (!post) return {};
  const title = post.seoTitle || `${post.title} — Blog — PromptAtWork`;
  const description = post.seoDescription || post.excerpt;
  const canonicalUrl = getCanonicalUrl(`/blog/${post.slug}`);
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: BlogPostDetail | null = await client.fetch(blogPostBySlugQuery, { slug });
  if (!post) notFound();

  const contentId = `blog-${post.slug}`;
  const canonicalUrl = getCanonicalUrl(`/blog/${post.slug}`);
  const [reactionCounts, comments]: [ReactionCounts, PublishedComment[]] = await Promise.all([
    getReactionCounts(contentId),
    getPublishedComments(contentId),
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author || "Niharika Dhande" },
    ...(post.coverImage ? { image: post.coverImage } : {}),
    mainEntityOfPage: canonicalUrl,
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <JsonLd data={articleJsonLd} />
      <Nav />
      <section className="w-full">
        <div className="max-w-[800px] mx-auto px-5 sm:px-10 pt-16 sm:pt-20 pb-24 sm:pb-28 flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <ArrowLink href="/blog" size="sm" direction="back">
              Blog
            </ArrowLink>
            <div className="flex items-center gap-2 flex-wrap">
              {post.category && <Tag variant="plum">{post.category}</Tag>}
              {post.readingTime && <span className="text-xs text-neutral-600">{post.readingTime}</span>}
              <span className="text-xs text-neutral-600">
                {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-[42px] font-semibold text-neutral-900 leading-tight">{post.title}</h1>
            <p className="text-[16px] leading-relaxed text-neutral-600 max-w-[640px]">{post.excerpt}</p>
            {post.author && <span className="text-sm text-neutral-600">By {post.author}</span>}
          </div>

          {post.coverImage && (
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
              <Image src={post.coverImage} alt="" fill sizes="(max-width: 800px) 100vw, 800px" className="object-cover" />
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-y border-neutral-200">
            <ReactionBar contentId={contentId} initialCounts={reactionCounts} />
            <ShareActions url={canonicalUrl} title={post.title} />
          </div>

          <div className="text-[15.5px] leading-relaxed text-neutral-700 whitespace-pre-wrap">{post.body}</div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}

          <RelatedContent items={post.relatedContent} theme="light" />

          <div className="pt-8 border-t border-neutral-200 flex flex-col gap-6">
            <h2 className="font-display text-xl font-semibold text-neutral-900">
              Comments{comments.length > 0 ? ` (${comments.length})` : ""}
            </h2>

            {comments.length > 0 && (
              <div className="flex flex-col gap-5">
                {comments.map((c) => (
                  <div key={c.id} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-neutral-900">{c.name}</span>
                      <span className="text-xs text-neutral-600">
                        {new Date(c.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-700 leading-relaxed">{c.comment}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-white border border-neutral-200 rounded-2xl p-6">
              <p className="text-xs text-neutral-600 mb-4">
                Comments are reviewed before they appear publicly.
              </p>
              <CommentForm contentId={contentId} />
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
