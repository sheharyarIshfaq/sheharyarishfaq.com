import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { trackLink } from "@/lib/analytics";
import { isAvailable } from "@/lib/files";
import { site } from "@/lib/site";
import { MobileMenu } from "./MobileMenu";
import { StickyHeader } from "./StickyHeader";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const links = site.nav.filter((link) => isAvailable(link.href));

  return (
    <StickyHeader>
      <div className="container-page relative flex items-center justify-between gap-5 py-[22px]">
        <Link href="/" className="flex items-center gap-3 text-ink">
          <LogoMark className="h-[27px] w-[30px]" />
          <span className="whitespace-nowrap text-[17px] font-extrabold tracking-[-0.02em] font-stretch-[115%]">{site.name}</span>
          <span className="sr-only">, home</span>
        </Link>
        <div className="flex items-center gap-[26px]">
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-[26px] text-[15px] font-medium text-ink-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} {...trackLink(link.href)} className="transition-colors duration-300 hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <MobileMenu links={links} />
          </div>
        </div>
      </div>
    </StickyHeader>
  );
}
