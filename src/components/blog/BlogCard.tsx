import Image from "next/image";
import Tag from "../ui/Tag";
import MotionCard, { MotionCardMedia } from "../motion/MotionCard";
import Morph from "../motion/Morph";
import { morphName } from "../../lib/motion";

export type BlogCardData = {
  slug: string;
  title: string;
  excerpt: string;
  category?: string;
  readingTime?: string;
  publishedAt: string;
  coverImage?: string;
};

export default function BlogCard({ post }: { post: BlogCardData }) {
  return (
    <MotionCard
      href={`/blog/${post.slug}`}
      className="group h-full bg-white border border-neutral-200 rounded-2xl flex flex-col"
    >
      {post.coverImage && (
        <Morph name={morphName.blogCover(post.slug)}>
          <MotionCardMedia className="w-full aspect-[16/9]">
            <Image src={post.coverImage} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </MotionCardMedia>
        </Morph>
      )}
      <div className="p-6 flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {post.category && <Tag variant="plum">{post.category}</Tag>}
          {post.readingTime && <span className="text-xs text-neutral-600">{post.readingTime}</span>}
        </div>
        <Morph name={morphName.blogTitle(post.slug)}>
          <h2 className="font-display text-xl font-semibold text-neutral-900 group-hover:text-plum-700 self-start">
            {post.title}
          </h2>
        </Morph>
        <p className="text-sm text-neutral-600 leading-relaxed">{post.excerpt}</p>
        <span className="text-xs text-neutral-600">
          {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </span>
      </div>
    </MotionCard>
  );
}
