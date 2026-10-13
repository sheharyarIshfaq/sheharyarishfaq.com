import home from "@content/home.json";
import pages from "@content/pages.json";
import Link from "next/link";

export function SiteFooter() {
  const { left, right } = home.footer;

  return (
    <footer className="container-page">
      <div className="flex flex-wrap justify-between gap-4 border-t border-line pt-[22px] pb-10 text-sm text-ink-2">
        <span>{left}</span>
        <nav aria-label="More pages">
          <ul className="flex gap-5">
            {[
              ["/now", home.now.title],
              ["/research", pages.research.title],
              ["/colophon", pages.colophon.title],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="transition-colors duration-300 hover:text-ink">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <span>
          {right.text}{" "}
          <a href={right.href} className="text-link text-ink">
            {right.link}
          </a>
        </span>
      </div>
    </footer>
  );
}
