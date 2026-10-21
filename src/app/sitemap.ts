import type { MetadataRoute } from "next";
import { loadCaseStudy } from "@/lib/case-studies";
import { routes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

// Only case studies carry a real content date; a build timestamp on every page would tell crawlers nothing.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return Promise.all(
    routes.map(async (route) => ({
      url: absoluteUrl(route.path),
      ...(route.caseStudy && { lastModified: (await loadCaseStudy(route.caseStudy)).meta.published }),
    })),
  );
}
