import type { Metadata } from "next";
import Nav from "../../components/Nav";
import PageTransition from "../../components/PageTransition";
import SiteFooter from "../../components/SiteFooter";
import SectionHeading from "../../components/ui/SectionHeading";
import { StaggerGrid, StaggerItem } from "../../components/motion/StaggerGrid";
import CourseCard from "../../components/training/CourseCard";
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
    <PageTransition className="min-h-screen bg-neutral-50">
      <Nav />
      <main>
        <section className="w-full">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-16 sm:pt-20 pb-24 sm:pb-28">
            <SectionHeading
              level="page"
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
              <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trainings.map((t) => (
                  <StaggerItem key={t.slug}>
                    <CourseCard course={t} />
                  </StaggerItem>
                ))}
              </StaggerGrid>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </PageTransition>
  );
}
