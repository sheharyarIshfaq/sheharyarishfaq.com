import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  sub?: string;
  children?: ReactNode;
};

export function PageHeader({ title, sub, children }: PageHeaderProps) {
  return (
    <header className="flex max-w-[900px] flex-col gap-4 pt-10 pb-12 md:pt-16 md:pb-16">
      <h1 className="text-[44px] leading-[0.98] font-[880] tracking-[-0.05em] font-stretch-[120%] md:text-[72px]">{title}</h1>
      {sub && <p className="text-[15px] text-ink-2">{sub}</p>}
      {children && <div className="text-lg leading-normal text-ink-2 md:text-[22px]">{children}</div>}
    </header>
  );
}
