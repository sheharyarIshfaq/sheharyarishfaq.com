import home from "@content/home.json";
import pages from "@content/pages.json";
import work from "@content/work.json";
import { Section } from "@/components/case-study/blocks";
import { Chip } from "@/components/ui/Chip";
import { PageHeader } from "@/components/ui/PageHeader";
import { isAvailable } from "@/lib/files";
import { pointByName } from "@/lib/map";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

const { title, description, cvLabel } = pages.research;

export const metadata = pageMetadata({ title, description, path: "/research" });

const coursework = pointByName("CUDA and MPI");
const caracat = work.caseStudyNotFeatured.find((study) => study.slug === "caracat")!;
const birdclef = work.caseStudyNotFeatured.find((study) => study.slug === "birdclef")!;

export default function ResearchPage() {
  return (
    <main id="main" className="container-page pb-10">
      <PageHeader title={title} sub={home.now.sub}>
        <p>{home.now.text}</p>
      </PageHeader>

      <Section title={coursework.tag}>
        <p>{coursework.desc}</p>
        <ul className="flex flex-wrap gap-2">
          {coursework.stack.map((item) => (
            <li key={item} className="flex">
              <Chip>{item}</Chip>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={caracat.name}>
        <p>{caracat.summary}</p>
        <p>
          <a href={`/work/${caracat.slug}`} className="font-bold text-blue-text underline underline-offset-4">
            {pointByName("Caracat at LIP6").cta[0]}
          </a>
        </p>
      </Section>

      <Section title={birdclef.name}>
        <p>{birdclef.summary}</p>
        <p>
          <a href={`/work/${birdclef.slug}`} className="font-bold text-blue-text underline underline-offset-4">
            {pointByName("BirdCLEF+").cta[0]}
          </a>
        </p>
      </Section>

      {isAvailable(site.links.cvAcademic) && (
        <a
          href={site.links.cvAcademic}
          download
          className="inline-flex min-h-[50px] items-center rounded-[14px] bg-blue px-6 font-bold text-on-blue"
        >
          {cvLabel}
        </a>
      )}
    </main>
  );
}
