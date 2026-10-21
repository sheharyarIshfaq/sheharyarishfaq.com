import site from "@content/site.json";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sheharyarishfaq.com").replace(/\/$/, "");

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function absoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}

// Links still marked TODO in content are left out until they are filled in.
export function isReady(href: string | undefined): href is string {
  return !!href && !href.startsWith("TODO") && href !== "#";
}

export { site };
