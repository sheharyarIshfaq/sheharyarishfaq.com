import site from "@content/site.json";

// NEXT_PUBLIC_SITE_URL wins once the domain is set; until then Vercel's production address is used.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl ?? "http://localhost:3000").replace(/\/$/, "");

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
