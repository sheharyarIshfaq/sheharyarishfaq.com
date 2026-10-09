import home from "@content/home.json";
import { CountUpGrid } from "@/components/figures/CountUpGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Numbers() {
  const { title, items } = home.numbers;

  return (
    <section aria-labelledby="numbers-title" className="flex flex-col gap-7 pt-20 md:pt-[100px]">
      <SectionHeader id="numbers-title" title={title} />
      <CountUpGrid items={items} />
    </section>
  );
}
