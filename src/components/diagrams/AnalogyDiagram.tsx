/**
 * Concept ↔ analogy mapping: the technical idea on the left, the familiar
 * thing it behaves like on the right, one row per corresponding part.
 */
export default function AnalogyDiagram({
  concept,
  analogy,
  pairs,
}: {
  concept?: string;
  analogy?: string;
  pairs: { concept: string; analogy: string }[];
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="hidden sm:grid grid-cols-[1fr_40px_1fr] gap-3 pb-1">
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[0.14em] text-cyan-700">THE CONCEPT</p>
          {concept && <p className="text-[15px] font-semibold text-neutral-900">{concept}</p>}
        </div>
        <span />
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[0.14em] text-plum-600">THINK OF IT LIKE</p>
          {analogy && <p className="text-[15px] font-semibold text-neutral-900">{analogy}</p>}
        </div>
      </div>
      {(concept || analogy) && (
        <p className="sm:hidden text-[14px] text-neutral-700">
          <span className="font-semibold text-neutral-900">{concept}</span> is like{" "}
          <span className="font-semibold text-neutral-900">{analogy}</span>
        </p>
      )}
      <ul className="flex flex-col gap-2">
        {pairs.map((p) => (
          <li key={p.concept} className="grid grid-cols-1 sm:grid-cols-[1fr_40px_1fr] gap-1 sm:gap-3 items-stretch">
            <span className="rounded-lg border border-cyan-600/30 bg-cyan-500/[0.05] px-3.5 py-2.5 text-[14px] text-neutral-800">
              {p.concept}
            </span>
            <span aria-hidden className="flex items-center justify-center text-neutral-400 text-[13px]">
              <span className="sm:hidden font-mono text-[10.5px] tracking-[0.1em]">IS LIKE ↓</span>
              <span className="hidden sm:inline">⟷</span>
            </span>
            <span className="rounded-lg border border-plum-200 bg-plum-50 px-3.5 py-2.5 text-[14px] text-neutral-800">
              <span className="sr-only">is like </span>
              {p.analogy}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
