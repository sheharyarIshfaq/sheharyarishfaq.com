import home from "@content/home.json";
import pages from "@content/pages.json";
import Link from "next/link";
import type { ReactNode } from "react";
import { LogoMark } from "@/components/Logo";
import { isAvailable } from "@/lib/files";
import { site } from "@/lib/site";

const morePages = [
  { href: "/now", label: home.now.title },
  { href: "/research", label: pages.research.title },
  { href: "/colophon", label: pages.colophon.title },
];

const elsewhere = [
  { href: site.links.linkedin, label: "LinkedIn" },
  { href: site.links.github, label: "GitHub" },
  { href: site.links.medium, label: "Medium" },
  { href: site.links.fiverr, label: "Fiverr" },
  { href: site.links.cv, label: "CV" },
].filter((link) => isAvailable(link.href));

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <nav aria-label={title} className="flex flex-col gap-3">
      <p className="text-[13px] font-semibold text-ink-2">{title}</p>
      <ul className="flex flex-col gap-2 text-[15px]">{children}</ul>
    </nav>
  );
}

const linkClass = "text-ink transition-colors duration-300 hover:text-blue-text";

export function SiteFooter() {
  const { footer, hero } = home;
  const place = hero.floatingCards.find((card) => card.dot);

  return (
    <footer className="container-page">
      <div className="grid gap-10 border-t border-line pt-12 pb-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex flex-col items-start gap-4">
          <Link href="/" className="flex items-center gap-3 text-ink">
            <LogoMark className="h-[27px] w-[30px]" />
            <span className="text-[17px] font-extrabold tracking-[-0.02em] font-stretch-[115%]">{site.name}</span>
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full bg-tint py-1.5 pr-3 pl-2.5 text-[13px] font-medium text-blue-text">
            <span className="size-2 shrink-0 animate-pulse-ring rounded-full bg-green motion-reduce:animate-none" />
            {site.availability.pill}
          </span>
          <a href={`mailto:${site.email}`} className="text-link text-[15px] font-semibold">
            {site.email}
          </a>
          {place && (
            <p className="text-sm text-ink-2">
              {place.title}, {place.sub}
            </p>
          )}
        </div>

        <Column title={footer.more}>
          {morePages.map((page) => (
            <li key={page.href}>
              <Link href={page.href} className={linkClass}>
                {page.label}
              </Link>
            </li>
          ))}
        </Column>

        <Column title={footer.elsewhere}>
          {elsewhere.map((link) => (
            <li key={link.label}>
              <a href={link.href} {...(link.href.startsWith("http") && { target: "_blank", rel: "noopener me" })} className={linkClass}>
                {link.label}
              </a>
            </li>
          ))}
        </Column>
      </div>


      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5 pb-10 text-sm text-ink-2">
        <p className="group flex items-center gap-1.5">
          {footer.madeWith}
          <svg aria-label="love" role="img" viewBox="0 0 24 24" className="size-4 fill-blue group-hover:animate-beat">
            <path d="M12 20.5s-7.5-4.6-9.4-9.3C1.3 8 3.3 4.5 6.8 4.5c2.1 0 3.6 1.2 4.4 2.6.8-1.4 2.3-2.6 4.4-2.6 3.5 0 5.5 3.5 4.2 6.7-1.9 4.7-9.8 9.3-9.8 9.3Z" />
          </svg>
          {footer.madeIn}
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4 text-blue-text">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
          </svg>
        </p>
        <a href="#" className="transition-colors duration-300 hover:text-ink">
          {footer.backToTop}
        </a>
      </div>
    </footer>
  );
}
