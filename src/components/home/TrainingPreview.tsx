import { trainingBatch } from "../../../data/homeContent";
import ArrowLink from "../ui/ArrowLink";
import Tag from "../ui/Tag";

export default function TrainingPreview() {
  return (
    <section id="training" className="w-full">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 py-24 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs tracking-wide text-plum-600 font-semibold">TRAINING</span>
          <h2 className="font-display text-[34px] font-semibold text-neutral-900">Courses &amp; Workshops</h2>
          <p className="text-[15px] leading-relaxed text-neutral-600 max-w-[460px]">
            Corporate training and cohort-based workshops in prompt engineering and AI-assisted development — from a
            single session to a multi-week program.
          </p>
          <div className="mt-1.5">
            <ArrowLink href="#training">View All Programs</ArrowLink>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-[18px] p-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Tag variant="plum">{trainingBatch.status}</Tag>
            <span className="font-mono text-[11px] text-neutral-500">{trainingBatch.seats}</span>
          </div>
          <h3 className="font-display text-xl font-semibold text-neutral-900">{trainingBatch.title}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[11.5px] text-neutral-500">SCHEDULE</span>
              <span className="text-sm text-neutral-900 font-medium">{trainingBatch.schedule}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[11.5px] text-neutral-500">DURATION</span>
              <span className="text-sm text-neutral-900 font-medium">{trainingBatch.duration}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[11.5px] text-neutral-500">MODE</span>
              <span className="text-sm text-neutral-900 font-medium">{trainingBatch.mode}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[11.5px] text-neutral-500">TIMEZONE</span>
              <span className="text-sm text-neutral-900 font-medium">{trainingBatch.timezone}</span>
            </div>
          </div>
          <a href="#contact" className="mt-1.5 text-center bg-neutral-900 text-white text-[14.5px] font-semibold px-5 py-3 rounded-xl hover:bg-neutral-800 transition-colors">
            Register Interest
          </a>
        </div>
      </div>
    </section>
  );
}
