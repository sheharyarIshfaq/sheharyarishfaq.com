import home from "@content/home.json";

export function SiteFooter() {
  const { left, right } = home.footer;

  return (
    <footer className="container-page">
      <div className="flex flex-wrap justify-between gap-4 border-t border-line pt-[22px] pb-10 text-sm text-ink-2">
        <span>{left}</span>
        <span>
          {right.text}{" "}
          <a href={right.href} className="text-link text-ink">
            {right.link}
          </a>
        </span>
      </div>
    </footer>
  );
}
