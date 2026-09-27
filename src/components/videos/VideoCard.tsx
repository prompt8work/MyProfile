"use client";

import { useState } from "react";
import Image from "next/image";

export type VideoCardData = {
  slug: string;
  title: string;
  thumbnailUrl?: string;
  description?: string;
  publishedAt?: string;
  externalUrl: string;
  externalId: string;
};

// Thumbnail only until clicked, then swap in a real embedded player — no
// iframe loads on initial page render (Phase 6's own performance guidance:
// "YouTube: thumbnails only, no embedded players on initial load, embed
// on click"), so a page full of videos doesn't pay for N embedded players
// nobody asked to play yet.
export default function VideoCard({ video }: { video: VideoCardData }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden flex flex-col">
      <div className="relative w-full aspect-video bg-neutral-900">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.externalId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${video.title}`}
            className="absolute inset-0 w-full h-full group cursor-pointer"
          >
            {video.thumbnailUrl && (
              <Image src={video.thumbnailUrl} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
            )}
            <span className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors flex items-center justify-center">
              <span className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-neutral-900 translate-x-0.5">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="p-5 flex flex-col gap-2">
        <a
          href={video.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-[17px] font-semibold text-neutral-900 hover:text-plum-700 transition-colors leading-snug"
        >
          {video.title}
        </a>
        {video.publishedAt && (
          <span className="text-xs text-neutral-600">
            {new Date(video.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </span>
        )}
      </div>
    </div>
  );
}
