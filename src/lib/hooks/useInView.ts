import { useEffect, useRef, useState } from "react";

type Options = {
  threshold?: number;
  once?: boolean;
};

// Figures start at 30% in view; with once: false the flag also drops when they leave, so timers can pause.
export function useInView<T extends Element>({ threshold = 0.3, once = true }: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, inView] as const;
}
