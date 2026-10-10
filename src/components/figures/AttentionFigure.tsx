import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import { useInView } from "@/lib/hooks/useInView";
import { usePageVisible } from "@/lib/hooks/usePageVisible";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { attention } from "@/lib/attention";
import { AttentionView } from "./AttentionView";

const STEP_MS = 2800;
const RESUME_MS = 4000;

export default function AttentionFigure() {
  const order = attention.autoplayOrder;
  const [active, setActive] = useState(order[0]);
  const [autoplay, setAutoplay] = useState(true);
  const [ref, inView] = useInView<HTMLDivElement>({ once: false });
  const pageVisible = usePageVisible();
  const reducedMotion = useReducedMotion();
  const resumeTimer = useRef<number | undefined>(undefined);
  const tokenElements = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!autoplay || !inView || !pageVisible || reducedMotion) return;
    const interval = window.setInterval(() => {
      setActive((current) => order[(order.indexOf(current) + 1) % order.length]);
    }, STEP_MS);
    return () => window.clearInterval(interval);
  }, [autoplay, inView, pageVisible, reducedMotion, order]);

  useEffect(() => () => window.clearTimeout(resumeTimer.current), []);

  function steer(token: number) {
    window.clearTimeout(resumeTimer.current);
    setAutoplay(false);
    setActive(token);
  }

  function resumeLater() {
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setAutoplay(true), RESUME_MS);
  }

  function onBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) resumeLater();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = attention.tokens.length - 1;
    const next = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: last }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    tokenElements.current[Math.min(last, Math.max(0, next))]?.focus();
  }

  return (
    <div ref={ref} onPointerLeave={resumeLater} onBlur={onBlur}>
      <AttentionView
        active={active}
        onActivate={steer}
        onKeyDown={onKeyDown}
        tokenRef={(index, element) => {
          tokenElements.current[index] = element;
        }}
      />
    </div>
  );
}
