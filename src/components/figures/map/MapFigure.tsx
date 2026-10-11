import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useInView } from "@/lib/hooks/useInView";
import { usePageVisible } from "@/lib/hooks/usePageVisible";
import { DEFAULT_POINT, latestYear, pointById, points, years, type Filter } from "@/lib/map";
import { MapView } from "./MapView";

const STEP_MS = 800;
const DIRECTIONS: Record<string, [number, number]> = {
  ArrowRight: [1, 0],
  ArrowLeft: [-1, 0],
  ArrowDown: [0, 1],
  ArrowUp: [0, -1],
};

// The closest visible point in the arrow's direction, preferring points within about 60° of it.
// Sideways distance counts double so the move feels straight.
function nearestInDirection(fromId: number, [dx, dy]: [number, number], year: number) {
  const from = pointById(fromId);
  const candidates = points.flatMap((point) => {
    if (point.id === fromId || point.year > year) return [];
    const along = (point.x - from.x) * dx + (point.y - from.y) * dy;
    const across = Math.abs((point.x - from.x) * dy - (point.y - from.y) * dx);
    return along > 0 ? [{ id: point.id, score: along + across * 2, inCone: across <= along * 2 }] : [];
  });
  const pool = candidates.some((candidate) => candidate.inCone) ? candidates.filter((candidate) => candidate.inCone) : candidates;
  return pool.sort((a, b) => a.score - b.score)[0]?.id;
}

export default function MapFigure() {
  const [selected, setSelected] = useState(DEFAULT_POINT);
  const [filter, setFilter] = useState<Filter>("all");
  const [year, setYear] = useState(latestYear);
  const [playRequested, setPlayRequested] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>({ once: false, threshold: 0.1 });
  const pageVisible = usePageVisible();
  const pointElements = useRef(new Map<number, HTMLButtonElement>());

  const playing = playRequested && year < latestYear;

  useEffect(() => {
    if (!playing || !inView || !pageVisible) return;
    const interval = window.setInterval(() => setYear((current) => Math.min(current + 1, latestYear)), STEP_MS);
    return () => window.clearInterval(interval);
  }, [playing, inView, pageVisible]);

  function play() {
    setYear(years[0]);
    setPlayRequested(true);
  }

  function chooseYear(option: number) {
    setPlayRequested(false);
    setYear(option);
  }

  function onPointKeyDown(event: KeyboardEvent<HTMLButtonElement>, id: number) {
    const direction = DIRECTIONS[event.key];
    if (!direction) return;
    event.preventDefault();
    const next = nearestInDirection(id, direction, year);
    if (next !== undefined) pointElements.current.get(next)?.focus();
  }

  return (
    <div ref={ref}>
      <MapView
        selected={selected}
        filter={filter}
        year={year}
        playing={playing}
        onSelect={setSelected}
        onFilter={setFilter}
        onYear={chooseYear}
        onPlay={play}
        onPointKeyDown={onPointKeyDown}
        pointRef={(id, element) => {
          if (element) pointElements.current.set(id, element);
          else pointElements.current.delete(id);
        }}
      />
    </div>
  );
}
