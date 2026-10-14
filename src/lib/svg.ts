import { readFileSync } from "node:fs";
import { join } from "node:path";

function aspectOf(file: string) {
  const svg = readFileSync(join(process.cwd(), "public", file), "utf8");
  const viewBox = svg.match(/viewBox="[\d.\s-]*?([\d.]+)\s+([\d.]+)"/);
  return viewBox ? Number(viewBox[1]) / Number(viewBox[2]) : 4;
}

// Sizes logos to the same visual area, so a tall mark and a long wordmark look equally heavy.
export function balancedLogoSize(file: string, area: number, minHeight: number, maxHeight: number) {
  const aspect = aspectOf(file);
  const height = Math.min(maxHeight, Math.max(minHeight, Math.sqrt(area / aspect)));
  return { width: Math.round(height * aspect), height: Math.round(height) };
}
