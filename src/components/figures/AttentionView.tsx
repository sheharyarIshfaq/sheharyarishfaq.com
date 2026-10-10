import type { KeyboardEvent, PointerEvent } from "react";
import { attention, focusFor } from "@/lib/attention";

type AttentionViewProps = {
  active: number;
  onActivate?: (token: number) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>, token: number) => void;
  tokenRef?: (token: number, element: HTMLButtonElement | null) => void;
};

const ARC_AREA = 180;

function arcHeight(span: number) {
  return Math.min(170, 46 + span * 24);
}

// Heat is blue mixed into the card colour; capped so the word stays readable in both themes.
function heat(weight: number) {
  return `color-mix(in srgb, var(--blue) ${Math.round(8 + weight * 70)}%, var(--card))`;
}

export function AttentionView({ active, onActivate, onKeyDown, tokenRef }: AttentionViewProps) {
  const focus = focusFor(active);
  const weights = new Map(focus?.links ?? []);
  const tokens = attention.tokens;
  const columns = tokens.length;

  const handlers = (index: number) =>
    onActivate && {
      onPointerEnter: (event: PointerEvent) => event.pointerType === "mouse" && onActivate(index),
      onFocus: () => onActivate(index),
      onClick: () => onActivate(index),
      onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => onKeyDown?.(event, index),
    };

  return (
    <div className="rounded-[32px] border border-line bg-panel px-4 pt-5 pb-6 md:px-7 md:pt-[26px] md:pb-[30px]">
      <div aria-hidden="true" className="relative hidden lg:block" style={{ height: ARC_AREA }}>
        <svg className="absolute inset-0 size-full overflow-visible" viewBox={`0 0 1000 ${ARC_AREA}`} preserveAspectRatio="none">
          {focus?.links.map(([target, weight]) => {
            const from = Math.min(active, target);
            const to = Math.max(active, target);
            const x1 = ((from + 0.5) / columns) * 1000;
            const x2 = ((to + 0.5) / columns) * 1000;
            // A quadratic curve peaks halfway to its control point, so the control sits at twice the height.
            const peak = ARC_AREA - 2 * arcHeight(to - from);
            return (
              <path
                key={`${active}-${target}`}
                d={`M ${x1} ${ARC_AREA} Q ${(x1 + x2) / 2} ${peak} ${x2} ${ARC_AREA}`}
                fill="none"
                stroke="var(--blue)"
                strokeWidth={1 + weight * 4}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                opacity={0.35 + weight}
              />
            );
          })}
        </svg>
        {focus?.links.map(([target, weight]) => {
          const from = Math.min(active, target);
          const to = Math.max(active, target);
          return (
            <span
              key={`${active}-${target}`}
              className="font-num absolute -translate-x-1/2 rounded-full border border-line bg-card px-2 py-0.5 text-sm text-blue-text"
              style={{ left: `${((from + to + 1) / 2 / columns) * 100}%`, bottom: arcHeight(to - from) - 12 }}
            >
              {weight.toFixed(2)}
            </span>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 lg:grid lg:grid-cols-10">
        {tokens.map((word, index) => {
          const isActive = index === active;
          const weight = weights.get(index);
          return (
            <button
              key={word + index}
              ref={tokenRef ? (element) => tokenRef(index, element) : undefined}
              type="button"
              aria-pressed={isActive}
              tabIndex={isActive ? 0 : -1}
              {...handlers(index)}
              className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-[18px] px-3.5 transition-[background-color,translate,box-shadow] duration-300 lg:min-h-[78px] lg:gap-1.5 lg:px-1 ${
                isActive
                  ? "-translate-y-1 bg-blue text-on-blue shadow-[0_8px_20px_color-mix(in_srgb,var(--blue)_30%,transparent)]"
                  : weight
                    ? "text-ink"
                    : "bg-card text-ink shadow-[inset_0_0_0_1px_var(--line)]"
              }`}
              style={!isActive && weight ? { background: heat(weight) } : undefined}
            >
              <span className="text-base font-extrabold tracking-[-0.02em] font-stretch-[108%] lg:text-lg">
                {word}
              </span>
              <span className={`font-num min-h-4 text-xs ${weight ? "text-ink" : "text-ink-2"}`}>
                {!isActive && weight ? weight.toFixed(2) : ""}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 pt-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-9 lg:pt-[34px]">
        <div className="flex flex-col gap-2.5">
          <span className="text-[34px] leading-none font-[880] tracking-[-0.045em] text-blue-text font-stretch-[120%] md:text-[44px]">
            “{tokens[active]}”
          </span>
          <p className="text-[17px] leading-normal text-ink-2">{focus ? focus.note : attention.smallWordNote}</p>
        </div>
        <ul className="flex flex-col">
          {focus ? (
            focus.evidence.map(([title, weight, proof]) => (
              <li
                key={title}
                className="grid grid-cols-[minmax(0,1fr)_72px_40px] items-center gap-3 border-t border-line py-3.5 md:grid-cols-[minmax(0,1fr)_120px_48px] md:gap-[18px]"
              >
                <span className="text-base leading-snug">
                  <b className="font-bold">{title}</b> <span className="text-ink-2">{proof}</span>
                </span>
                <span className="h-1.5 overflow-hidden rounded-full bg-line">
                  <span
                    className="block h-full rounded-full bg-blue transition-[width] duration-500"
                    style={{ width: `${Math.min(100, weight * 230)}%` }}
                  />
                </span>
                <span className="font-num text-right text-base text-blue-text">{weight.toFixed(2)}</span>
              </li>
            ))
          ) : (
            <li className="border-t border-line py-3.5 text-[15px] text-ink-2">{attention.smallWordHint}</li>
          )}
        </ul>
      </div>
    </div>
  );
}
