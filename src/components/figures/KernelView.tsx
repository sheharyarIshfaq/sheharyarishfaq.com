import { BLOCK_WIDTH, BLOCKS, COLUMNS, isLit, ROWS, WORD } from "@/lib/kernel";

type KernelViewProps = {
  label: string;
  caption: string;
  button: string;
  // Blocks that have finished; the block after them is running. Null means not started yet.
  finished: number | null;
  // Set on the server version, which draws the finished word but lets CSS show the waiting grid when JavaScript runs.
  pending?: boolean;
  onRun?: () => void;
};

const PITCH = 10;
const BLOCK_GAP = 8;
const WIDTH = COLUMNS * PITCH + (BLOCKS - 1) * BLOCK_GAP;
const HEIGHT = ROWS * PITCH;

// Each dot is a zero-length segment with a round cap, so a whole block's dots fit in one path.
function dots(block: number, lit: boolean) {
  let d = "";
  for (let y = 0; y < ROWS; y++) {
    for (let column = 0; column < BLOCK_WIDTH; column++) {
      const x = block * BLOCK_WIDTH + column;
      if (isLit(x, y) !== lit) continue;
      d += `M${x * PITCH + block * BLOCK_GAP + PITCH / 2} ${y * PITCH + PITCH / 2}h0`;
    }
  }
  return d;
}

const blockDots = Array.from({ length: BLOCKS }, (_, block) => ({ unlit: dots(block, false), lit: dots(block, true) }));

export function KernelView({ label, caption, button, finished, pending = finished === null, onRun }: KernelViewProps) {
  return (
    <figure className="m-0 flex flex-col gap-2.5">
      <div className="flex flex-col gap-3 rounded-[22px] border border-line bg-panel p-4 md:p-6">
        <span className="font-num text-base text-ink-2">{label}</span>
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          data-kernel={pending ? "pending" : "running"}
          className="kernel h-auto w-full overflow-visible"
          strokeLinecap="round"
        >
          {blockDots.map(({ unlit, lit }, block) => {
            const done = finished !== null && block < finished;
            const running = finished !== null && block === finished;
            return (
              <g key={block}>
                <path d={unlit} className={done || running ? "on" : "off"} />
                <path d={lit} className={done ? "lit" : running ? "hot" : "off"} />
              </g>
            );
          })}
        </svg>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <figcaption className="text-sm text-ink-2">
          {caption}
          <span className="sr-only"> The lit dots spell {WORD}.</span>
        </figcaption>
        <button
          type="button"
          onClick={onRun}
          className="min-h-11 rounded-[12px] border border-line bg-card px-[18px] font-bold text-ink transition-colors duration-300 hover:border-plate-line"
        >
          {button}
        </button>
      </div>
    </figure>
  );
}
