export type Route = {
  path: string;
  // Case studies take their sitemap date from their `published` field.
  caseStudy?: string;
  // Reachable by link, but kept out of search results and the sitemap.
  noindex?: true;
};

export const routes: Route[] = [
  { path: "/" },
  ...["mavera", "bina", "aiwrappers", "caracat", "birdclef"].map((slug) => ({ path: `/work/${slug}`, caseStudy: slug })),
  { path: "/research" },
  { path: "/hire", noindex: true },
  { path: "/now" },
  { path: "/colophon" },
  { path: "/privacy" },
];
