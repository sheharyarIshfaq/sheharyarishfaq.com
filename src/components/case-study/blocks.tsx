import type { ReactNode } from "react";
import { Todo } from "./Todo";

const isDev = process.env.NODE_ENV === "development";

type SectionProps = {
  title: string;
  intro?: string;
  todo?: string;
  children?: ReactNode;
};

// A section that only has a todo is left out of production builds, heading and all.
export function Section({ title, intro, todo, children }: SectionProps) {
  if (!children && !isDev) return null;
  return (
    <section className="grid gap-6 pb-16 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-12 md:pb-24">
      <div className="flex flex-col gap-2.5">
        <h2 className="text-[30px] leading-[1.02] md:text-[40px]">{title}</h2>
        {intro && <p className="text-[15px] leading-normal text-ink-2">{intro}</p>}
      </div>
      <div className="flex flex-col gap-4 text-[17px] leading-[1.65] md:text-[19px] [&_p]:max-w-[68ch]">
        {children ?? <Todo>{todo}</Todo>}
      </div>
    </section>
  );
}

export function Cards({ children }: { children: ReactNode }) {
  return <div className="grid gap-3.5 sm:grid-cols-2">{children}</div>;
}

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 rounded-[22px] border border-line bg-card p-6">
      <b className="text-lg font-bold">{title}</b>
      <div className="text-[15px] leading-[1.55] text-ink-2">{children}</div>
    </div>
  );
}

export function HardCall({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[56px_minmax(0,1fr)] gap-4 border-t border-line py-[22px] last:border-b">
      <span className="font-num text-2xl text-blue-text">{number}</span>
      <div className="flex flex-col gap-1.5">
        <b className="text-lg font-bold">{title}</b>
        <div className="flex flex-col gap-2 text-base leading-[1.6] text-ink-2">{children}</div>
      </div>
    </div>
  );
}

export function Stats({ children }: { children: ReactNode }) {
  return <div className="mb-16 grid border-y border-line sm:grid-cols-3 md:mb-24">{children}</div>;
}

export function Stat({ value, label, children }: { value: string; label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 py-7 sm:px-7 sm:first:pl-0 sm:[&+&]:border-l sm:[&+&]:border-line max-sm:[&+&]:border-t max-sm:[&+&]:border-line">
      <span className="font-num text-[48px] leading-none text-blue-text md:text-[56px]">{value}</span>
      <b className="text-base font-bold">{label}</b>
      <span className="text-sm text-ink-2">{children}</span>
    </div>
  );
}

export function Quote({ by, role, children }: { by: string; role: string; children: ReactNode }) {
  return (
    <figure className="m-0 mb-16 flex flex-col gap-6 rounded-[32px] bg-blue p-8 text-on-blue md:mb-24 md:p-11">
      <blockquote className="max-w-[960px] text-[22px] leading-[1.3] font-bold tracking-[-0.02em] font-stretch-[108%] md:text-[30px]">
        {children}
      </blockquote>
      <figcaption>
        <b className="text-[17px]">{by}</b>
        <span className="block text-sm">{role}</span>
      </figcaption>
    </figure>
  );
}

export function Screenshot({ todo }: { todo: string }) {
  if (!isDev) return null;
  return (
    <div className="mb-16 flex aspect-[16/8] items-end rounded-[32px] border border-line bg-panel p-6 md:mb-24">
      <Todo>Screenshot: {todo}</Todo>
    </div>
  );
}

type Bar = { label: string; value: number; display?: string; note?: string; highlight?: boolean };

// A horizontal bar per row, scaled between min and max so small differences stay visible.
export function Bars({ rows, min = 0, max = 1, caption }: { rows: Bar[]; min?: number; max?: number; caption: string }) {
  return (
    <figure className="m-0 flex flex-col gap-2.5">
      <div className="flex flex-col gap-1 rounded-[22px] border border-line bg-panel p-4 md:p-6">
        {rows.map((row) => (
          <div key={`${row.label} ${row.note ?? ""}`} className="grid grid-cols-[minmax(0,1fr)_56px] items-center gap-x-4 gap-y-1 py-1.5 md:grid-cols-[200px_minmax(0,1fr)_56px]">
            <span className={`text-[15px] ${row.highlight ? "font-bold text-blue-text" : ""}`}>
              {row.label}
              {row.note && <span className="block text-[13px] font-normal text-ink-2">{row.note}</span>}
            </span>
            <span className="order-last col-span-2 h-2 overflow-hidden rounded-full bg-line md:order-none md:col-span-1">
              <span
                className={`block h-full rounded-full ${row.highlight ? "bg-blue" : "bg-soft"}`}
                style={{ width: `${Math.max(2, ((row.value - min) / (max - min)) * 100)}%` }}
              />
            </span>
            <span className="font-num text-right text-base text-blue-text">{row.display ?? row.value}</span>
          </div>
        ))}
      </div>
      <figcaption className="text-sm leading-normal text-ink-2">{caption}</figcaption>
    </figure>
  );
}

type ReportFigureProps = { src: string; widths: number[]; width: number; height: number; alt: string; caption: string };

// A figure from a report or a screenshot, served as WebP sizes written next to it in public/.
export function ReportFigure({ src, widths, width, height, alt, caption }: ReportFigureProps) {
  const srcSet = widths.map((size) => `${src}-${size}.webp ${size}w`).join(", ");
  return (
    <figure className="m-0 flex flex-col gap-2.5">
      <img
        src={`${src}-${widths[widths.length - 1]}.webp`}
        srcSet={srcSet}
        sizes="(min-width: 1024px) 690px, 100vw"
        width={width}
        height={height}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-auto w-full rounded-[22px] border border-line bg-white"
      />
      <figcaption className="text-sm leading-normal text-ink-2">{caption}</figcaption>
    </figure>
  );
}

type CompareRow = { left: string; right: string; state: "same" | "left-only" | "different" };

// Two implementations side by side, row by row: what matches, what only one side has.
export function Compare({ left, right, rows, caption }: { left: string; right: string; rows: CompareRow[]; caption: string }) {
  const cell = "rounded-[12px] border px-3 py-2 text-center text-sm font-semibold";
  return (
    <figure className="m-0 flex flex-col gap-2.5">
      <div className="grid grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)] items-center gap-x-2 gap-y-2 rounded-[22px] border border-line bg-panel p-4 md:p-6">
        <span className="pb-1 text-center text-[15px] font-bold">{left}</span>
        <span />
        <span className="pb-1 text-center text-[15px] font-bold">{right}</span>
        {rows.map((row) => (
          <div key={row.left} className="contents">
            <span className={`${cell} ${row.state === "same" ? "border-blue bg-tint text-blue-text" : "border-line bg-card text-ink"}`}>{row.left}</span>
            <span aria-hidden="true" className="font-num text-center text-blue-text">
              {row.state === "same" ? "=" : ""}
            </span>
            <span
              className={`${cell} ${
                row.state === "same"
                  ? "border-blue bg-tint text-blue-text"
                  : row.state === "left-only"
                    ? "border-dashed border-plate-line bg-transparent text-ink-2"
                    : "border-line bg-card text-ink"
              }`}
            >
              {row.right}
            </span>
          </div>
        ))}
      </div>
      <figcaption className="text-sm leading-normal text-ink-2">{caption}</figcaption>
    </figure>
  );
}
