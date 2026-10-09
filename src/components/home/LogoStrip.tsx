import home from "@content/home.json";
import { isAvailable } from "@/lib/files";
import { svgWidthAt } from "@/lib/svg";

const LOGO_HEIGHT = 26;

export function LogoStrip() {
  const { lead, items } = home.logos;

  return (
    <section aria-label={lead} className="flex flex-col items-center gap-[22px] border-y border-line py-10 text-center">
      <p className="text-[15px] text-ink-2">{lead}</p>
      <ul className="flex flex-wrap items-center justify-center gap-x-14 gap-y-3">
        {items.map((logo) => (
          <li key={logo.name} className="flex h-11 items-center">
            {isAvailable(logo.file) ? (
              // A mask lets the logo take the theme's grey instead of its own colours.
              <span
                role="img"
                aria-label={logo.name}
                className="block bg-ink-2"
                style={{
                  width: svgWidthAt(logo.file, LOGO_HEIGHT),
                  height: LOGO_HEIGHT,
                  mask: `url(${logo.file}) center / contain no-repeat`,
                }}
              />
            ) : (
              <span className="text-[24px] font-extrabold tracking-[-0.02em] text-ink-2 font-stretch-[105%]">
                {logo.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
