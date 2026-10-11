import type { KeyboardEvent } from "react";
import { filters, type Filter } from "@/lib/map";
import { MapCanvas } from "./MapCanvas";
import { MapSidePanel } from "./MapSidePanel";

type MapViewProps = {
  selected: number;
  filter: Filter;
  year: number;
  playing: boolean;
  onSelect?: (id: number) => void;
  onFilter?: (filter: Filter) => void;
  onYear?: (year: number) => void;
  onPlay?: () => void;
  onPointKeyDown?: (event: KeyboardEvent<HTMLButtonElement>, id: number) => void;
  pointRef?: (id: number, element: HTMLButtonElement | null) => void;
};

export function MapView({ selected, filter, year, playing, onSelect, onFilter, onYear, onPlay, onPointKeyDown, pointRef }: MapViewProps) {
  return (
    <div className="flex flex-col gap-[22px]">
      <div className="flex flex-wrap items-center justify-between gap-3.5">
        <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
          {filters.map(([key, label]) => {
            const active = key === filter;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={onFilter && (() => onFilter(key))}
                className={`min-h-9 rounded-full border px-3.5 text-sm font-semibold transition-colors duration-300 ${
                  active ? "border-blue bg-blue text-on-blue" : "border-line bg-card text-ink hover:border-plate-line"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={onPlay}
          disabled={playing}
          className="min-h-[38px] rounded-[12px] bg-blue px-3.5 text-sm font-bold text-on-blue transition-colors duration-300 disabled:cursor-default"
        >
          {playing ? "Playing…" : "Play the timeline"}
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
        <MapCanvas
          selected={selected}
          filter={filter}
          year={year}
          onSelect={onSelect}
          onYear={onYear}
          onPointKeyDown={onPointKeyDown}
          pointRef={pointRef}
        />
        <MapSidePanel selected={selected} onSelect={onSelect} />
      </div>
    </div>
  );
}
