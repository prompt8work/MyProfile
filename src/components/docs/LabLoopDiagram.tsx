import Link from "next/link";

// The loop every AI Lab entry sits on. Each stage is a link to the group
// that holds its output, so the diagram doubles as navigation.
const stages = [
  { entry: "A new tool", label: "Explore", href: "/ai-lab/tools", holds: "Tools & Research" },
  { entry: "An open question", label: "Experiment", href: "/ai-lab/experiments", holds: "Experiments" },
  { entry: "A real problem", label: "Build", href: "/ai-lab/work", holds: "Work & Automations" },
  { entry: null, label: "Document & teach", href: "/ai-lab/prompts", holds: "Prompts & case studies" },
];

const grid = {
  backgroundImage:
    "linear-gradient(var(--color-neutral-200) 1px, transparent 1px), linear-gradient(90deg, var(--color-neutral-200) 1px, transparent 1px)",
  backgroundSize: "44px 44px",
  backgroundPosition: "-1px -1px",
};

function EntryIcon({ i }: { i: number }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (i === 0)
    return (
      <svg {...common}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
      </svg>
    );
  if (i === 1)
    return (
      <svg {...common} strokeDasharray="2.5 2.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.7M12 17h.01" strokeDasharray="0" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3Z" />
    </svg>
  );
}

export default function LabLoopDiagram() {
  return (
    <figure className="my-8 rounded-xl border border-neutral-200 bg-white overflow-hidden">
      <div className="px-4 sm:px-8 pt-5 pb-6" style={grid}>
        <p className="text-center font-mono text-[10.5px] tracking-[0.16em] text-cyan-700">START ANYWHERE</p>

        <ol className="mt-5 grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-6 relative">
          {stages.map((s, i) => (
            <li key={s.label} className="flex flex-col items-stretch gap-2">
              <div className="hidden sm:flex h-[64px] flex-col items-center justify-end gap-1 text-cyan-600">
                {s.entry && (
                  <>
                    <EntryIcon i={i} />
                    <span className="text-[11.5px] font-semibold text-neutral-800">{s.entry}</span>
                    <span className="block w-px h-3 bg-cyan-600" aria-hidden />
                  </>
                )}
              </div>
              <Link
                href={s.href}
                className="motion-btn relative flex flex-col items-center justify-center text-center rounded-md border border-neutral-300 bg-neutral-50 px-3 py-4 hover:border-plum-400 hover:bg-plum-50"
              >
                <span className="text-[14.5px] font-semibold text-neutral-900">{s.label}</span>
                <span className="mt-0.5 text-[11.5px] text-neutral-500">{s.holds}</span>
                {i < stages.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden sm:block absolute top-1/2 -right-[21px] w-[18px] h-px bg-neutral-400"
                  >
                    <span className="absolute -right-0.5 -top-[3px] border-y-[3.5px] border-y-transparent border-l-[5px] border-l-neutral-400" />
                  </span>
                )}
              </Link>
              {i < stages.length - 1 && (
                <span aria-hidden className="sm:hidden self-center text-neutral-400 text-sm">
                  ↓
                </span>
              )}
            </li>
          ))}
        </ol>

        {/* Dashed return path: what gets documented feeds the next experiment. */}
        <svg aria-hidden className="hidden sm:block w-full h-9 mt-1" viewBox="0 0 400 36" preserveAspectRatio="none">
          <path
            d="M350 2 C 350 30, 330 32, 250 32 L 180 32 C 150 32, 150 30, 150 4"
            fill="none"
            stroke="var(--color-neutral-400)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <figcaption className="border-t border-neutral-200 py-2.5 text-center font-mono text-[10.5px] tracking-[0.16em] text-neutral-500">
        EVERY ENTRY IN THE LAB SITS SOMEWHERE ON THIS LOOP
      </figcaption>
    </figure>
  );
}
