import { isReady } from "@/lib/site";
import { pointById } from "@/lib/map";

type MapSidePanelProps = {
  selected: number;
  onSelect?: (id: number) => void;
};

export function MapSidePanel({ selected, onSelect }: MapSidePanelProps) {
  const point = pointById(selected);
  const [ctaLabel, ctaHref] = point.cta;
  const [metricValue, metricLabel] = point.metric;
  const external = ctaHref.startsWith("http");

  return (
    <div aria-live="polite" className="flex flex-col gap-3.5 rounded-[28px] border border-line bg-card p-6 md:p-[26px]">
      <div className="flex items-center justify-between gap-2.5">
        <span className="text-[13px] font-semibold text-blue-text">{point.tag}</span>
        <span className="font-num text-base text-ink-2">{point.year}</span>
      </div>
      <h3 className="text-[28px] leading-[1.02] tracking-[-0.04em] font-stretch-[115%] md:text-[32px]">{point.name}</h3>
      <p className="text-[15px] leading-[1.55] text-ink-2">{point.desc}</p>
      <p className="flex items-baseline gap-2.5 rounded-[16px] bg-tint px-4 py-3.5 text-blue-text">
        <span className="font-num text-[40px] leading-none">{metricValue}</span>
        <span className="text-sm font-semibold">{metricLabel}</span>
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {point.stack.map((item) => (
          <li key={item} className="rounded-full border border-line px-2.5 py-1 text-xs font-semibold">
            {item}
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-1 border-t border-line pt-3">
        <span className="pb-1 text-[13px] font-semibold text-ink-2">Closest on the map</span>
        {point.neighbours.map(([id, similarity]) => (
          <button
            key={id}
            type="button"
            onClick={onSelect && (() => onSelect(id))}
            className="grid min-h-[34px] grid-cols-[minmax(0,1fr)_70px_44px] items-center gap-2.5 text-left text-sm font-semibold text-ink"
          >
            <span>{pointById(id).name}</span>
            <span className="h-1.5 overflow-hidden rounded-full bg-line">
              <span className="block h-full rounded-full bg-blue" style={{ width: `${similarity * 100}%` }} />
            </span>
            <span className="font-num text-right text-sm text-blue-text">{similarity.toFixed(2)}</span>
          </button>
        ))}
      </div>
      {isReady(ctaHref) && (
        <a
          href={ctaHref}
          {...(external && { target: "_blank", rel: "noopener" })}
          className="mt-auto inline-flex min-h-[46px] items-center justify-center rounded-[14px] bg-blue px-4 font-bold text-on-blue transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--blue)_88%,black)]"
        >
          {ctaLabel}
          <span className="sr-only">: {point.name}</span>
        </a>
      )}
    </div>
  );
}
