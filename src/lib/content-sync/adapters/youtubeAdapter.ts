import type { ContentAdapter, NormalizedContentItem } from "../types";

type YouTubeSearchItem = {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: { high?: { url: string }; medium?: { url: string }; default?: { url: string } };
  };
};

type YouTubeSearchResponse = {
  items: YouTubeSearchItem[];
  error?: { message: string };
};

// The YouTube Data API returns snippet.title/description with HTML
// entities escaped (observed directly against a real channel: an
// apostrophe comes back as "&#39;", not "'"). Left undecoded, that literal
// "&#39;" renders as-is in React (text content isn't HTML-decoded), and
// also corrupts the slug generated from the title. Decode both named
// entities and numeric (decimal/hex) entities before this ever reaches
// Sanity.
function decodeHtmlEntities(text: string): string {
  const named: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    "#39": "'",
    nbsp: " ",
  };
  return text.replace(/&(#\d+|#x[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity: string) => {
    if (entity.startsWith("#x")) return String.fromCodePoint(parseInt(entity.slice(2), 16));
    if (entity.startsWith("#")) return String.fromCodePoint(parseInt(entity.slice(1), 10));
    return named[entity] ?? match;
  });
}

// PRD §35: fetches the channel's uploads via the YouTube Data API v3
// `search` endpoint and normalizes each result into the common shape.
// Requires YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID — real credentials tied
// to the user's own YouTube channel, not something this codebase can
// guess or fabricate.
export class YouTubeAdapter implements ContentAdapter {
  source = "youtube" as const;

  constructor(private apiKey: string, private channelId: string, private maxResults = 25) {}

  async fetchItems(): Promise<NormalizedContentItem[]> {
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("key", this.apiKey);
    url.searchParams.set("channelId", this.channelId);
    url.searchParams.set("part", "snippet");
    url.searchParams.set("order", "date");
    url.searchParams.set("type", "video");
    url.searchParams.set("maxResults", String(this.maxResults));

    const res = await fetch(url.toString());
    const data: YouTubeSearchResponse = await res.json();

    if (!res.ok) {
      throw new Error(`YouTube API error: ${data.error?.message ?? res.statusText}`);
    }

    return data.items.map((item) => this.normalize(item));
  }

  private normalize(item: YouTubeSearchItem): NormalizedContentItem {
    const videoId = item.id.videoId;
    const thumb = item.snippet.thumbnails.high ?? item.snippet.thumbnails.medium ?? item.snippet.thumbnails.default;
    return {
      source: "youtube",
      externalId: videoId,
      externalUrl: `https://www.youtube.com/watch?v=${videoId}`,
      title: decodeHtmlEntities(item.snippet.title),
      description: decodeHtmlEntities(item.snippet.description),
      thumbnailUrl: thumb?.url,
      publishedAt: item.snippet.publishedAt,
    };
  }
}
