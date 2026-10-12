import { BLOCK_WIDTH, BLOCKS, isLit, ROWS, WORD } from "@/lib/kernel";

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

export function KernelView({ label, caption, button, finished, pending = finished === null, onRun }: KernelViewProps) {
  return (
    <figure className="m-0 flex flex-col gap-2.5">
      <div className="flex flex-col gap-3 rounded-[22px] border border-line bg-panel p-4 md:p-6">
        <span className="font-num text-base text-ink-2">{label}</span>
        <div aria-hidden="true" data-kernel={pending ? "pending" : "running"} className="flex gap-[5px] md:gap-2">
          {Array.from({ length: BLOCKS }, (_, block) => {
            const done = finished !== null && block < finished;
            const running = finished !== null && block === finished;
            return (
              <div key={block} className="grid flex-1 grid-cols-8 gap-px md:gap-[3px]">
                {Array.from({ length: ROWS * BLOCK_WIDTH }, (_, index) => {
                  const x = block * BLOCK_WIDTH + (index % BLOCK_WIDTH);
                  const y = Math.floor(index / BLOCK_WIDTH);
                  const lit = isLit(x, y);
                  const tone =
                    lit && done ? "bg-blue" : lit && running ? "scale-125 bg-warm" : done || running ? "bg-soft" : "bg-line opacity-55";
                  return <span key={index} className={`kernel-cell block aspect-square rounded-full transition-[background-color,scale] duration-[250ms] ${tone}`} />;
                })}
              </div>
            );
          })}
        </div>
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
