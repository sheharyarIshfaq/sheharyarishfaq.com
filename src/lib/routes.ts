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
];
