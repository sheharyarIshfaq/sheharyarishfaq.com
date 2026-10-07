import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageMetadata = {
  title?: string;
  description: string;
  path: string;
  type?: "website" | "profile" | "article";
};

// Next replaces nested objects instead of merging them, so every page builds its full Open Graph block here.
export function pageMetadata({ title, description, path, type = "website" }: PageMetadata): Metadata {
  const ogTitle = title ? `${title} · ${site.name}` : site.seo.title;

  return {
    title: title ?? { absolute: site.seo.title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: ogTitle,
      description,
      siteName: site.name,
      locale: "en_GB",
      ...(type === "profile" && { firstName: "Sheharyar", lastName: "Ishfaq" }),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}
