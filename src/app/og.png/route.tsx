import home from "@content/home.json";
import { ogImage } from "@/lib/og";

export const dynamic = "force-static";

// A route ending in .png, so static hosts serve the export with an image content type.
export function GET() {
  return ogImage({ title: home.hero.bios[0] });
}
