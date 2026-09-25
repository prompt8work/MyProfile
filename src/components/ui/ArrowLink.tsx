import Link from "next/link";
import { ReactNode } from "react";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  theme?: "light" | "dark";
  size?: "sm" | "md";
  external?: boolean;
  direction?: "forward" | "back";
}

export default function ArrowLink({
  href,
  children,
  theme = "light",
  size = "md",
  external = false,
  direction = "forward",
}: ArrowLinkProps) {
  const color =
    theme === "dark"
      ? "text-cyan-500 hover:text-cyan-400"
      : "text-neutral-900 hover:text-plum-600";
  const textSize = size === "sm" ? "text-[13.5px]" : "text-[14.5px]";
  const iconSize = size === "sm" ? 12 : 14;

  const arrow = (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d={direction === "back" ? "M19 12H5M11 18l-6-6 6-6" : "M5 12h14M13 6l6 6-6 6"} />
    </svg>
  );

  const content =
    direction === "back" ? (
      <>
        {arrow}
        {children}
      </>
    ) : (
      <>
        {children}
        {arrow}
      </>
    );

  const className = `inline-flex items-center gap-1.5 font-semibold transition-colors ${textSize} ${color}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
