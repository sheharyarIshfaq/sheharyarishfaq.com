"use client";

import { lazy } from "react";
import type { TraceProject } from "@/lib/work";

// Each figure's code loads only when WhenVisible mounts it. The lazy objects stay inside this module,
// because a lazy component can't be handed across the server/client boundary directly.
const Attention = lazy(() => import("./AttentionFigure"));
const Trace = lazy(() => import("./TraceFigure"));

export function AttentionFigure() {
  return <Attention />;
}

export function TraceFigure({ project }: { project: TraceProject }) {
  return <Trace project={project} />;
}
