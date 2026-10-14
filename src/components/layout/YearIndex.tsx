import Link from "next/link";
import { points } from "@/lib/map";
import { isReady } from "@/lib/site";

// Everything on the map, listed by the year it started, newest last like the map's timeline.
const byYear = [...new Set(points.map((point) => point.year))]
  .sort()
  .map((year) => ({ year, items: points.filter((point) => point.year === year) }));

export function YearIndex() {
  return (
    <ol className="grid border-t border-line pt-8 pb-2 md:grid-cols-5 md:gap-6">
      {byYear.map(({ year, items }) => (
        <li key={year} className="grid grid-cols-[56px_minmax(0,1fr)] gap-4 border-b border-line py-4 last:border-b-0 md:flex md:flex-col md:gap-3 md:border-0 md:py-0">
          <div className="flex flex-col gap-2">
            <span className="hidden h-1 rounded-full bg-blue md:block" />
            <span className="font-num text-[13px] text-blue-text">{year}</span>
          </div>
          <ul className="flex flex-col gap-1.5 text-sm">
            {items.map((item) => {
              const [label, href] = item.cta;
              if (!isReady(href)) return <li key={item.id} className="text-ink-2">{item.name}</li>;
              const external = href.startsWith("http");
              return (
                <li key={item.id}>
                  <Link
                    href={href}
                    {...(external && { target: "_blank", rel: "noopener" })}
                    className="text-ink-2 transition-colors duration-300 hover:text-ink"
                  >
                    {item.name}
                    <span className="sr-only">: {label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ol>
  );
}
