import type { Metadata } from "next";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };

type PageMetadata = {
  title?: string;
  description: string;
  path: string;
  type?: "website" | "profile" | "article";
  image?: string;
};

// Next replaces nested objects instead of merging them, so every page builds its full Open Graph block here.
export function pageMetadata({ title, description, path, type = "website", image = "/og.png" }: PageMetadata): Metadata {
  const ogTitle = title ? `${title} · ${site.name}` : site.seo.title;
  const images = [{ url: image, ...ogSize, alt: `${site.name}, ${site.role} in Paris`, type: "image/png" }];

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
      images,
      ...(type === "profile" && { firstName: "Sheharyar", lastName: "Ishfaq" }),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images,
    },
  };
}
