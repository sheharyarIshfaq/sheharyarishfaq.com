import pages from "@content/pages.json";
import { Section } from "@/components/case-study/blocks";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/metadata";

const { title, description, sections } = pages.colophon;

export const metadata = pageMetadata({ title, description, path: "/colophon" });

export default function ColophonPage() {
  return (
    <main id="main" className="container-page">
      <PageHeader title={title} />
      {sections.map((section) => (
        <Section key={section.title} title={section.title}>
          <p>{section.text}</p>
        </Section>
      ))}
    </main>
  );
}
