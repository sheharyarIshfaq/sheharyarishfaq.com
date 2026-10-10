import type { ReactNode } from "react";

export function Chip({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-tint px-2.5 py-[5px] text-[13px] leading-none text-blue-text">{children}</span>;
}
