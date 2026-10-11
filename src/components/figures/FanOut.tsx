import type { CSSProperties } from "react";
import { FigureFrame } from "@/components/ui/FigureFrame";
import type { FanOutProject } from "@/lib/work";
import { PlayInView } from "./PlayInView";

type Box = { x: number; y: number; w: number; h: number; label: string; kind: "agent" | "app" | "layer" };
type Segment = { x: number; y: number; length: number; vertical?: boolean };
type Point = [x: number, y: number];

type Layout = { height: number; boxes: Box[]; lines: Segment[]; packets: Point[][] };

const LOOP_MS = 6000;

// Positions use % for x and px for y; the desktop numbers come from the reference design.
function desktop({ agent, apps, layer }: FanOutProject["fanOut"]): Layout {
  const appRows = [24, 96, 168, 232];
  return {
    height: 290,
    boxes: [
      { x: 3, y: 115, w: 17, h: 60, label: agent, kind: "agent" },
      ...apps.map((label, index) => ({ x: 32, y: appRows[index], w: 25, h: index === 3 ? 36 : 40, label, kind: "app" as const })),
      { x: 69, y: 100, w: 28, h: 90, label: layer, kind: "layer" },
    ],
    lines: [
      { x: 20, y: 145, length: 6 },
      { x: 26, y: 44, length: 206, vertical: true },
      ...[44, 116, 188, 250].map((y) => ({ x: 26, y, length: 6 })),
      { x: 63, y: 44, length: 206, vertical: true },
      ...[44, 116, 188, 250].map((y) => ({ x: 57, y, length: 6 })),
      { x: 63, y: 145, length: 6 },
    ],
    packets: [44, 116, 188].map((y) => [[57, y], [63, y], [63, 145], [69, 145]]),
  };
}

function mobile({ agent, apps, layer }: FanOutProject["fanOut"]): Layout {
  const appRows = [96, 148, 200, 252];
  return {
    height: 396,
    boxes: [
      { x: 25, y: 16, w: 50, h: 48, label: agent, kind: "agent" },
      ...apps.map((label, index) => ({ x: 18, y: appRows[index], w: 64, h: index === 3 ? 36 : 40, label, kind: "app" as const })),
      { x: 8, y: 316, w: 84, h: 64, label: layer, kind: "layer" },
    ],
    lines: [
      { x: 50, y: 64, length: 16, vertical: true },
      { x: 10, y: 80, length: 40 },
      { x: 10, y: 80, length: 190, vertical: true },
      ...[116, 168, 220, 270].map((y) => ({ x: 10, y, length: 8 })),
      ...[116, 168, 220, 270].map((y) => ({ x: 82, y, length: 8 })),
      { x: 90, y: 116, length: 200, vertical: true },
    ],
    packets: [116, 168, 220].map((y) => [[82, y], [90, y], [90, 300], [90, 316]]),
  };
}

function Diagram({ layout, className }: { layout: Layout; className: string }) {
  return (
    <div aria-hidden="true" className={`relative overflow-hidden ${className}`} style={{ height: layout.height }}>
      {layout.lines.map((line, index) => (
        <span
          key={index}
          className={`absolute border-soft ${line.vertical ? "border-l-[1.5px]" : "border-t-[1.5px]"}`}
          style={
            line.vertical
              ? { left: `${line.x}%`, top: line.y, height: line.length }
              : { left: `${line.x}%`, top: line.y, width: `${line.length}%` }
          }
        />
      ))}
      {layout.packets.map((points, index) => {
        const vars = Object.fromEntries(points.flatMap(([x, y], step) => [[`--x${step}`, `${x}%`], [`--y${step}`, `${y}px`]]));
        return (
          <span
            key={index}
            data-loop
            className="absolute size-2 -translate-1/2 rounded-full bg-blue opacity-0 motion-reduce:hidden"
            style={
              {
                ...vars,
                animationName: "packet",
                animationDuration: `${LOOP_MS}ms`,
                animationTimingFunction: "linear",
                // Negative delays start the three packets a third of a loop apart, already in flight.
                animationDelay: `-${(index * LOOP_MS) / 3}ms`,
                animationIterationCount: "infinite",
              } as CSSProperties
            }
          />
        );
      })}
      {layout.boxes.map((box) => (
        <span
          key={box.label}
          className={`absolute flex items-center justify-center rounded-[14px] border p-1.5 text-center leading-tight ${
            box.kind === "app" ? "text-[13px] font-medium" : "text-[15px] font-bold"
          } ${box.kind === "agent" ? "border-blue bg-blue text-on-blue" : "border-line bg-card text-ink"}`}
          style={{ left: `${box.x}%`, top: box.y, width: `${box.w}%`, height: box.h }}
        >
          {box.label}
        </span>
      ))}
    </div>
  );
}

export function FanOut({ data }: { data: FanOutProject["fanOut"] }) {
  const description = `${data.agent} builds ${data.apps.slice(0, 3).join(", ")} and more; every app sends its requests to ${data.layer}.`;

  return (
    <FigureFrame caption={data.caption} description={description} className="overflow-hidden">
      <PlayInView>
        <Diagram layout={desktop(data)} className="hidden md:block" />
        <Diagram layout={mobile(data)} className="md:hidden" />
      </PlayInView>
    </FigureFrame>
  );
}
