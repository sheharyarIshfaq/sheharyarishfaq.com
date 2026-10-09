import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { profilePage } from "@/lib/structured-data";

export const metadata = pageMetadata({
  description: site.seo.description,
  path: "/",
  type: "profile",
});

export default function Home() {
  return (
    <>
      <main id="main" className="container-page min-h-[60vh]" />
      <JsonLd data={profilePage()} />
    </>
  );
}
