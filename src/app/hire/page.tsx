import home from "@content/home.json";
import pages from "@content/pages.json";
import { Contact } from "@/components/home/Contact";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { isAvailable } from "@/lib/files";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

const { title, description } = pages.hire;

export const metadata = pageMetadata({ title, description, path: "/hire" });

export default function HirePage() {
  const { availability } = site;

  return (
    <main id="main" className="container-page">
      <PageHeader title={availability.pill}>
        <p>{home.hero.summary}</p>
      </PageHeader>

      <dl className="grid gap-x-8 border-b border-line sm:grid-cols-2 lg:grid-cols-3">
        {home.about.facts.map(([term, value]) => (
          <div key={term} className="border-t border-line py-4">
            <dt className="text-[13px] text-ink-2">{term}</dt>
            <dd className="pt-0.5 text-[17px] font-bold">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-wrap gap-3 pt-8">
        {isAvailable(home.hero.ctaSecondary.href) && (
          <ButtonLink href={home.hero.ctaSecondary.href} download>
            {home.hero.ctaSecondary.label}
          </ButtonLink>
        )}
        <ButtonLink href={site.links.bookCall} variant="secondary" target="_blank" rel="noopener">
          {home.contact.bookCallLabel}
        </ButtonLink>
      </div>

      <Contact />
    </main>
  );
}
