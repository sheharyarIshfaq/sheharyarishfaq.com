import pages from "@content/pages.json";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageHeader } from "@/components/ui/PageHeader";

const { title, text, link } = pages.notFound;

export const metadata = { title, alternates: { canonical: null } };

export default function NotFound() {
  return (
    <main id="main" className="container-page min-h-[60vh] pb-20">
      <PageHeader title={title}>
        <p>{text}</p>
      </PageHeader>
      <ButtonLink href="/">
        {link}
      </ButtonLink>
    </main>
  );
}
