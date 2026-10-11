import { useEffect, useRef, useState } from "react";
import type { QuoteCheckProject } from "@/lib/work";
import { QuoteCheckView } from "./QuoteCheckView";

type Line = { x1: number; y1: number; x2: number; y2: number };

// A short bridge between the two cards, level with the quote and with its match in the source.
function measureLine(panel: HTMLElement, quote: HTMLElement, match: HTMLElement): Line {
  const box = panel.getBoundingClientRect();
  const briefCard = quote.closest("[data-card]")!.getBoundingClientRect();
  const sourceCard = match.closest("[data-card]")!.getBoundingClientRect();
  const from = quote.getClientRects()[0];
  const to = match.getClientRects()[0];
  const inset = 12;

  if (sourceCard.top >= briefCard.bottom) {
    const x = box.width / 2;
    return { x1: x, y1: briefCard.bottom - box.top - inset, x2: x, y2: sourceCard.top - box.top + inset };
  }
  return {
    x1: briefCard.right - box.left - inset,
    y1: from.top + from.height / 2 - box.top,
    x2: sourceCard.left - box.left + inset,
    y2: to.top + to.height / 2 - box.top,
  };
}

export default function QuoteCheckFigure({ data }: { data: QuoteCheckProject["quoteCheck"] }) {
  const [checked, setChecked] = useState(false);
  const [line, setLine] = useState<Line | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLSpanElement>(null);
  const matchRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!checked || !panel) return;
    const update = () => {
      if (quoteRef.current && matchRef.current) setLine(measureLine(panel, quoteRef.current, matchRef.current));
    };
    const observer = new ResizeObserver(update);
    observer.observe(panel);
    return () => observer.disconnect();
  }, [checked]);

  return (
    <QuoteCheckView
      data={data}
      checked={checked}
      onToggle={() => {
        setLine(null);
        setChecked(!checked);
      }}
      panelRef={panelRef}
      firstQuoteRef={quoteRef}
      firstMatchRef={matchRef}
      line={checked ? line : null}
    />
  );
}
