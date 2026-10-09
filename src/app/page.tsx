import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/home/Hero";
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
      <main id="main" className="container-page">
        <Hero />
      </main>
      <JsonLd data={profilePage()} />
    </>
  );
}
