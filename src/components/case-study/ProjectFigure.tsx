import { FanOut } from "@/components/figures/FanOut";
import { QuoteCheckFigure } from "@/components/figures/lazy";
import { QuoteCheckView } from "@/components/figures/QuoteCheckView";
import { WhenVisible } from "@/components/WhenVisible";
import { projects } from "@/lib/work";

// The homepage figure for a project, reused on its case study.
export function ProjectFigure({ slug }: { slug: string }) {
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) return null;

  switch (project.figure) {
    case "quote-check":
      return (
        <WhenVisible fallback={<QuoteCheckView data={project.quoteCheck} checked={false} />}>
          <QuoteCheckFigure data={project.quoteCheck} />
        </WhenVisible>
      );
    case "fan-out":
      return <FanOut data={project.fanOut} />;
    default:
      return null;
  }
}
