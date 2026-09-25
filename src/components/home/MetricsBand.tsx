import { metrics } from "../../../data/homeContent";

export default function MetricsBand() {
  return (
    <section className="w-full bg-neutral-900">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 py-11 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {metrics.map((m) => (
          <div key={m.label} className="flex flex-col gap-1 px-3 border-l border-neutral-700 first:border-l-0 sm:first:border-l">
            <span className="font-display text-3xl font-bold text-cyan-500">{m.value}</span>
            <span className="font-mono text-[11.5px] text-neutral-300 tracking-wide">{m.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
