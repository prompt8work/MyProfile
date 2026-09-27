// PRD §78 SEO: structured data per content type. Renders a single
// <script type="application/ld+json"> — Next.js doesn't sanitize script
// content automatically, so this always receives a plain data object built
// server-side from trusted Sanity/static content, never raw user input.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
