"use client";

import { Suspense, type ReactNode } from "react";
import { useInView } from "@/lib/hooks/useInView";

type WhenVisibleProps = {
  // The server-rendered static version, shown until the figure is in view and its code has loaded.
  fallback: ReactNode;
  children: ReactNode;
  className?: string;
};

export function WhenVisible({ fallback, children, className }: WhenVisibleProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.01 });

  return (
    <div ref={ref} className={className}>
      {inView ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
}
