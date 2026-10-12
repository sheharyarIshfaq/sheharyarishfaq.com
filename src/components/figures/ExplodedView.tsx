import type { PointerEvent } from "react";
import data from "@content/work/mavera-layers.json";

type Part = [x: number, y: number, width: number, height: number, shape: string, tone: string];

type ExplodedViewProps = {
  active: number;
  onActivate?: (layer: number) => void;
};

const WIDTH = 520;
const HEIGHT = 460;
const SIDE = 250;
const PLATE_WIDTH = 240;
const PLATE_HEIGHT = 120;
const CENTER_X = 150;
const BOTTOM_Y = 384;
const GAP = 66;
const LIFT = 16;
const THICKNESS = 7;
const CHIP_X = 300;

// Maps the plate's square design space onto an isometric rhombus.
const iso = (top: number) =>
  `matrix(${PLATE_WIDTH / 2 / SIDE} ${PLATE_HEIGHT / 2 / SIDE} ${-PLATE_WIDTH / 2 / SIDE} ${PLATE_HEIGHT / 2 / SIDE} ${CENTER_X} ${top})`;

function partFill(tone: string, shape: string, width: number, active: boolean) {
  if (active) return tone ? "var(--on-blue)" : "color-mix(in srgb, var(--on-blue) 26%, transparent)";
  if (tone === "w") return "var(--warm)";
  if (tone === "a") return shape === "c" && width < 12 ? "var(--green)" : "var(--soft)";
  return "var(--part)";
}

export const layers = data.layers;
export const TOP_LAYER = layers.length - 1;

export function ExplodedView({ active, onActivate }: ExplodedViewProps) {
  const centreY = (index: number) => BOTTOM_Y - index * GAP - (index === active ? LIFT : 0);
  const current = layers[active];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full rounded-[28px] border border-line bg-panel" style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}>
        <svg aria-hidden="true" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="absolute inset-0 size-full">
          {layers.map((layer, index) => {
            const isActive = index === active;
            const top = BOTTOM_Y - index * GAP - PLATE_HEIGHT / 2;
            return (
              <g
                key={layer.title}
                className="transition-transform duration-[900ms] ease-out"
                style={{ transform: `translateY(${isActive ? -LIFT : 0}px)` }}
                onPointerEnter={onActivate && ((event: PointerEvent) => event.pointerType === "mouse" && onActivate(index))}
              >
                <rect width={SIDE} height={SIDE} rx={16} transform={iso(top + THICKNESS)} fill={isActive ? "var(--blue)" : "var(--plate-line)"} opacity={isActive ? 0.55 : 1} />
                <g transform={iso(top)}>
                  <rect
                    width={SIDE}
                    height={SIDE}
                    rx={16}
                    fill={isActive ? "var(--blue)" : "var(--card)"}
                    stroke={isActive ? "var(--blue)" : "var(--plate-line)"}
                    strokeWidth={3}
                    className="transition-[fill] duration-[400ms]"
                  />
                  {(layer.parts as Part[]).map(([x, y, width, height, shape, tone], part) => (
                    <rect
                      key={part}
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      rx={shape === "c" ? width / 2 : shape === "r" ? Math.min(width, height) / 2 : 9}
                      fill={partFill(tone, shape, width, isActive)}
                      className="transition-[fill] duration-[400ms]"
                    />
                  ))}
                </g>
              </g>
            );
          })}
          {layers.map((layer, index) => (
            <line
              key={layer.title}
              x1={CENTER_X + PLATE_WIDTH / 2 + 6}
              x2={CHIP_X - 4}
              y1={centreY(index)}
              y2={centreY(index)}
              stroke={index === active ? "var(--blue)" : "var(--plate-line)"}
              strokeWidth={1.5}
              className="transition-all duration-[900ms] ease-out"
            />
          ))}
        </svg>
        {layers.map((layer, index) => {
          const isActive = index === active;
          return (
            <button
              key={layer.title}
              type="button"
              aria-pressed={isActive}
              {...(onActivate && {
                onPointerEnter: (event: PointerEvent) => event.pointerType === "mouse" && onActivate(index),
                onFocus: () => onActivate(index),
                onClick: () => onActivate(index),
              })}
              className={`absolute -translate-y-1/2 rounded-full border px-3 py-1.5 text-[13px] font-bold whitespace-nowrap transition-[top,background-color,color] duration-[900ms] ease-out md:text-sm ${
                isActive ? "border-blue bg-blue text-on-blue" : "border-line bg-card text-ink"
              }`}
              style={{ left: `${(CHIP_X / WIDTH) * 100}%`, top: `${(centreY(index) / HEIGHT) * 100}%` }}
            >
              {layer.title}
            </button>
          );
        })}
      </div>
      <div aria-live="polite" className="flex flex-col gap-3 rounded-[22px] border border-line bg-card p-6">
        <b className="text-lg font-bold">{current.title}</b>
        <p className="text-[15px] leading-[1.55] text-ink-2">{current.description}</p>
        <ul className="flex flex-wrap gap-1.5">
          {current.stack.map((item) => (
            <li key={item} className="rounded-full border border-line px-2.5 py-1 text-xs font-semibold">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
