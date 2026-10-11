import home from "@content/home.json";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Recommendations() {
  const { title, items, more } = home.recommendations;

  return (
    <section aria-labelledby="recommendations-title" className="flex flex-col gap-7 pt-(--section-gap)">
      <SectionHeader id="recommendations-title" title={title} />
      <div className="grid gap-4 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        {items.map((item) =>
          item.style === "featured" ? (
            <figure key={item.name} className="m-0 flex flex-col justify-between gap-7 rounded-[28px] bg-blue p-7 text-on-blue md:p-9">
              <span aria-hidden="true" className="font-num text-[64px] leading-[0.6] opacity-60">
                “
              </span>
              <blockquote className="text-[22px] leading-[1.3] font-bold tracking-[-0.02em] font-stretch-[108%] md:text-[28px]">
                {item.quote}
              </blockquote>
              <figcaption className="flex flex-col gap-0.5">
                <b className="text-[17px]">{item.name}</b>
                <span className="text-sm">{item.role}</span>
              </figcaption>
            </figure>
          ) : (
            <figure key={item.name} className="m-0 flex flex-col justify-between gap-6 rounded-[28px] border border-line bg-card p-7 md:p-8">
              <span aria-hidden="true" className="font-num text-[56px] leading-[0.6] text-blue-text opacity-60">
                “
              </span>
              <blockquote className="text-[19px] leading-[1.4] font-semibold md:text-[21px]">{item.quote}</blockquote>
              <figcaption className="flex flex-col gap-0.5">
                <b className="text-base">{item.name}</b>
                <span className="text-sm text-ink-2">{item.role}</span>
              </figcaption>
            </figure>
          ),
        )}
      </div>
      <a href={more.href} target="_blank" rel="noopener" className="self-start font-bold text-blue-text underline underline-offset-4">
        {more.label}
      </a>
    </section>
  );
}
