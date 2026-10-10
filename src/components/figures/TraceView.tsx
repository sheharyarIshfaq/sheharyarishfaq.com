import { FigureFrame } from "@/components/ui/FigureFrame";
import type { TraceProject } from "@/lib/work";

type TraceViewProps = {
  project: TraceProject;
  active: number;
  grown: boolean;
  onActivate?: (span: number) => void;
};

const GROW_STAGGER_MS = 120;
export const DEFAULT_SPAN = 2;

// Bar widths are illustrative, not measured timings.
export function TraceView({ project, active, grown, onActivate }: TraceViewProps) {
  const spans = project.trace;
  const description = spans.map((span) => `${span.label}: ${span.note}`).join(" ");

  return (
    <>
      <p className="max-w-[68ch] text-[17px] leading-[1.65] md:text-[19px]">
        {project.paragraph.map(([text, span], index) =>
          span === null ? (
            text
          ) : (
            <span
              key={index}
              onPointerEnter={onActivate && (() => onActivate(span))}
              className={`-mx-[3px] cursor-pointer rounded-md px-[3px] py-px transition-colors duration-300 ${
                active === span ? "bg-soft text-blue-text" : "shadow-[inset_0_-2px_0_var(--soft)]"
              }`}
            >
              {text}
            </span>
          ),
        )}
      </p>
      <FigureFrame
        caption={
          <>
            {project.traceCaption} <span className="text-ink">{spans[active].note}</span>
          </>
        }
        description={description}
        className="flex flex-col gap-1 px-3 pt-[22px] pb-[18px] md:px-6"
      >
        {spans.map((span, index) => {
          const isActive = index === active;
          return (
            <button
              key={span.label}
              type="button"
              aria-pressed={isActive}
              {...(onActivate && {
                onPointerEnter: () => onActivate(index),
                onFocus: () => onActivate(index),
                onClick: () => onActivate(index),
              })}
              className={`grid min-h-[34px] w-full grid-cols-[124px_minmax(0,1fr)] items-center rounded-[12px] px-2.5 py-0.5 text-left transition-colors duration-300 md:grid-cols-[170px_minmax(0,1fr)] ${
                isActive ? "bg-card text-blue-text" : "text-ink"
              }`}
            >
              <span className={`whitespace-nowrap text-sm md:text-[15px] ${isActive ? "font-bold" : ""}`} style={{ paddingLeft: span.depth * 14 }}>
                {span.label}
              </span>
              <span className="relative block h-7">
                <span
                  data-grow={grown ? "done" : "pending"}
                  className={`absolute origin-left rounded-full transition-[scale,background-color] duration-[600ms] ease-out ${
                    span.thin ? "top-3 h-1" : "top-[7px] h-3.5"
                  } ${isActive ? "bg-blue" : span.thin ? "bg-plate-line" : "bg-soft"}`}
                  style={{
                    left: `${span.start}%`,
                    width: `${span.width}%`,
                    transitionDelay: grown ? `${index * GROW_STAGGER_MS}ms, 0ms` : undefined,
                  }}
                />
              </span>
            </button>
          );
        })}
      </FigureFrame>
    </>
  );
}
