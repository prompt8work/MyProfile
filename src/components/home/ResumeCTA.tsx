import Button from "../ui/Button";
import Reveal from "../motion/Reveal";

export default function ResumeCTA() {
  return (
    <section id="resume" className="w-full bg-neutral-100 border-y border-neutral-200">
      <Reveal className="max-w-[1280px] mx-auto px-5 sm:px-10 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-[560px] text-center sm:text-left">
          <h2 className="font-display text-[28px] font-semibold text-neutral-900">Want the full picture?</h2>
          <p className="text-[14.5px] text-neutral-600 leading-relaxed">
            See my complete experience, technical skills, training history and certifications.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap justify-center">
          <Button href="/resume">View Resume</Button>
        </div>
      </Reveal>
    </section>
  );
}
