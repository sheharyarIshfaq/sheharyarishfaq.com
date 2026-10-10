import { TraceFigure } from "@/components/figures/lazy";
import { DEFAULT_SPAN, TraceView } from "@/components/figures/TraceView";
import { WhenVisible } from "@/components/WhenVisible";
import { FigureFrame } from "@/components/ui/FigureFrame";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { paragraphText, projects, work, type Project, type TraceProject } from "@/lib/work";
import { ProjectIntro } from "./ProjectIntro";

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="flex flex-col gap-16 pt-(--section-gap) md:gap-24">
      <SectionHeader id="work-title" title={work.title} />
      {projects.map((project) => (
        <article
          key={project.slug}
          aria-labelledby={`${project.slug}-title`}
          className="grid gap-8 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-12"
        >
          <ProjectIntro project={project} />
          <div className="flex flex-col gap-6">
            {project.context && <p className="text-[15px] leading-normal text-ink-2">{project.context}</p>}
            <ProjectBody project={project} />
          </div>
        </article>
      ))}
    </section>
  );
}

function ProjectBody({ project }: { project: Project }) {
  if (project.figure === "trace") {
    return (
      <WhenVisible className="flex flex-col gap-6" fallback={<TraceView project={project} active={DEFAULT_SPAN} grown={false} />}>
        <TraceFigure project={project} />
      </WhenVisible>
    );
  }

  return (
    <>
      <p className="max-w-[68ch] text-[17px] leading-[1.65] md:text-[19px]">{paragraphText(project.paragraph)}</p>
      <ProjectFigure project={project} />
    </>
  );
}

function ProjectFigure({ project }: { project: Exclude<Project, TraceProject> }) {
  switch (project.figure) {
    case "quote-check":
      return <FigureFrame caption={project.quoteCheck.caption} className="min-h-[260px]" />;
    case "fan-out":
      return <FigureFrame caption={project.fanOut.caption} className="h-[290px]" />;
  }
}
