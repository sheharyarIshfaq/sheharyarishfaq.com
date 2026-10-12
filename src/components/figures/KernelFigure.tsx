import { useEffect, useState } from "react";
import { useInView } from "@/lib/hooks/useInView";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { BLOCKS } from "@/lib/kernel";
import { KernelView } from "./KernelView";

const START_MS = 400;
const BLOCK_MS = 220;

type KernelFigureProps = {
  label: string;
  caption: string;
  button: string;
};

export default function KernelFigure(props: KernelFigureProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reducedMotion = useReducedMotion();
  const [finished, setFinished] = useState<number | null>(null);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    let block = 0;
    let interval: number | undefined;
    const start = window.setTimeout(
      () => {
        setFinished(0);
        interval = window.setInterval(() => {
          block += 1;
          setFinished(block);
          if (block >= BLOCKS) window.clearInterval(interval);
        }, BLOCK_MS);
      },
      run === 0 ? START_MS : 0,
    );
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [inView, reducedMotion, run]);

  return (
    <div ref={ref}>
      <KernelView
        {...props}
        finished={reducedMotion ? BLOCKS : finished}
        onRun={() => {
          setFinished(null);
          setRun((count) => count + 1);
        }}
      />
    </div>
  );
}
