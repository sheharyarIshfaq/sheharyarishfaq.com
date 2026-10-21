// Umami event attributes for a link, so tracking lives in one place instead of on every anchor.
type EventAttributes = { "data-umami-event": string } & Record<`data-umami-event-${string}`, string>;

const outbound: [host: RegExp, name: string][] = [
  [/(^|\.)linkedin\.com$/, "linkedin"],
  [/(^|\.)github\.com$/, "github"],
  [/(^|\.)medium\.com$/, "medium"],
  [/(^|\.)(youtube\.com|youtu\.be)$/, "youtube"],
  [/(^|\.)fiverr\.com$/, "fiverr"],
];

export function trackLink(href: string): EventAttributes | undefined {
  if (href.startsWith("mailto:")) return { "data-umami-event": "email-click" };
  if (href.startsWith("/cv/")) {
    return { "data-umami-event": "cv-download", "data-umami-event-cv": href.includes("academic") ? "academic" : "internship" };
  }
  if (href.endsWith("-report.pdf")) return { "data-umami-event": "report-download" };

  const caseStudy = href.match(/^\/work\/([a-z0-9-]+)$/);
  if (caseStudy) return { "data-umami-event": "case-study-open", "data-umami-event-slug": caseStudy[1] };

  if (!href.startsWith("http")) return undefined;
  const host = new URL(href).hostname;
  if (host === "cal.com") return { "data-umami-event": "book-call" };
  const match = outbound.find(([pattern]) => pattern.test(host));
  return match && { "data-umami-event": "outbound", "data-umami-event-to": match[1] };
}
