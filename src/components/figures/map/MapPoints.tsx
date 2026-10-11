import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { pointById, points, type Filter } from "@/lib/map";

type MapPointsProps = {
  selected: number;
  filter: Filter;
  year: number;
  onSelect?: (id: number) => void;
  onPointKeyDown?: (event: KeyboardEvent<HTMLButtonElement>, id: number) => void;
  pointRef?: (id: number, element: HTMLButtonElement | null) => void;
};

const TARGET = 24;

// Each point is a dot-sized button; its label is a separate layer so labels never enlarge or overlap hit targets.
export function MapPoints({ selected, filter, year, onSelect, onPointKeyDown, pointRef }: MapPointsProps) {
  const neighbourIds = pointById(selected).neighbours.map(([id]) => id);

  return points.map((point) => {
    const isSelected = point.id === selected;
    const isNeighbour = neighbourIds.includes(point.id);
    const shown = point.year <= year;
    const dimmed = filter !== "all" && filter !== point.cluster;
    const highlighted = isSelected || isNeighbour;
    // Labels go left of the dot near the right edge, sooner on narrow screens (see .map-label).
    const flip = [point.x > 55 && "narrow", point.x > 75 && "wide"].filter(Boolean).join(" ");
    const place: CSSProperties = {
      left: `${point.x}%`,
      top: `${point.y}%`,
      opacity: shown ? (dimmed ? 0.3 : 1) : 0,
      scale: shown ? 1 : 0.4,
    };

    return [
      <button
        key={`point-${point.id}`}
        ref={pointRef ? (element) => pointRef(point.id, element) : undefined}
        type="button"
        aria-label={point.name}
        aria-pressed={isSelected}
        tabIndex={shown ? 0 : -1}
        {...(onSelect && {
          onPointerEnter: (event: PointerEvent) => event.pointerType === "mouse" && onSelect(point.id),
          onFocus: () => onSelect(point.id),
          onClick: () => onSelect(point.id),
          onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => onPointKeyDown?.(event, point.id),
        })}
        className={`absolute flex -translate-1/2 items-center justify-center rounded-full transition-[opacity,scale] duration-500 ease-out ${
          isSelected ? "z-[6]" : "z-[5]"
        }`}
        style={{ ...place, width: Math.max(TARGET, point.size), height: Math.max(TARGET, point.size), pointerEvents: shown ? undefined : "none" }}
      >
        <span
          className={`block shrink-0 rounded-full transition-[background-color,box-shadow] duration-300 ${
            isSelected ? "bg-blue shadow-[0_0_0_8px_var(--soft)]" : isNeighbour ? "bg-blue-text shadow-[0_0_0_4px_var(--soft)]" : "bg-ink-2"
          }`}
          style={{ width: point.size, height: point.size }}
        />
      </button>,
      <span
        key={`label-${point.id}`}
        aria-hidden="true"
        data-flip={flip || undefined}
        className={`map-label pointer-events-none absolute rounded-full text-[13px] leading-tight whitespace-nowrap transition-[opacity,scale,color] duration-500 ease-out ${
          highlighted ? "z-[6] border border-line bg-card px-[9px] py-[3px]" : "z-[5] max-md:hidden"
        } ${isSelected ? "font-extrabold text-blue-text" : "font-semibold text-ink"}`}
        style={{ ...place, ["--gap" as string]: `${point.size / 2 + 8}px` }}
      >
        {point.name}
      </span>,
    ];
  });
}
