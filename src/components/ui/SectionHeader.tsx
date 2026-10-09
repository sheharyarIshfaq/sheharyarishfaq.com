type SectionHeaderProps = {
  id?: string;
  title: string;
  intro?: string;
};

export function SectionHeader({ id, title, intro }: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <h2 id={id} className="text-[32px] leading-[1.02] md:text-[46px]">
        {title}
      </h2>
      {intro && <p className="max-w-[400px] text-[15px] leading-normal text-ink-2">{intro}</p>}
    </div>
  );
}
