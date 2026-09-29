import Link from "next/link";
import { client } from "../../sanity/lib/client";
import { trainingsQuery } from "../../sanity/lib/queries";
import { getBatchesForTraining } from "../../supabase/trainingRepository";
import ArrowLink from "../ui/ArrowLink";
import Tag from "../ui/Tag";
import Reveal from "../motion/Reveal";
import MotionCard from "../motion/MotionCard";
import CountUp from "../motion/CountUp";

type TrainingListItem = { slug: string; title: string; duration?: string; mode?: string };

export default async function TrainingPreview() {
  const trainings: TrainingListItem[] = await client.fetch(trainingsQuery);
  const training = trainings[0];
  const batches = training ? await getBatchesForTraining(training.slug) : [];
  const openBatch = batches.find((b) => b.status === "OPEN") ?? batches[0];

  return (
    <section id="training" className="w-full">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 py-24 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <Reveal className="flex flex-col gap-4">
          <span className="font-mono text-xs tracking-wide text-plum-600 font-semibold">TRAINING</span>
          <h2 className="font-display text-[34px] font-semibold text-neutral-900">Courses &amp; Workshops</h2>
          <p className="text-[15px] leading-relaxed text-neutral-600 max-w-[460px]">
            Corporate training and cohort-based workshops in prompt engineering and AI-assisted development — from a
            single session to a multi-week program.
          </p>
          <div className="mt-1.5">
            <ArrowLink href="/training">View All Programs</ArrowLink>
          </div>
        </Reveal>

        <Reveal index={1}>
          {training ? (
            <MotionCard className="bg-white border border-neutral-200 rounded-[18px] p-7 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Tag variant="plum">
                  {openBatch
                    ? openBatch.status === "OPEN"
                      ? "OPEN FOR REGISTRATION"
                      : openBatch.status
                    : "COMING SOON"}
                </Tag>
                {openBatch && (
                  <CountUp
                    value={`${openBatch.seats - openBatch.seatsFilled} seats left`}
                    className="font-mono text-[11px] text-neutral-600"
                  />
                )}
              </div>
              <h3 className="font-display text-xl font-semibold text-neutral-900">{training.title}</h3>
              {openBatch && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-[11.5px] text-neutral-600">STARTS</span>
                    <span className="text-sm text-neutral-900 font-medium">
                      {new Date(openBatch.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-[11.5px] text-neutral-600">DURATION</span>
                    <span className="text-sm text-neutral-900 font-medium">{training.duration}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-[11.5px] text-neutral-600">MODE</span>
                    <span className="text-sm text-neutral-900 font-medium">{training.mode}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-[11.5px] text-neutral-600">SEATS</span>
                    <CountUp value={openBatch.seats} className="text-sm text-neutral-900 font-medium" />
                  </div>
                </div>
              )}
              <Link
                href={`/training/${training.slug}`}
                className="motion-btn mt-1.5 text-center bg-neutral-900 text-white text-[14.5px] font-semibold px-5 py-3 rounded-xl hover:bg-neutral-800"
              >
                {openBatch?.status === "OPEN" ? "Register Now" : "View Course"}
              </Link>
            </MotionCard>
          ) : (
            <MotionCard className="bg-white border border-neutral-200 rounded-[18px] p-7 flex flex-col gap-2">
              <Tag variant="plum">COMING SOON</Tag>
              <p className="text-sm text-neutral-600 mt-2">
                Course details will appear here once the first course is published.
              </p>
            </MotionCard>
          )}
        </Reveal>
      </div>
    </section>
  );
}
