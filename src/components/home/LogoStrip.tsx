import home from "@content/home.json";
import type { CSSProperties } from "react";
import { isAvailable } from "@/lib/files";
import { balancedLogoSize } from "@/lib/svg";

const LOGO_AREA = 2400;

export function LogoStrip() {
  const { lead, items } = home.logos;

  return (
    <section aria-label={lead} className="flex flex-col items-center gap-[22px] border-y border-line py-10 text-center">
      <p className="text-[15px] text-ink-2">{lead}</p>
      <ul className="group/logos grid w-full grid-cols-2 justify-items-center gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 md:gap-x-11">
        {items.map((logo) => {
          if (!isAvailable(logo.file)) {
            return (
              <li key={logo.name} className="flex h-11 items-center text-[24px] font-extrabold tracking-[-0.02em] text-ink-2 font-stretch-[105%]">
                {logo.name}
              </li>
            );
          }

          const size = balancedLogoSize(logo.file, LOGO_AREA, 22, 28);
          const fileDark = "fileDark" in logo ? logo.fileDark : undefined;
          // The grey is a mask over the theme's ink, so it matches both themes; on phones it draws at 72%, two to a row.
          const box = { "--w": `${size.width}px`, "--h": `${size.height}px` } as CSSProperties;
          const colour = "absolute inset-0 size-full object-contain opacity-0 transition-opacity duration-300 group-hover/logos:opacity-100";

          return (
            <li key={logo.name} className="flex h-11 items-center last:odd:col-span-2">
              <span
                role="img"
                aria-label={logo.name}
                className="relative block h-[calc(var(--h)*0.72)] w-[calc(var(--w)*0.72)] sm:h-(--h) sm:w-(--w)"
                style={box}
              >
                <span
                  className="absolute inset-0 bg-ink-2 transition-opacity duration-300 group-hover/logos:opacity-0"
                  style={{ mask: `url(${logo.file}) center / contain no-repeat` }}
                />
                {/* Hovering the strip shows every logo in its own colours, with a reversed version where the brand colour is too dark for the dark theme. */}
                <img src={logo.file} alt="" loading="lazy" className={`${colour} ${fileDark ? "dark:hidden" : ""}`} />
                {fileDark && <img src={fileDark} alt="" loading="lazy" className={`${colour} hidden dark:block`} />}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
