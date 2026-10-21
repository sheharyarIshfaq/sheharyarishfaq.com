// next/og only writes lossless PNG, which makes the share images with a photo about 850 KB.
// A 256-colour palette with dithering keeps them at 1200×630 with crisp text, at under a quarter of the size.
import { readdir, rename } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const out = new URL("../out/", import.meta.url).pathname;

const files = (await readdir(out, { recursive: true })).filter((file) => file.endsWith("og.png"));
for (const file of files) {
  const path = join(out, file);
  await sharp(path).png({ palette: true, quality: 100, effort: 10, compressionLevel: 9 }).toFile(`${path}.tmp`);
  await rename(`${path}.tmp`, path);
}
console.log(`Shrank ${files.length} Open Graph images.`);
