import Button from "../ui/Button";

export default function ResumeCTA() {
  return (
    <section id="resume" className="w-full bg-neutral-900">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-[560px] text-center sm:text-left">
          <h2 className="font-display text-[28px] font-semibold text-white">Want the full picture?</h2>
          <p className="text-[14.5px] text-neutral-300 leading-relaxed">
            Download my resume for complete experience, technical skills, training history and certifications.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap justify-center">
          <Button href="/resume" variant="cyan">
            View Resume
          </Button>
          <Button
            href="/resume/download"
            variant="outlineDark"
            iconPosition="before"
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
              </svg>
            }
          >
            Download PDF
          </Button>
        </div>
      </div>
    </section>
  );
}
