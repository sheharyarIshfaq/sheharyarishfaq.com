import home from "@content/home.json";
import { isReady } from "@/lib/site";

type Article = (typeof home.writing.items)[number] & {
  summary?: string;
  metric?: string;
  metricLabel?: string;
  repo?: string;
  featured?: boolean;
  date?: string;
};

export function Writing() {
  const { title, sub } = home.writing;
  // Articles without a real link yet are left out; the featured one falls back to its code on GitHub.
  const items = (home.writing.items as Article[])
    .map((item) => ({ ...item, href: isReady(item.href) ? item.href : item.repo }))
    .filter((item): item is Article & { href: string } => isReady(item.href) && isReady(item.title));

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="writing-title" className="grid gap-8 pt-(--section-gap) md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-12">
      <div className="flex flex-col gap-3">
        <h2 id="writing-title" className="text-[32px] leading-[1.02] md:text-[46px]">
          {title}
        </h2>
        <p className="text-[15px] text-ink-2">{sub}</p>
      </div>
      <ul className="flex flex-col gap-3">
        {items.map((item) =>
          item.featured ? (
            <li key={item.title}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener"
                className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-2 rounded-[22px] border border-line bg-card p-6 transition-colors duration-300 hover:border-plate-line md:p-[26px]"
              >
                <span className="text-xl leading-[1.2] font-extrabold tracking-[-0.02em] font-stretch-[108%] md:text-[22px]">{item.title}</span>
                <span className="font-num text-right text-[26px] text-blue-text">{item.metric}</span>
                <span className="text-[15px] leading-normal text-ink-2">{item.summary}</span>
                <span className="text-right text-[13px] text-ink-2">{item.metricLabel}</span>
              </a>
            </li>
          ) : (
            <li key={item.title}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener"
                className="flex justify-between gap-6 rounded-[18px] border border-line px-6 py-5 text-[17px] font-semibold transition-colors duration-300 hover:border-plate-line md:px-[26px]"
              >
                <span>{item.title}</span>
                {item.date && <span className="text-sm font-normal text-ink-2">{item.date}</span>}
              </a>
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
