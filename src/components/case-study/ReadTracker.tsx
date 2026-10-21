"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void };
  }
}

// A marker three quarters of the way down the article; it counts one read when it scrolls into view.
export function ReadTracker({ slug }: { slug: string }) {
  const marker = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = marker.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      window.umami?.track("case-study-read", { slug });
      observer.disconnect();
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [slug]);

  return <div ref={marker} aria-hidden="true" className="pointer-events-none absolute top-3/4 left-0 h-px w-px" />;
}
