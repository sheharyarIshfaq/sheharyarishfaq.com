export type Route = {
  path: string;
  // Case studies take their sitemap date from their `published` field.
  caseStudy?: string;
};

export const routes: Route[] = [
  { path: "/" },
  ...["mavera", "bina", "aiwrappers", "caracat", "birdclef"].map((slug) => ({ path: `/work/${slug}`, caseStudy: slug })),
  { path: "/research" },
  { path: "/hire" },
  { path: "/now" },
  { path: "/colophon" },
  { path: "/privacy" },
];
