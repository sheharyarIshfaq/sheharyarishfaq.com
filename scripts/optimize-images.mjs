// Crops each photo to its frame and writes AVIF, WebP and JPEG sizes to public/images/generated.
// The static export can't use the Next image optimiser, so this runs before every build.
import { mkdir, readFile, stat } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const root = new URL("..", import.meta.url).pathname;
const site = JSON.parse(await readFile(join(root, "content/site.json"), "utf8"));
const variants = JSON.parse(await readFile(join(root, "src/lib/image-variants.json"), "utf8"));
const outDir = join(root, "public/images/generated");
await mkdir(outDir, { recursive: true });

async function isFresh(output, source) {
  try {
    return (await stat(output)).mtimeMs >= (await stat(source)).mtimeMs;
  } catch {
    return false;
  }
}

// The crop keeps the part of the photo that object-position would have shown in a frame of this aspect.
function cropFor(width, height, aspect, position) {
  const [px, py] = (position ?? "50% 50%").split(" ").map((value) => parseFloat(value) / 100);
  if (width / height > aspect) {
    const cropWidth = Math.round(height * aspect);
    return { left: Math.round((width - cropWidth) * px), top: 0, width: cropWidth, height };
  }
  const cropHeight = Math.round(width / aspect);
  return { left: 0, top: Math.round((height - cropHeight) * py), width, height: cropHeight };
}

for (const [key, { aspect, widths }] of Object.entries(variants)) {
  const image = site.images[key];
  const source = join(root, "public", image.src);
  const name = basename(image.src, extname(image.src));
  const { width, height } = await sharp(source).metadata();
  const region = cropFor(width, height, aspect, image.objectPosition);

  for (const size of widths) {
    const resized = () => sharp(source).extract(region).resize(size);
    const outputs = [
      [`${name}-${size}.avif`, (pipeline) => pipeline.avif({ quality: 55 })],
      [`${name}-${size}.webp`, (pipeline) => pipeline.webp({ quality: 76 })],
      [`${name}-${size}.jpg`, (pipeline) => pipeline.jpeg({ quality: 80, mozjpeg: true })],
    ];
    for (const [file, encode] of outputs) {
      const output = join(outDir, file);
      if (await isFresh(output, source)) continue;
      await encode(resized()).toFile(output);
    }
  }
}
