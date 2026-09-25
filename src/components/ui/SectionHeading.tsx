import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  theme?: "light" | "dark";
  align?: "start" | "between";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  theme = "light",
  align = "between",
}: SectionHeadingProps) {
  const eyebrowColor = theme === "dark" ? "text-cyan-500" : "text-plum-600";
  const titleColor = theme === "dark" ? "text-white" : "text-neutral-900";
  const descColor = theme === "dark" ? "text-neutral-300" : "text-neutral-600";

  return (
    <div
      className={`flex flex-col mb-11 sm:mb-[52px] gap-6 ${
        align === "between" ? "sm:flex-row sm:items-end sm:justify-between" : ""
      }`}
    >
      <div className="flex flex-col gap-3.5 max-w-[640px]">
        <span className={`font-mono text-xs tracking-wide font-semibold ${eyebrowColor}`}>{eyebrow}</span>
        <h2 className={`font-display text-3xl sm:text-[38px] font-semibold ${titleColor}`}>{title}</h2>
        {description && <p className={`text-[15px] leading-relaxed ${descColor}`}>{description}</p>}
      </div>
      {action}
    </div>
  );
}
