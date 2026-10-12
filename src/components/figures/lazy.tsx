"use client";

import { lazy } from "react";
import type { QuoteCheckProject, TraceProject } from "@/lib/work";

// Each figure's code loads only when WhenVisible mounts it. The lazy objects stay inside this module,
// because a lazy component can't be handed across the server/client boundary directly.
const Attention = lazy(() => import("./AttentionFigure"));
const Trace = lazy(() => import("./TraceFigure"));
const QuoteCheck = lazy(() => import("./QuoteCheckFigure"));
const ProjectMap = lazy(() => import("./map/MapFigure"));
const Kernel = lazy(() => import("./KernelFigure"));

export function AttentionFigure() {
  return <Attention />;
}

export function TraceFigure({ project }: { project: TraceProject }) {
  return <Trace project={project} />;
}

export function QuoteCheckFigure({ data }: { data: QuoteCheckProject["quoteCheck"] }) {
  return <QuoteCheck data={data} />;
}

export function MapFigure() {
  return <ProjectMap />;
}

export function KernelFigure(props: { label: string; caption: string; button: string }) {
  return <Kernel {...props} />;
}
