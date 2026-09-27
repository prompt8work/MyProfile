import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../../../components/Nav";
import SiteFooter from "../../../components/SiteFooter";
import ArrowLink from "../../../components/ui/ArrowLink";
import RelatedContent from "../../../components/ai-lab/RelatedContent";
import BatchCard from "../../../components/training/BatchCard";
import JsonLd from "../../../components/JsonLd";
import { client } from "../../../sanity/lib/client";
import { trainingBySlugQuery, trainingSlugsQuery } from "../../../sanity/lib/queries";
import { getBatchesForTraining, getScheduleForBatch, type TrainingBatch } from "../../../supabase/trainingRepository";
import { getCanonicalUrl } from "../../../lib/site";

export const revalidate = 60;

type TrainingDetail = {
  slug: string;
  title: string;
  description: string;
  learningOutcomes?: string[];
  topics?: string[];
  audience?: string;
  duration?: string;
  mode?: string;
  instructor?: string;
  registrationEnabled: boolean;
  testimonials?: { quote: string; name: string; role?: string }[];
  relatedContent?: { _type: "project" | "tool" | "prompt" | "experiment" | "automation" | "blog"; slug: string; title?: string; name?: string }[];
};

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(trainingSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const training: TrainingDetail | null = await client.fetch(trainingBySlugQuery, { slug });
  if (!training) return {};
  const canonicalUrl = getCanonicalUrl(`/training/${training.slug}`);
  return {
    title: `${training.title} — Training — PromptAtWork`,
    description: training.description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title: training.title, description: training.description, url: canonicalUrl, type: "website" },
  };
}

export default async function TrainingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const training: TrainingDetail | null = await client.fetch(trainingBySlugQuery, { slug });
  if (!training || !training.registrationEnabled) notFound();

  const batches: TrainingBatch[] = await getBatchesForTraining(training.slug);
  const schedulesByBatch = await Promise.all(batches.map((b) => getScheduleForBatch(b.id)));

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: training.title,
    description: training.description,
    provider: { "@type": "Organization", name: "PromptAtWork", sameAs: getCanonicalUrl("/") },
    ...(training.instructor ? { instructor: { "@type": "Person", name: training.instructor } } : {}),
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <JsonLd data={courseJsonLd} />
      <Nav />
      <section className="w-full bg-neutral-900">
        <div className="max-w-[900px] mx-auto px-5 sm:px-10 pt-16 sm:pt-20 pb-14 flex flex-col gap-5">
          <ArrowLink href="/training" theme="dark" size="sm" direction="back">
            All Courses
          </ArrowLink>
          {training.mode && <span className="font-mono text-xs tracking-wide text-cyan-500 font-semibold">{training.mode.toUpperCase()}</span>}
          <h1 className="font-display text-3xl sm:text-[42px] font-semibold text-white leading-tight">{training.title}</h1>
          <p className="text-[16px] leading-relaxed text-neutral-300 max-w-[640px]">{training.description}</p>
          <div className="flex gap-5 flex-wrap text-sm text-neutral-400">
            {training.duration && <span>{training.duration}</span>}
            {training.instructor && <span>Instructor: {training.instructor}</span>}
            {training.audience && <span>{training.audience}</span>}
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="max-w-[900px] mx-auto px-5 sm:px-10 py-16 sm:py-20 flex flex-col gap-12">
          {training.learningOutcomes && training.learningOutcomes.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <h2 className="font-mono text-xs tracking-wide text-plum-600 font-semibold">WHAT YOU&apos;LL LEARN</h2>
              <ul className="flex flex-col gap-1.5">
                {training.learningOutcomes.map((o) => (
                  <li key={o} className="flex items-start text-sm text-neutral-700">
                    <span className="text-plum-600 mr-2 mt-0.5">▸</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {training.topics && training.topics.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <h2 className="font-mono text-xs tracking-wide text-plum-600 font-semibold">TOPICS COVERED</h2>
              <div className="flex flex-wrap gap-2">
                {training.topics.map((t) => (
                  <span key={t} className="text-xs bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <h2 className="font-mono text-xs tracking-wide text-plum-600 font-semibold">UPCOMING BATCHES</h2>
            {batches.length === 0 ? (
              <p className="text-sm text-neutral-600">No batches scheduled right now — check back soon.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {batches.map((batch, i) => (
                  <BatchCard key={batch.id} batch={batch} schedule={schedulesByBatch[i]} trainingId={training.slug} />
                ))}
              </div>
            )}
          </div>

          {training.testimonials && training.testimonials.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-mono text-xs tracking-wide text-plum-600 font-semibold">TESTIMONIALS</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {training.testimonials.map((t) => (
                  <div key={t.name} className="bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col gap-3">
                    <p className="text-sm text-neutral-700 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                    <span className="text-xs text-neutral-600 font-semibold">
                      {t.name}{t.role ? ` — ${t.role}` : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <RelatedContent items={training.relatedContent} theme="light" />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
