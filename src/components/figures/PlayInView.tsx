"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/hooks/useInView";
import { usePageVisible } from "@/lib/hooks/usePageVisible";

// Marks its children as playing while on screen, so CSS loops inside can pause off screen.
export function PlayInView({ children, className }: { children: ReactNode; className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: false, threshold: 0.3 });
  const pageVisible = usePageVisible();

  return (
    <div ref={ref} data-playing={(inView && pageVisible) || undefined} className={className}>
      {children}
    </div>
  );
}
