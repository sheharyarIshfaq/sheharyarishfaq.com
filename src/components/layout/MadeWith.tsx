"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/lib/hooks/useInView";
import { usePageVisible } from "@/lib/hooks/usePageVisible";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type MadeWithProps = {
  before: string;
  after: string;
  afterEmoji: string;
  emoji: string[][];
  nextLabel: string;
};

const STEP_MS = 2400;

export function MadeWith({ before, after, afterEmoji, emoji, nextLabel }: MadeWithProps) {
  const [index, setIndex] = useState(0);
  const [ref, inView] = useInView<HTMLParagraphElement>({ once: false });
  const pageVisible = usePageVisible();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || !pageVisible || reducedMotion) return;
    const interval = window.setInterval(() => setIndex((current) => (current + 1) % emoji.length), STEP_MS);
    return () => window.clearInterval(interval);
  }, [inView, pageVisible, reducedMotion, emoji.length]);

  const [symbol, meaning] = emoji[index];

  return (
    <p ref={ref} className="flex items-center gap-1.5">
      {before}
      <button
        type="button"
        onClick={() => setIndex((current) => (current + 1) % emoji.length)}
        title={nextLabel}
        className="relative inline-flex size-7 items-center justify-center overflow-hidden rounded-full transition-colors duration-300 hover:bg-tint"
      >
        {/* The key restarts the drop-in animation each time the emoji changes. */}
        <span key={symbol} aria-hidden="true" className="animate-drop-in text-base leading-none">
          {symbol}
        </span>
        <span className="sr-only">{meaning}</span>
      </button>
      {after}
      <span aria-hidden="true" className="text-base leading-none">
        {afterEmoji}
      </span>
    </p>
  );
}
