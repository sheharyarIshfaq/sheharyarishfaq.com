"use client";

import { lazy } from "react";

// Each figure's code loads only when WhenVisible mounts it. The lazy objects stay inside this module,
// because a lazy component can't be handed across the server/client boundary directly.
const Attention = lazy(() => import("./AttentionFigure"));

export function AttentionFigure() {
  return <Attention />;
}
