import pages from "@content/pages.json";
import { Section } from "@/components/case-study/blocks";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

const { title, description, sections } = pages.privacy;

export const metadata = pageMetadata({ title, description, path: "/privacy" });

export default function PrivacyPage() {
  const last = sections.length - 1;

  return (
    <main id="main" className="container-page">
      <PageHeader title={title} />
      {sections.map((section, index) => (
        <Section key={section.title} title={section.title}>
          <p>
            {section.text}
            {index === last && (
              <>
                {" "}
                <a href={`mailto:${site.email}`} className="text-link">
                  {site.email}
                </a>
                .
              </>
            )}
          </p>
        </Section>
      ))}
    </main>
  );
}
