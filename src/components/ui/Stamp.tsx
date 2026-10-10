import type { ReactNode } from "react";

export function Stamp({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block -rotate-3 rounded-full border-2 border-warm bg-warm-tint px-4 py-2 text-[15px] leading-tight font-extrabold text-warm-text ${className}`}
    >
      {children}
    </span>
  );
}
