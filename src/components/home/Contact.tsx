import home from "@content/home.json";
import { trackLink } from "@/lib/analytics";
import { isReady, site } from "@/lib/site";
import { CopyEmail } from "./CopyEmail";

export function Contact() {
  const { title, text, copyLabel, copiedLabel } = home.contact;
  const links = [
    ["LinkedIn", site.links.linkedin],
    ["GitHub", site.links.github],
    ["Medium", site.links.medium],
  ].filter(([, href]) => isReady(href));

  return (
    <section id="contact" aria-labelledby="contact-title" className="pt-(--section-gap) pb-14">
      <div className="relative grid items-center gap-10 overflow-hidden rounded-[32px] bg-blue p-8 text-on-blue md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:p-16">
        <svg
          aria-hidden="true"
          viewBox="0 0 34 30"
          className="absolute -right-[60px] -bottom-[120px] h-[370px] w-[420px] opacity-[0.14]"
        >
          <polygon points="17,18 32,23 17,28 2,23" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <polygon points="17,11 32,16 17,21 2,16" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <polygon points="17,2 32,7 17,12 2,7" fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        <div className="relative flex flex-col gap-3.5">
          <h2 id="contact-title" className="text-[38px] leading-[0.98] tracking-[-0.05em] font-stretch-[120%] md:text-[60px]">
            {title}
          </h2>
          <p className="max-w-[520px] text-[17px] leading-[1.55] md:text-lg">{text}</p>
        </div>
        <div className="relative flex flex-col gap-3">
          <CopyEmail email={site.email} label={copyLabel} copiedLabel={copiedLabel} />
          <ul className="flex justify-center gap-[22px] text-[15px] font-semibold">
            {links.map(([label, href]) => (
              <li key={label}>
                <a href={href} {...trackLink(href)} target="_blank" rel="noopener me" className="underline decoration-2 underline-offset-4">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
