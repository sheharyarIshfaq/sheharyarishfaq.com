import home from "@content/home.json";
import { Picture } from "@/components/Picture";
import { site } from "@/lib/site";

export function About() {
  const { title, text, facts } = home.about;
  const photo = site.images.about;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="grid items-start gap-8 pt-(--section-gap) md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-12"
    >
      <figure className="m-0 flex max-w-[420px] flex-col gap-2.5 md:max-w-none">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line bg-panel">
          <Picture image="about" sizes="(min-width: 768px) 420px, 100vw" className="absolute inset-0 size-full object-cover" />
        </div>
        <figcaption className="text-[13px] text-ink-2">
          <a href={photo.captionHref} target="_blank" rel="noopener" className="text-link">
            {photo.caption}
          </a>
        </figcaption>
      </figure>
      <div className="flex flex-col gap-5">
        <h2 id="about-title" className="text-[32px] leading-[1.02] md:text-[46px]">
          {title}
        </h2>
        <p className="max-w-[68ch] text-[17px] leading-[1.65] md:text-[19px]">{text}</p>
        <dl className="grid gap-x-8 pt-2 sm:grid-cols-2">
          {facts.map(([term, value]) => (
            <div key={term} className="border-t border-line py-3">
              <dt className="text-[13px] text-ink-2">{term}</dt>
              <dd className="pt-0.5 text-base font-bold">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
