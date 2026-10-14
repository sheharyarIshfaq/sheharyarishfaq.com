import { COLUMNS, isLit, ROWS } from "@/lib/kernel";

const PITCH = 10;

// The name in the same 5×7 dot font as the CUDA kernel figure; each path holds many round-capped dots.
function dots(lit: boolean) {
  let d = "";
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLUMNS; x++) {
      if (isLit(x, y) === lit) d += `M${x * PITCH + PITCH / 2} ${y * PITCH + PITCH / 2}h0`;
    }
  }
  return d;
}

const unlit = dots(false);
const lit = dots(true);

export function Wordmark() {
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${COLUMNS * PITCH} ${ROWS * PITCH}`} className="wordmark block h-auto w-full" strokeLinecap="round">
      <path d={unlit} stroke="var(--line)" strokeWidth={6} />
      <path d={lit} stroke="var(--blue)" strokeWidth={7} />
    </svg>
  );
}
