import home from "@content/home.json";
import { KernelFigure } from "@/components/figures/lazy";
import { KernelView } from "@/components/figures/KernelView";
import { WhenVisible } from "@/components/WhenVisible";
import { BLOCKS } from "@/lib/kernel";

export function Now() {
  const { title, sub, text, kernelLabel, caption, button } = home.now;
  const kernel = { label: kernelLabel, caption, button };

  return (
    <section aria-labelledby="now-title" className="grid gap-8 pt-(--section-gap) md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-12">
      <div className="flex flex-col gap-3">
        <h2 id="now-title" className="text-[32px] leading-[1.02] md:text-[46px]">
          {title}
        </h2>
        <p className="text-[15px] text-ink-2">{sub}</p>
      </div>
      <div className="flex flex-col gap-6">
        <p className="max-w-[68ch] text-[17px] leading-[1.65] md:text-[19px]">{text}</p>
        <WhenVisible fallback={<KernelView {...kernel} finished={BLOCKS} pending />}>
          <KernelFigure {...kernel} />
        </WhenVisible>
      </div>
    </section>
  );
}
