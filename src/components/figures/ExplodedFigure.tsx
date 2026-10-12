import { useEffect, useState } from "react";
import { useInView } from "@/lib/hooks/useInView";
import { usePageVisible } from "@/lib/hooks/usePageVisible";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { ExplodedView, TOP_LAYER } from "./ExplodedView";

// The highlight walks down the stack and back up, like a request and its answer.
const SEQUENCE = [4, 3, 2, 1, 0, 1, 2, 3];
const STEP_MS = 1900;

export default function ExplodedFigure() {
  const [step, setStep] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [ref, inView] = useInView<HTMLDivElement>({ once: false });
  const pageVisible = usePageVisible();
  const reducedMotion = useReducedMotion();
  const looping = chosen === null && inView && pageVisible && !reducedMotion;

  useEffect(() => {
    if (!looping) return;
    const interval = window.setInterval(() => setStep((current) => (current + 1) % SEQUENCE.length), STEP_MS);
    return () => window.clearInterval(interval);
  }, [looping]);

  const active = chosen ?? (reducedMotion ? TOP_LAYER : SEQUENCE[step]);

  return (
    <div ref={ref}>
      <ExplodedView active={active} onActivate={setChosen} />
    </div>
  );
}
