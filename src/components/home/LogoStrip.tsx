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
      <ul className="grid w-full grid-cols-2 justify-items-center gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 md:gap-x-11">
        {items.map((logo) => {
          if (!isAvailable(logo.file)) {
            return (
              <li key={logo.name} className="flex h-11 items-center text-[24px] font-extrabold tracking-[-0.02em] text-ink-2 font-stretch-[105%]">
                {logo.name}
              </li>
            );
          }

          const size = balancedLogoSize(logo.file, LOGO_AREA, 22, 28);
          // A mask lets the logo take the theme's grey instead of its own colours.
          // On phones it draws at 72%, two to a row.
          const style = {
            "--w": `${size.width}px`,
            "--h": `${size.height}px`,
            mask: `url(${logo.file}) center / contain no-repeat`,
          } as CSSProperties;

          return (
            <li key={logo.name} className="flex h-11 items-center last:odd:col-span-2">
              <span
                role="img"
                aria-label={logo.name}
                className="block h-[calc(var(--h)*0.72)] w-[calc(var(--w)*0.72)] bg-ink-2 sm:h-(--h) sm:w-(--w)"
                style={style}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
