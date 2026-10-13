import home from "@content/home.json";
import pages from "@content/pages.json";
import { KernelFigure } from "@/components/figures/lazy";
import { KernelView } from "@/components/figures/KernelView";
import { PageHeader } from "@/components/ui/PageHeader";
import { WhenVisible } from "@/components/WhenVisible";
import { BLOCKS } from "@/lib/kernel";
import { pageMetadata } from "@/lib/metadata";

const { title, sub, text, kernelLabel, caption, button } = home.now;

export const metadata = pageMetadata({ title, description: pages.now.description, path: "/now" });

export default function NowPage() {
  const kernel = { label: kernelLabel, caption, button };

  return (
    <main id="main" className="container-page pb-20">
      <PageHeader title={title} sub={sub}>
        <p>{text}</p>
      </PageHeader>
      <div className="max-w-[800px]">
        <WhenVisible fallback={<KernelView {...kernel} finished={BLOCKS} pending />}>
          <KernelFigure {...kernel} />
        </WhenVisible>
      </div>
    </main>
  );
}
