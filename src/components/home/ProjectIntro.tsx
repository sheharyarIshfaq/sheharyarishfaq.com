import { Chip } from "@/components/ui/Chip";
import { Stamp } from "@/components/ui/Stamp";
import type { Project } from "@/lib/work";

export function ProjectIntro({ project }: { project: Project }) {
  const external = project.link.href.startsWith("http");

  return (
    <div className="flex flex-col items-start gap-3">
      <span className="font-num text-[40px] leading-none text-blue-text">{project.number}</span>
      <h3 id={`${project.slug}-title`} className="text-[30px] tracking-[-0.04em] md:text-[40px]">{project.name}</h3>
      <p className="text-[15px] text-ink-2">{project.meta}</p>
      {project.chips && (
        <ul className="flex flex-wrap gap-2 pt-1.5">
          {project.chips.map((chip) => (
            <li key={chip} className="flex">
              <Chip>{chip}</Chip>
            </li>
          ))}
        </ul>
      )}
      {project.stamp && <Stamp className="mt-2.5">{project.stamp}</Stamp>}
      <a
        href={project.link.href}
        {...(external && { target: "_blank", rel: "noopener" })}
        className="pt-2 font-bold text-blue-text underline underline-offset-4"
      >
        {project.link.label}
        <span className="sr-only">: {project.name}</span>
      </a>
    </div>
  );
}
