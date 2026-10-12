import { caseStudySlugs, loadCaseStudy } from "@/lib/case-studies";
import { ogImage } from "@/lib/og";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function GET(_request: Request, { params }: RouteContext<"/work/[slug]/og.png">) {
  const { slug } = await params;
  const { meta } = await loadCaseStudy(slug);
  return ogImage({ title: `${meta.title} case study`, number: meta.number });
}
