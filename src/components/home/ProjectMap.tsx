import { MapView } from "@/components/figures/map/MapView";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DEFAULT_POINT, HAND_SET_FOOTNOTE, latestYear, mapData, points } from "@/lib/map";

export function ProjectMap() {
  const clusters = mapData.clusterLabels.map((label) => label.label).join(", ");
  const description = `${points.length} projects and ${mapData.freelanceCloud.count} freelance dots, grouped into ${clusters}.`;

  return (
    <section id="map" aria-labelledby="map-title" className="flex flex-col gap-[22px] pt-(--section-gap)">
      <SectionHeader id="map-title" title={mapData.title} intro={mapData.intro} />
      <figure className="m-0 flex flex-col gap-[22px]">
        <MapView selected={DEFAULT_POINT} filter="all" year={latestYear} playing={false} />
        <figcaption className="text-[13px] text-ink-2">
          {HAND_SET_FOOTNOTE}
          <span className="sr-only"> {description}</span>
        </figcaption>
      </figure>
    </section>
  );
}
