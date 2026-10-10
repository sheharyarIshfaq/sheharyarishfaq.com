import type { ReactNode } from "react";

type FigureFrameProps = {
  caption: ReactNode;
  description?: string;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function FigureFrame({ caption, description, action, children, className = "" }: FigureFrameProps) {
  return (
    <figure className="m-0 flex flex-col gap-2.5">
      <div className={`rounded-[22px] border border-line bg-panel ${className}`}>{children}</div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <figcaption className="text-sm leading-normal text-ink-2">
          {caption}
          {description && <span className="sr-only"> {description}</span>}
        </figcaption>
        {action}
      </div>
    </figure>
  );
}
