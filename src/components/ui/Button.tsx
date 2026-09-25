import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "cyan" | "outlineDark";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  iconPosition?: "before" | "after";
}

const variants: Record<Variant, string> = {
  primary: "bg-neutral-900 text-white hover:bg-neutral-800",
  secondary: "bg-transparent text-neutral-900 border-[1.5px] border-neutral-300 hover:border-neutral-400",
  cyan: "bg-cyan-500 text-neutral-900 hover:bg-cyan-400 font-bold",
  outlineDark: "bg-transparent text-white border-[1.5px] border-neutral-700 hover:border-neutral-500",
};

export default function Button({ href, children, variant = "primary", icon, iconPosition = "after" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 text-[15px] font-semibold px-6 py-3.5 rounded-xl transition-colors ${variants[variant]}`}
    >
      {iconPosition === "before" && icon}
      {children}
      {iconPosition === "after" && icon}
    </Link>
  );
}
