import type { KeyboardEvent } from "react";
import { cloud, mapData, pointById, years, type Filter } from "@/lib/map";
import { MapPoints } from "./MapPoints";

type MapCanvasProps = {
  selected: number;
  filter: Filter;
  year: number;
  onSelect?: (id: number) => void;
  onYear?: (year: number) => void;
  onPointKeyDown?: (event: KeyboardEvent<HTMLButtonElement>, id: number) => void;
  pointRef?: (id: number, element: HTMLButtonElement | null) => void;
};

const REGION_OPACITY = { normal: 0.35, chosen: 0.75, other: 0.12 };

// Cluster labels near an edge hang inward so they aren't clipped by the panel.
function labelAnchor(x: number) {
  if (x < 15) return "-25%";
  if (x > 90) return "-75%";
  return "-50%";
}

export function MapCanvas({ selected, filter, year, onSelect, onYear, onPointKeyDown, pointRef }: MapCanvasProps) {
  const current = pointById(selected);
  const visibleYear = (pointYear: number) => pointYear <= year;

  return (
    <div className="relative aspect-[760/580] min-h-[420px] w-full overflow-hidden rounded-[28px] border border-line bg-panel">
      {/* On small screens the plot stops above the year buttons so their targets don't overlap. */}
      <div className="absolute inset-x-0 top-0 bottom-12 md:bottom-0">
        {mapData.regions.map((region) => (
          <span
            key={region.cluster}
            aria-hidden="true"
            className="absolute rounded-[50%] bg-soft transition-opacity duration-[400ms]"
            style={{
              left: `${region.cx - region.w / 2}%`,
              top: `${region.cy - region.h / 2}%`,
              width: `${region.w}%`,
              height: `${region.h}%`,
              opacity:
                filter === "all" ? REGION_OPACITY.normal : filter === region.cluster ? REGION_OPACITY.chosen : REGION_OPACITY.other,
            }}
          />
        ))}

        {mapData.clusterLabels.map((label) => (
          <span
            key={label.cluster}
            aria-hidden="true"
            className="absolute z-[2] rounded-full border border-line bg-card px-2.5 py-1 text-xs font-bold whitespace-nowrap text-ink-2 max-md:hidden"
            style={{ left: `${label.x}%`, top: `${label.y}%`, translate: `${labelAnchor(label.x)} -50%` }}
          >
            {label.label}
          </span>
        ))}

        {cloud.map((dot, index) => {
          const shown = visibleYear(dot.year);
          return (
            <span
              key={index}
              aria-hidden="true"
              className="absolute size-1.5 rounded-full bg-dot transition-[opacity,scale] duration-500 ease-out"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                opacity: shown ? (filter === "all" || filter === "p" ? 1 : 0.25) : 0,
                scale: shown ? 1 : 0,
              }}
            />
          );
        })}

        <svg aria-hidden="true" className="absolute inset-0 z-[3] size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {current.neighbours.map(([id, similarity]) => {
            const target = pointById(id);
            const shown = visibleYear(current.year) && visibleYear(target.year);
            return (
              <line
                key={`${selected}-${id}`}
                x1={current.x}
                y1={current.y}
                x2={target.x}
                y2={target.y}
                stroke="var(--blue)"
                strokeWidth={1 + similarity * 2}
                strokeDasharray="5 5"
                vectorEffect="non-scaling-stroke"
                className="transition-opacity duration-300"
                opacity={shown ? 0.7 : 0}
              />
            );
          })}
        </svg>
        {current.neighbours.map(([id, similarity]) => {
          const target = pointById(id);
          const shown = visibleYear(current.year) && visibleYear(target.year);
          return (
            <span
              key={`${selected}-${id}`}
              aria-hidden="true"
              className="font-num absolute z-[4] -translate-1/2 rounded-full border border-line bg-card px-[7px] py-0.5 text-xs text-blue-text transition-opacity duration-300"
              style={{ left: `${(current.x + target.x) / 2}%`, top: `${(current.y + target.y) / 2}%`, opacity: shown ? 1 : 0 }}
            >
              {similarity.toFixed(2)}
            </span>
          );
        })}

        <MapPoints
          selected={selected}
          filter={filter}
          year={year}
          onSelect={onSelect}
          onPointKeyDown={onPointKeyDown}
          pointRef={pointRef}
        />
      </div>

      <div role="group" aria-label="Year" className="absolute inset-x-4 bottom-3 z-[7] grid grid-cols-7 gap-1.5 md:inset-x-6 md:bottom-[18px]">
        {years.map((option) => {
          const reached = option <= year;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={option === year}
              onClick={onYear && (() => onYear(option))}
              className={`flex min-h-[34px] flex-col items-center gap-1 ${reached ? "text-blue-text" : "text-ink-2"}`}
            >
              <span className={`block h-1 w-full rounded-full transition-colors duration-300 ${reached ? "bg-blue" : "bg-line"}`} />
              <span className="font-num text-[13px]">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
