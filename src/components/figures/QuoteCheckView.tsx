import type { ReactNode, Ref } from "react";
import { FigureFrame } from "@/components/ui/FigureFrame";
import { checkBrief, type Range } from "@/lib/quote-check";
import type { QuoteCheckProject } from "@/lib/work";

type QuoteCheckViewProps = {
  data: QuoteCheckProject["quoteCheck"];
  checked: boolean;
  onToggle?: () => void;
  panelRef?: Ref<HTMLDivElement>;
  firstQuoteRef?: Ref<HTMLSpanElement>;
  firstMatchRef?: Ref<HTMLElement>;
  line?: { x1: number; y1: number; x2: number; y2: number } | null;
};

function highlightSource(source: string, ranges: Range[], firstMatchRef?: Ref<HTMLElement>) {
  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
  const parts: ReactNode[] = [];
  let cursor = 0;
  sorted.forEach(([start, end], index) => {
    parts.push(source.slice(cursor, start));
    parts.push(
      <mark key={start} ref={index === 0 ? firstMatchRef : undefined} className="rounded bg-[color-mix(in_srgb,var(--green)_22%,transparent)] px-0.5 text-ink">
        {source.slice(start, end)}
      </mark>,
    );
    cursor = end;
  });
  parts.push(source.slice(cursor));
  return parts;
}

export function QuoteCheckView({ data, checked, onToggle, panelRef, firstQuoteRef, firstMatchRef, line }: QuoteCheckViewProps) {
  const results = checkBrief(data.brief, data.source);
  const found = results.filter((range): range is Range => range !== null);
  const quotes = data.brief.filter((part) => typeof part !== "string");

  return (
    <FigureFrame
      caption={data.caption}
      description={`${data.briefLabel}, checked against the ${data.sourceLabel.toLowerCase()}: ${data.result}`}
      action={
        <button
          type="button"
          onClick={onToggle}
          className="min-h-11 rounded-[12px] bg-blue px-[18px] font-bold text-on-blue transition-[background-color,scale] duration-300 hover:bg-[color-mix(in_srgb,var(--blue)_88%,black)] active:scale-[0.98]"
        >
          {checked ? data.reset : data.button}
        </button>
      }
      className="p-2"
    >
      <div ref={panelRef} className="relative grid gap-2 md:grid-cols-2">
        <div data-card className="flex flex-col gap-2.5 rounded-[16px] bg-card px-[22px] py-5">
          <span className="text-[13px] font-bold text-ink-2">{data.briefLabel}</span>
          <p className="text-base leading-[1.6]">
            {data.brief.map((part, index) => {
              if (typeof part === "string") return part;
              const quoteIndex = quotes.indexOf(part);
              const isFound = results[quoteIndex] !== null;
              const state = !checked ? "" : isFound ? "found" : "missing";
              return (
                <span key={index}>
                  <span
                    ref={quoteIndex === 0 ? firstQuoteRef : undefined}
                    className={`rounded px-0.5 transition-colors duration-300 ${
                      state === "found"
                        ? "bg-[color-mix(in_srgb,var(--green)_22%,transparent)]"
                        : state === "missing"
                          ? "underline decoration-warm decoration-2 underline-offset-4"
                          : ""
                    }`}
                  >
                    “{part.quote}”
                  </span>
                  {state && (
                    <span aria-hidden="true" className={`ml-1 font-bold ${state === "found" ? "text-green" : "text-warm-text"}`}>
                      {state === "found" ? "✓" : "✗"}
                    </span>
                  )}
                </span>
              );
            })}
          </p>
          <p aria-live="polite" className="min-h-10 text-sm text-ink-2">
            {checked ? data.result : data.idle}
          </p>
        </div>
        <div data-card className="flex flex-col gap-2.5 rounded-[16px] bg-card px-[22px] py-5">
          <span className="text-[13px] font-bold text-ink-2">{data.sourceLabel}</span>
          <p className="text-[15px] leading-[1.6] text-ink-2">
            {checked ? highlightSource(data.source, found, firstMatchRef) : data.source}
          </p>
        </div>
        {line && (
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full overflow-visible">
            <path
              d={`M ${line.x1} ${line.y1} C ${(line.x1 + line.x2) / 2} ${line.y1} ${(line.x1 + line.x2) / 2} ${line.y2} ${line.x2} ${line.y2}`}
              fill="none"
              stroke="var(--green)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx={line.x1} cy={line.y1} r="3.5" fill="var(--green)" />
            <circle cx={line.x2} cy={line.y2} r="3.5" fill="var(--green)" />
          </svg>
        )}
      </div>
    </FigureFrame>
  );
}
