import type { MDXContent } from "mdx/types";

export type CaseStudyMeta = {
  title: string;
  number?: string;
  lede: string;
  description: string;
  facts: [label: string, value: string][];
  published: string;
};

type CaseStudyModule = { default: MDXContent; meta: CaseStudyMeta };

// The generic *.mdx module type doesn't know about the exported meta.
const caseStudy = (module: Promise<unknown>) => module as Promise<CaseStudyModule>;

// In reading order; the "Next" link at the end of each case study follows it.
const modules: Record<string, () => Promise<CaseStudyModule>> = {
  mavera: () => caseStudy(import("@content/work/mavera.mdx")),
};

export const caseStudySlugs = Object.keys(modules);

export async function loadCaseStudy(slug: string) {
  return modules[slug]();
}

export async function nextCaseStudy(slug: string) {
  const index = caseStudySlugs.indexOf(slug);
  const next = caseStudySlugs[index + 1];
  return next ? { slug: next, meta: (await loadCaseStudy(next)).meta } : null;
}
