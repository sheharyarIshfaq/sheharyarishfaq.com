import home from "@content/home.json";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { isAvailable } from "@/lib/files";
import { site } from "@/lib/site";
import { HeroPhoto } from "./HeroPhoto";

export function Hero() {
  const { hero } = home;

  return (
    <section className="grid items-center gap-9 pt-8 pb-12 md:pt-14 lg:grid-cols-2">
      <div className="flex flex-col gap-[22px]">
        <span className="inline-flex items-center gap-2 self-start rounded-full bg-tint py-[7px] pr-3.5 pl-[11px] text-sm leading-snug font-medium text-blue-text">
          <span className="size-2 shrink-0 animate-pulse-ring rounded-full bg-green motion-reduce:animate-none" />
          {site.availability.pill}
        </span>
        <p className="text-[15px] font-medium text-ink-2">
          <span className="text-blue" aria-hidden="true">
            ›
          </span>{" "}
          {hero.prompt}
        </p>
        <h1 className="text-[40px] leading-[1.04] md:text-[60px] lg:min-h-[190px]">{hero.bios[0]}</h1>
        <p className="max-w-[520px] text-[17px] leading-[1.6] text-ink-2">{hero.summary}</p>
        <div className="flex flex-wrap gap-2.5">
          <ButtonLink href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</ButtonLink>
          {isAvailable(hero.ctaSecondary.href) && (
            <ButtonLink href={hero.ctaSecondary.href} variant="secondary" download>
              {hero.ctaSecondary.label}
            </ButtonLink>
          )}
        </div>
      </div>
      <HeroPhoto />
    </section>
  );
}
