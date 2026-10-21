export type Route = {
  path: string;
  // The content file the page is built from, used for the sitemap's lastModified.
  source: string;
  priority: number;
};

export const routes: Route[] = [
  { path: "/", source: "content/home.json", priority: 1 },
  ...["mavera", "bina", "aiwrappers", "caracat", "birdclef"].map((slug) => ({
    path: `/work/${slug}`,
    source: `content/work/${slug}.mdx`,
    priority: 0.8,
  })),
  { path: "/research", source: "content/pages.json", priority: 0.6 },
  { path: "/hire", source: "content/pages.json", priority: 0.6 },
  { path: "/now", source: "content/home.json", priority: 0.5 },
  { path: "/colophon", source: "content/pages.json", priority: 0.3 },
  { path: "/privacy", source: "content/pages.json", priority: 0.2 },
];
