import { AttentionView } from "@/components/figures/AttentionView";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { attention, describeFocus } from "@/lib/attention";

export function Attention() {
  return (
    <section aria-labelledby="attention-title" className="flex flex-col gap-[22px] pt-(--section-gap)">
      <SectionHeader id="attention-title" title={attention.title} intro={attention.intro} />
      <figure className="m-0 flex flex-col gap-2.5">
        <AttentionView active={0} />
        <figcaption className="text-[15px] text-ink-2">
          Weights are set by hand to tell the story.
          <span className="sr-only"> {describeFocus(0)}</span>
        </figcaption>
      </figure>
    </section>
  );
}
