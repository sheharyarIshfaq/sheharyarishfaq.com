import { existsSync } from "node:fs";
import { extname, join } from "node:path";
import { isReady } from "@/lib/site";

// Links to files in public/ (CVs, logos) only render once the file is there.
export function isAvailable(href: string | undefined): href is string {
  if (!isReady(href)) return false;
  if (!href.startsWith("/") || !extname(href.split(/[?#]/)[0])) return true;
  return existsSync(join(process.cwd(), "public", href));
}
