import { readFileSync } from "node:fs";
import { join } from "node:path";

// Width of an SVG in public/ when drawn at the given height, from its viewBox.
export function svgWidthAt(file: string, height: number) {
  const svg = readFileSync(join(process.cwd(), "public", file), "utf8");
  const viewBox = svg.match(/viewBox="[\d.\s-]*?([\d.]+)\s+([\d.]+)"/);
  if (!viewBox) return height * 4;
  return Math.round((Number(viewBox[1]) / Number(viewBox[2])) * height);
}
