import type { ReactNode } from "react";

// Content still to come from Sheharyar: shown as a marked box in `pnpm dev`, left out of the production build.
export function Todo({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <div className="rounded-[16px] border-2 border-dashed border-warm bg-warm-tint p-4 text-[15px] text-warm-text">
      To add: {children}
    </div>
  );
}
