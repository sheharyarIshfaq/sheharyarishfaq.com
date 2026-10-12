import { JsonLd } from "@/components/JsonLd";
import { About } from "@/components/home/About";
import { Attention } from "@/components/home/Attention";
import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { LogoStrip } from "@/components/home/LogoStrip";
import { Now } from "@/components/home/Now";
import { Numbers } from "@/components/home/Numbers";
import { ProjectMap } from "@/components/home/ProjectMap";
import { Recommendations } from "@/components/home/Recommendations";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Writing } from "@/components/home/Writing";
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
        <ProjectMap />
        <Now />
        <Writing />
        <About />
        <Contact />
      </main>
      <JsonLd data={profilePage()} />
    </>
  );
}
