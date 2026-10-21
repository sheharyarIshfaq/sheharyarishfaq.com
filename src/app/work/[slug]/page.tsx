import Link from "next/link";
import { ReadTracker } from "@/components/case-study/ReadTracker";
import { JsonLd } from "@/components/JsonLd";
import { trackLink } from "@/lib/analytics";
import { caseStudySlugs, loadCaseStudy, nextCaseStudy } from "@/lib/case-studies";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, WEBSITE_ID } from "@/lib/site";
import { breadcrumbs, personReference } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const { meta } = await loadCaseStudy(slug);
  return pageMetadata({
    title: `${meta.title} case study: ${meta.role}`,
    description: meta.description,
    path: `/work/${slug}`,
    type: "article",
    image: `/work/${slug}/og.png`,
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const { default: Content, meta } = await loadCaseStudy(slug);
  const next = await nextCaseStudy(slug);
  const path = `/work/${slug}`;

  return (
    <main id="main" className="container-page">
      <article aria-labelledby="case-study-title" className="relative">
        <ReadTracker slug={slug} />
        <header className="flex max-w-[900px] flex-col gap-[18px] pt-10 pb-10 md:pt-16">
          {meta.number && <span className="font-num text-[40px] leading-none text-blue-text">{meta.number}</span>}
          <h1 id="case-study-title" className="text-[44px] leading-[0.98] font-[880] tracking-[-0.05em] font-stretch-[120%] md:text-[72px]">
            {meta.title}
          </h1>
          <p className="text-lg leading-normal text-ink-2 md:text-[22px]">{meta.lede}</p>
        </header>

        <dl className="mb-10 grid grid-cols-2 border-y border-line md:grid-cols-4">
          {meta.facts.map(([label, value], index) => (
            <div
              key={label}
              className={`py-5 ${index % 2 ? "border-l border-line pl-5" : "pr-5"} md:px-5 md:first:pl-0 ${index > 0 ? "md:border-l md:border-line" : ""} ${index > 1 ? "max-md:border-t max-md:border-line" : ""}`}
            >
              <dt className="text-[13px] text-ink-2">{label}</dt>
              <dd className="mt-1 text-[17px] font-bold">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="pt-6 md:pt-14">
          <Content />
        </div>

        <nav aria-label="Case studies" className="flex flex-wrap items-center justify-between gap-5 border-t border-line pt-7 pb-14">
          <Link href="/#work" className="text-base font-semibold text-ink-2 hover:text-ink">
            All work
          </Link>
          {next && (
            <Link href={`/work/${next.slug}`} {...trackLink(`/work/${next.slug}`)} className="flex items-center gap-3.5">
              <span className="text-sm text-ink-2">Next</span>
              {next.meta.number && <span className="font-num text-[22px] text-blue-text">{next.meta.number}</span>}
              <span className="text-2xl font-[850] tracking-[-0.03em] font-stretch-[115%]">{next.meta.title}</span>
            </Link>
          )}
        </nav>
      </article>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: meta.title,
          headline: `${meta.title} case study`,
          description: meta.description,
          url: absoluteUrl(path),
          image: absoluteUrl(`${path}/og.png`),
          datePublished: meta.published,
          author: personReference,
          inLanguage: "en-GB",
          isPartOf: { "@id": WEBSITE_ID },
          mainEntityOfPage: absoluteUrl(path),
        }}
      />
      <JsonLd data={breadcrumbs([{ name: "Work", path: "/#work" }, { name: meta.title, path }])} />
    </main>
  );
}
