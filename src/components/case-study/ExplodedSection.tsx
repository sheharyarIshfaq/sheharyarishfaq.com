import data from "@content/work/mavera-layers.json";
import { ExplodedView, layers, TOP_LAYER } from "@/components/figures/ExplodedView";
import { ExplodedFigure } from "@/components/figures/lazy";
import { WhenVisible } from "@/components/WhenVisible";
import { Section } from "./blocks";

export function ExplodedSection() {
  const description = layers.map((layer) => `${layer.title}: ${layer.description}`).join(" ");

  return (
    <Section title={data.title} intro={data.intro}>
      <figure className="m-0">
        <WhenVisible fallback={<ExplodedView active={TOP_LAYER} />}>
          <ExplodedFigure />
        </WhenVisible>
        <figcaption className="sr-only">{description}</figcaption>
      </figure>
    </Section>
  );
}
