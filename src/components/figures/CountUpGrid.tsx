"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/lib/hooks/useInView";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export type NumberItem = {
  value?: number;
  prefix?: string;
  suffix?: string;
  text?: string;
  label: string;
  context: string;
};

const DELAY_MS = 600;
const DURATION_MS = 1400;

function display(item: NumberItem, progress: number) {
  if (item.text) return item.text;
  return `${item.prefix ?? ""}${Math.round((item.value ?? 0) * progress)}${item.suffix ?? ""}`;
}

export function CountUpGrid({ items }: { items: NumberItem[] }) {
  const [ref, inView] = useInView<HTMLUListElement>();
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    let frame = 0;
    const startAt = performance.now() + DELAY_MS;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - startAt) / DURATION_MS));
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reducedMotion]);

  // Until the row is in view the values stay hidden (see data-awaiting-js); the server HTML has the final values.
  const shown = reducedMotion ? 1 : (progress ?? 1);
  const started = reducedMotion || progress !== null;

  return (
    <ul ref={ref} className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
      {items.map((item, index) => (
        <li
          key={item.label}
          className={`flex flex-col gap-1 py-2 max-md:odd:pr-4 max-md:even:border-l max-md:even:border-line max-md:even:pl-5 md:px-7 md:first:pl-0 ${
            index > 0 ? "md:border-l md:border-line" : ""
          }`}
        >
          <span
            data-awaiting-js={started ? undefined : true}
            className="font-num text-[44px] leading-none text-blue-text transition-opacity duration-[600ms] md:text-[60px]"
            style={item.text && !reducedMotion ? { opacity: progress === null ? 1 : Math.min(1, progress * 2) } : undefined}
          >
            {display(item, shown)}
          </span>
          <span className="pt-2.5 text-base font-bold">{item.label}</span>
          <span className="text-sm leading-[1.45] text-ink-2">{item.context}</span>
        </li>
      ))}
    </ul>
  );
}
