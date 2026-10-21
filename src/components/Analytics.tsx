import Script from "next/script";

const CLOUDFLARE_TOKEN = "dd567d8aa2f44631bc3c4fb0ad919e0d";
const UMAMI_WEBSITE_ID = "571f8c35-986d-4d09-a956-c915c2e05828";

// Both are cookieless. They load after the page has, so they never compete with the first paint.
// Umami only counts visits on the real domain, so local builds and test runs stay out of the stats.
export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon={JSON.stringify({ token: CLOUDFLARE_TOKEN })}
      />
      <Script
        strategy="lazyOnload"
        src="https://cloud.umami.is/script.js"
        data-website-id={UMAMI_WEBSITE_ID}
        data-domains="sheharyarishfaq.com"
      />
    </>
  );
}
