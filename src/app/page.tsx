import { JsonLd } from "@/components/JsonLd";
import { Attention } from "@/components/home/Attention";
import { Hero } from "@/components/home/Hero";
import { LogoStrip } from "@/components/home/LogoStrip";
import { Numbers } from "@/components/home/Numbers";
import { Recommendations } from "@/components/home/Recommendations";
import { SelectedWork } from "@/components/home/SelectedWork";
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
        <LogoStrip />
        <Numbers />
        <Attention />
        <SelectedWork />
        <Recommendations />
      </main>
      <JsonLd data={profilePage()} />
    </>
  );
}
