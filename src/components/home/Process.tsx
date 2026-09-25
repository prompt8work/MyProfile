import { process } from "../../../data/homeContent";

export default function Process() {
  return (
    <section className="w-full">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 py-24 sm:py-28">
        <div className="flex flex-col gap-3.5 mb-14 max-w-[640px]">
          <span className="font-mono text-xs tracking-wide text-plum-600 font-semibold">HOW I WORK</span>
          <h2 className="font-display text-3xl sm:text-[38px] font-semibold text-neutral-900">
            Explore. Build. Experiment. Document. Share. Teach.
          </h2>
          <p className="text-[15px] leading-relaxed text-neutral-600">
            Every capability I develop moves through this loop — turning a raw experiment into evidence, then into
            something others can learn from.
          </p>
        </div>

        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
          <div className="hidden lg:block absolute top-[22px] left-[8%] right-[8%] h-px bg-neutral-300" />
          {process.map((p, i) => {
            const isLast = i === process.length - 1;
            return (
              <div key={p.step} className="relative z-10 flex flex-col gap-3.5 items-start">
                <span
                  className={`w-11 h-11 rounded-full border-[1.5px] font-mono text-[13px] font-bold flex items-center justify-center ${
                    isLast
                      ? "bg-neutral-900 border-neutral-900 text-cyan-500"
                      : i === 0
                      ? "bg-white border-plum-600 text-plum-600"
                      : "bg-white border-neutral-300 text-neutral-800"
                  }`}
                >
                  {p.step}
                </span>
                <h4 className="text-[15px] font-semibold text-neutral-900">{p.title}</h4>
                <p className="text-[12.5px] leading-snug text-neutral-600">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
