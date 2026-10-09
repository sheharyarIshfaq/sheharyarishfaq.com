"use client";

import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type Alternatives = Record<string, (string | number)[][]>;

type HeroHeadlineProps = {
  bios: string[];
  alternatives: Alternatives;
  altsLabel: string;
  idleHint: string;
  regenLabel: string;
};

const WORD_MS = 85;
const START_MS = 200;
const CARD_WIDTH = 260;

function altKey(word: string) {
  return word.replace(/[^A-Za-z]/g, "").toLowerCase();
}

export function HeroHeadline({ bios, alternatives, altsLabel, idleHint, regenLabel }: HeroHeadlineProps) {
  const [bio, setBio] = useState(0);
  const [count, setCount] = useState(() => bios[0].split(" ").length);
  const [awaiting, setAwaiting] = useState(true);
  const [asked, setAsked] = useState(false);
  const [open, setOpen] = useState<{ index: number; left: number; top: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointerType = useRef("mouse");
  const cardId = useId();
  const reducedMotion = useReducedMotion();

  const words = bios[bio].split(" ");
  const visible = reducedMotion ? words.length : count;
  const streaming = visible < words.length;

  useEffect(() => {
    if (reducedMotion) return;
    const total = bios[bio].split(" ").length;
    let shown = 0;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      setAwaiting(false);
      setCount(0);
      interval = window.setInterval(() => {
        shown += 1;
        setCount(shown);
        if (shown >= total) window.clearInterval(interval);
      }, WORD_MS);
    }, START_MS);

    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [bio, bios, reducedMotion]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function show(index: number, target: HTMLElement) {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const box = wrap.getBoundingClientRect();
    const word = target.getBoundingClientRect();
    const maxLeft = Math.max(0, box.width - CARD_WIDTH);
    setOpen({ index, left: Math.min(Math.max(0, word.left - box.left - 6), maxLeft), top: word.bottom - box.top + 10 });
  }

  function askAgain() {
    setOpen(null);
    setAsked(true);
    setCount(0);
    setBio((current) => (current + 1) % bios.length);
  }

  const openWord = open ? words[open.index] : null;
  const openAlts = openWord ? alternatives[altKey(openWord)] : null;

  return (
    <div ref={wrapRef} className="relative flex flex-col gap-[22px]">
      <div className="grid text-[40px] leading-[1.04] md:text-[60px]">
        {bios.map((text) => (
          <span key={text} aria-hidden="true" className="headline invisible col-start-1 row-start-1 leading-[1.04]">
            {text}
          </span>
        ))}
        <h1
          data-awaiting-js={awaiting || undefined}
          onMouseLeave={() => setOpen(null)}
          className="col-start-1 row-start-1 leading-[1.04]"
        >
          {words.slice(0, visible).map((word, index) => {
            const hasAlts = Boolean(alternatives[altKey(word)]);
            const isOpen = open?.index === index;

            if (!hasAlts) return <span key={`${bio}-${index}`}>{word} </span>;

            return (
              <span key={`${bio}-${index}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={isOpen ? cardId : undefined}
                  onPointerDown={(event: PointerEvent) => (pointerType.current = event.pointerType)}
                  onPointerEnter={(event) => event.pointerType === "mouse" && show(index, event.currentTarget)}
                  onPointerLeave={(event) => event.pointerType === "mouse" && setOpen(null)}
                  onFocus={(event) => event.currentTarget.matches(":focus-visible") && show(index, event.currentTarget)}
                  onBlur={() => setOpen(null)}
                  onClick={(event) => {
                    if (pointerType.current === "mouse") return;
                    if (isOpen) setOpen(null);
                    else show(index, event.currentTarget);
                  }}
                  className={`-mx-1.5 cursor-help rounded-[10px] px-1.5 tracking-[inherit] transition-colors duration-200 [font:inherit] focus-visible:outline-offset-0 ${
                    isOpen ? "bg-blue text-on-blue" : "shadow-[inset_0_-5px_0_var(--soft)]"
                  }`}
                >
                  {word}
                </button>{" "}
              </span>
            );
          })}
          {streaming && (
            <span
              aria-hidden="true"
              className="inline-block h-[0.82em] w-[0.42em] animate-blink rounded-[3px] bg-blue align-[-0.06em]"
            />
          )}
        </h1>
      </div>

      <p className="flex min-h-10 flex-wrap items-center gap-2 text-sm text-ink-2">
        {idleHint}
        <button
          type="button"
          onClick={askAgain}
          className="min-h-[34px] rounded-full border border-line bg-card px-3 text-sm font-semibold text-blue-text transition-colors duration-300 hover:border-plate-line"
        >
          {regenLabel}
        </button>
      </p>

      <span className="sr-only" aria-live="polite">
        {asked && !streaming ? bios[bio] : ""}
      </span>

      {open && openAlts && (
        <div
          id={cardId}
          role="tooltip"
          style={{ left: open.left, top: open.top, width: CARD_WIDTH }}
          className="absolute z-20 flex max-w-full flex-col gap-2 rounded-[16px] border border-line bg-card p-4 shadow-(--shadow-float)"
        >
          <span className="text-[13px] text-ink-2">{altsLabel}</span>
          <ul className="flex flex-col gap-1">
            {openAlts.map(([word, probability]) => {
              const chosen = word === altKey(openWord!);
              return (
                <li
                  key={word}
                  className={`grid grid-cols-[minmax(0,1fr)_64px_40px] items-center gap-3 rounded-[10px] px-2 py-1.5 text-[15px] ${
                    chosen ? "bg-tint font-semibold text-blue-text" : "text-ink"
                  }`}
                >
                  <span>{word}</span>
                  <span className="h-1 overflow-hidden rounded-full bg-line">
                    <span className="block h-full rounded-full bg-blue" style={{ width: `${Number(probability) * 100}%` }} />
                  </span>
                  <span className="font-num text-right text-[15px] text-blue-text">{Number(probability).toFixed(2)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
