import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../../components/Nav";
import SiteFooter from "../../components/SiteFooter";
import SectionHeading from "../../components/ui/SectionHeading";
import { client } from "../../sanity/lib/client";
import { trainingsQuery } from "../../sanity/lib/queries";
import { buildMetadata } from "../../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Training — PromptAtWork",
  description: "Cohort-based training in prompt engineering and AI-assisted development.",
  path: "/training",
});

export const revalidate = 60;

type TrainingListItem = {
  slug: string;
  title: string;
  description: string;
  duration?: string;
  mode?: string;
  audience?: string;
};

export default async function TrainingPage() {
  const trainings: TrainingListItem[] = await client.fetch(trainingsQuery);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Nav />
      <section className="w-full">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-16 sm:pt-20 pb-24 sm:pb-28">
          <SectionHeading
            eyebrow="TRAINING"
            title="Courses & Workshops"
            description="Cohort-based training, taught in the open — the same practices documented in the AI Lab, taught directly."
            align="start"
          />

          {trainings.length === 0 ? (
            <div className="border border-neutral-200 rounded-2xl p-10 text-center">
              <p className="text-neutral-600">No courses open for registration right now — check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trainings.map((t) => (
                <Link
                  key={t.slug}
                  href={`/training/${t.slug}`}
                  className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-3 hover:border-plum-300 transition-colors"
                >
                  <h2 className="font-display text-xl font-semibold text-neutral-900">{t.title}</h2>
                  <p className="text-sm text-neutral-600 leading-relaxed">{t.description}</p>
                  <div className="flex gap-4 text-xs text-neutral-600 font-mono">
                    {t.duration && <span>{t.duration}</span>}
                    {t.mode && <span>{t.mode}</span>}
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
