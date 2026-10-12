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
      <p className="text-[15px] leading-[1.55] text-ink-2">{children}</p>
    </div>
  );
}

export function HardCall({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[56px_minmax(0,1fr)] gap-4 border-t border-line py-[22px] last:border-b">
      <span className="font-num text-2xl text-blue-text">{number}</span>
      <div className="flex flex-col gap-1.5">
        <b className="text-lg font-bold">{title}</b>
        <p className="text-base leading-[1.6] text-ink-2">{children}</p>
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
