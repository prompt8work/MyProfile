import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../../../components/Nav";
import PageTransition from "../../../components/PageTransition";
import SiteFooter from "../../../components/SiteFooter";
import ArrowLink from "../../../components/ui/ArrowLink";
import Chip from "../../../components/ui/Chip";
import PageHeader from "../../../components/ui/PageHeader";
import { BlockLabel } from "../../../components/ui/ContentSection";
import Reveal from "../../../components/motion/Reveal";
import Carousel from "../../../components/motion/Carousel";
import { StaggerGrid, StaggerItem } from "../../../components/motion/StaggerGrid";
import { Timeline, TimelineItem } from "../../../components/motion/Timeline";
import TestimonialQuote from "../../../components/testimonials/TestimonialQuote";
import { morphName } from "../../../lib/motion";
import RelatedContent from "../../../components/ai-lab/RelatedContent";
import BatchCard from "../../../components/training/BatchCard";
import JsonLd from "../../../components/JsonLd";
import { client } from "../../../sanity/lib/client";
import { trainingBySlugQuery, trainingSlugsQuery } from "../../../sanity/lib/queries";
import { getBatchesForTraining, getScheduleForBatch, type TrainingBatch } from "../../../supabase/trainingRepository";
import { buildBreadcrumbJsonLd, buildMetadata, getCanonicalUrl } from "../../../lib/site";
import { personName, personRef } from "../../../lib/seo";

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
  relatedContent?: {
    _type: "project" | "tool" | "prompt" | "experiment" | "automation" | "blog";
    slug: string;
    title?: string;
    name?: string;
  }[];
};

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(trainingSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const training: TrainingDetail | null = await client.fetch(trainingBySlugQuery, { slug });
  if (!training) return {};
  return buildMetadata({
    title: `${training.title} Course by Niharika Dhande, Indore (Online) — PromptAtWork`,
    description: training.description,
    path: `/training/${training.slug}`,
    keywords: [
      `${training.title.toLowerCase()} course`,
      `${training.title.toLowerCase()} training in Indore`,
      "generative AI trainer in Indore",
      "Niharika Dhande",
    ],
  });
}

export default async function TrainingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
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
    url: getCanonicalUrl(`/training/${training.slug}`),
    inLanguage: "en",
    provider: { "@type": "Organization", "@id": `${getCanonicalUrl("/")}#organization`, name: "PromptAtWork", url: getCanonicalUrl("/") },
    ...(training.instructor
      ? { instructor: training.instructor === personName ? personRef : { "@type": "Person", name: training.instructor } }
      : {}),
    ...(training.mode || training.duration
      ? {
          hasCourseInstance: {
            "@type": "CourseInstance",
            ...(training.mode ? { courseMode: training.mode } : {}),
            ...(training.duration ? { courseWorkload: training.duration } : {}),
            ...(training.instructor === personName ? { instructor: personRef } : {}),
          },
        }
      : {}),
  };

  return (
    <PageTransition key={slug} className="min-h-screen bg-neutral-50">
      <JsonLd data={courseJsonLd} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Training", path: "/training" },
          { name: training.title, path: `/training/${training.slug}` },
        ])}
      />
      <Nav />
      <main>
        <section className="w-full bg-neutral-100 border-b border-neutral-200">
          <div className="max-w-[900px] mx-auto px-5 sm:px-10 pt-16 sm:pt-20 pb-14">
            <PageHeader
              back={
                <ArrowLink href="/training" size="sm" direction="back">
                  All Courses
                </ArrowLink>
              }
              eyebrow={training.mode?.toUpperCase()}
              title={training.title}
              titleMorph={morphName.courseTitle(training.slug)}
              description={training.description}
            >
              {(training.duration || training.instructor || training.audience) && (
                <div className="flex gap-5 flex-wrap text-sm text-neutral-500">
                  {training.duration && <span>{training.duration}</span>}
                  {training.instructor && <span>Instructor: {training.instructor}</span>}
                  {training.audience && <span>{training.audience}</span>}
                </div>
              )}
            </PageHeader>
          </div>
        </section>

        <section className="w-full">
          <div className="max-w-[1100px] mx-auto px-5 sm:px-10 py-16 sm:py-20 flex flex-col gap-12">
            {training.learningOutcomes && training.learningOutcomes.length > 0 && (
              <div className="flex flex-col gap-2.5">
                <Reveal>
                  <BlockLabel>What you&apos;ll learn</BlockLabel>
                </Reveal>
                <StaggerGrid as="ul" className="flex flex-col gap-1.5">
                  {training.learningOutcomes.map((o) => (
                    <StaggerItem as="li" key={o} className="flex items-start text-sm text-neutral-700">
                      <span className="text-plum-600 mr-2 mt-0.5">▸</span>
                      <span>{o}</span>
                    </StaggerItem>
                  ))}
                </StaggerGrid>
              </div>
            )}

            {training.topics && training.topics.length > 0 && (
              <div className="flex flex-col gap-2.5">
                <Reveal>
                  <BlockLabel>Topics covered</BlockLabel>
                </Reveal>
                <StaggerGrid className="flex flex-wrap gap-2">
                  {training.topics.map((t) => (
                    <StaggerItem key={t}>
                      <Chip tone="muted" size="sm">
                        {t}
                      </Chip>
                    </StaggerItem>
                  ))}
                </StaggerGrid>
              </div>
            )}

            <div className="flex flex-col gap-6">
              <Reveal>
                <BlockLabel>Upcoming batches</BlockLabel>
              </Reveal>
              {batches.length === 0 ? (
                <Reveal>
                  <p className="text-sm text-neutral-600">No batches scheduled right now — check back soon.</p>
                </Reveal>
              ) : (
                <Timeline>
                  {batches.map((batch, i) => (
                    <TimelineItem
                      key={batch.id}
                      title={new Date(batch.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "UTC",
                      })}
                    >
                      <BatchCard batch={batch} schedule={schedulesByBatch[i]} trainingId={training.slug} />
                    </TimelineItem>
                  ))}
                </Timeline>
              )}
            </div>

            {training.testimonials && training.testimonials.length > 0 && (
              <div className="flex flex-col gap-6">
                <Reveal>
                  <BlockLabel>Testimonials</BlockLabel>
                </Reveal>
                <Reveal className="bg-plum-100 rounded-2xl px-5 sm:px-10 py-10">
                  <Carousel
                    label="Course testimonials"
                    slides={training.testimonials.map((t) => (
                      <TestimonialQuote key={t.name} quote={t.quote} name={t.name} detail={t.role} />
                    ))}
                  />
                </Reveal>
              </div>
            )}

            <RelatedContent items={training.relatedContent} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </PageTransition>
  );
}
