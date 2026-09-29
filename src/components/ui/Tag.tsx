import { ReactNode } from "react";

type Variant = "neutral" | "plum" | "cyan" | "gold";

const variants: Record<Variant, string> = {
  neutral: "bg-neutral-100 text-neutral-600",
  plum: "bg-plum-100 text-plum-700",
  cyan: "bg-neutral-100 text-cyan-700",
  gold: "bg-gold-400 text-neutral-900",
};

export default function Tag({ children, variant = "neutral" }: { children: ReactNode; variant?: Variant }) {
  return (
    <span
      className={`motion-chip font-mono text-[11px] font-semibold px-2.5 py-1 rounded-full inline-block ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
