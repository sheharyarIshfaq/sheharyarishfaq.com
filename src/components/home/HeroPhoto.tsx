import home from "@content/home.json";
import Image from "next/image";
import { site } from "@/lib/site";

const cardPositions = {
  "top-left": "left-3 top-[14%] md:left-0 md:top-[18%]",
  "bottom-right": "right-3 bottom-[8%] md:right-0 md:bottom-[12%]",
};

export function HeroPhoto() {
  const { hero } = site.images;

  return (
    <figure className="relative m-0 w-full max-w-[560px] px-2 py-4 sm:px-6 md:py-6 md:pr-7 md:pl-10 lg:max-w-none">
      <span
        aria-hidden="true"
        className="absolute top-8 right-0 bottom-1 left-10 rotate-4 rounded-[32px] bg-soft md:top-11 md:right-2 md:bottom-1.5 md:left-[70px] md:rounded-[40px]"
      />
      <div className="relative aspect-[4/4.6] overflow-hidden rounded-[32px] border-[6px] border-card bg-panel shadow-(--shadow-photo) md:rounded-[36px]">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          sizes="(min-width: 768px) 560px, 100vw"
          className="object-cover"
          style={{ objectPosition: hero.objectPosition }}
        />
      </div>
      {home.hero.floatingCards.map((card) => (
        <span
          key={card.title}
          className={`absolute flex items-center gap-2.5 rounded-[18px] border border-line bg-card py-2.5 pr-3.5 pl-2.5 shadow-(--shadow-float) ${cardPositions[card.position as keyof typeof cardPositions]}`}
        >
          {card.badge ? (
            <span className="font-num inline-flex size-[30px] items-center justify-center rounded-[10px] bg-tint text-[13px] text-blue-text">
              {card.badge}
            </span>
          ) : (
            <span className="ml-1.5 size-2 rounded-full bg-green" />
          )}
          <span className="flex flex-col leading-tight">
            <b className="text-sm font-bold">{card.title}</b>
            <span className="text-xs text-ink-2">{card.sub}</span>
          </span>
        </span>
      ))}
    </figure>
  );
}
