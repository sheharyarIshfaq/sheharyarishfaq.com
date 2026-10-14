import { preload } from "react-dom";
import variants from "@/lib/image-variants.json";
import { site } from "@/lib/site";

type PictureProps = {
  image: keyof typeof variants;
  sizes: string;
  priority?: boolean;
  className?: string;
};

function srcSet(name: string, widths: number[], extension: string) {
  return widths.map((width) => `/images/sized/${name}-${width}.${extension} ${width}w`).join(", ");
}

// Serves the sizes made by scripts/optimize-images.mjs; each is already cropped to the frame's aspect.
export function Picture({ image, sizes, priority = false, className }: PictureProps) {
  const { aspect, widths } = variants[image];
  const { src, alt } = site.images[image];
  const name = src.split("/").pop()!.replace(/\.\w+$/, "");
  const largest = widths[widths.length - 1];
  const avif = srcSet(name, widths, "avif");

  if (priority) preload(`/images/sized/${name}-${largest}.avif`, { as: "image", imageSrcSet: avif, imageSizes: sizes, type: "image/avif", fetchPriority: "high" });

  return (
    <picture>
      <source type="image/avif" srcSet={avif} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(name, widths, "webp")} sizes={sizes} />
      <img
        src={`/images/sized/${name}-${largest}.jpg`}
        srcSet={srcSet(name, widths, "jpg")}
        sizes={sizes}
        alt={alt}
        width={largest}
        height={Math.round(largest / aspect)}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
