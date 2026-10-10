import { useState } from "react";
import { useInView } from "@/lib/hooks/useInView";
import type { TraceProject } from "@/lib/work";
import { DEFAULT_SPAN, TraceView } from "./TraceView";

export default function TraceFigure({ project }: { project: TraceProject }) {
  const [active, setActive] = useState(DEFAULT_SPAN);
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="flex flex-col gap-6">
      <TraceView project={project} active={active} grown={inView} onActivate={setActive} />
    </div>
  );
}
