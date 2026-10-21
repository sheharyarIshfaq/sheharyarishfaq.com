import home from "@content/home.json";
import { trackLink } from "@/lib/analytics";
import { isReady } from "@/lib/site";
import { ArticleCover } from "./ArticleCover";

type Article = (typeof home.writing.items)[number] & { metric?: string; metricLabel?: string; featured?: boolean };

function Meta({ article }: { article: Article }) {
  return (
    <p className="flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-ink-2">
      <span>{article.date}</span>
      <span>{article.readTime}</span>
    </p>
  );
}

export function Writing() {
  const { title, sub, more } = home.writing;
  const articles = (home.writing.items as Article[]).filter((article) => isReady(article.href));
  const featured = articles.find((article) => article.featured);
  const rest = articles.filter((article) => article !== featured);

  if (articles.length === 0) return null;

  return (
    <section aria-labelledby="writing-title" className="grid gap-8 pt-(--section-gap) md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-12">
      <div className="flex flex-col gap-3">
        <h2 id="writing-title" className="text-[32px] leading-[1.02] md:text-[46px]">
          {title}
        </h2>
        <p className="text-[15px] text-ink-2">{sub}</p>
        {isReady(more.href) && (
          <a href={more.href} {...trackLink(more.href)} target="_blank" rel="noopener" className="pt-2 font-bold text-blue-text underline underline-offset-4">
            {more.label}
          </a>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {featured && (
          <a
            href={featured.href}
            {...trackLink(featured.href)}
            target="_blank"
            rel="noopener"
            className="group grid gap-5 rounded-[22px] border border-line bg-card p-4 transition-colors duration-300 hover:border-plate-line sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] sm:p-5"
          >
            <ArticleCover cover={featured.cover} />
            <div className="flex flex-col gap-2.5 sm:py-1">
              <span className="text-xl leading-[1.2] font-extrabold tracking-[-0.02em] font-stretch-[108%] transition-colors duration-300 group-hover:text-blue-text md:text-[22px]">
                {featured.title}
              </span>
              <span className="text-[15px] leading-normal text-ink-2">{featured.summary}</span>
              <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-2">
                <Meta article={featured} />
                {featured.metric && (
                  <span className="flex items-baseline gap-2">
                    <span className="font-num text-[26px] leading-none text-blue-text">{featured.metric}</span>
                    <span className="text-[13px] text-ink-2">{featured.metricLabel}</span>
                  </span>
                )}
              </div>
            </div>
          </a>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {rest.map((article) => (
            <a
              key={article.href}
              href={article.href}
              {...trackLink(article.href)}
              target="_blank"
              rel="noopener"
              className="group flex flex-col gap-3 rounded-[22px] border border-line bg-card p-4 transition-colors duration-300 hover:border-plate-line"
            >
              <ArticleCover cover={article.cover} />
              <span className="pt-1 text-lg leading-[1.25] font-extrabold tracking-[-0.02em] font-stretch-[108%] transition-colors duration-300 group-hover:text-blue-text">
                {article.title}
              </span>
              <span className="text-sm leading-normal text-ink-2">{article.summary}</span>
              <div className="mt-auto pt-1">
                <Meta article={article} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
