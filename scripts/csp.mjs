// Adds a Content-Security-Policy to out/_headers after the build.
// Next inlines a few bootstrap scripts in every page, so script-src lists the hash of each one
// instead of allowing 'unsafe-inline'. Inline styles stay allowed: the figures position things with style attributes.
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const out = new URL("../out/", import.meta.url).pathname;
// Cloudflare ignores _headers lines longer than this.
const MAX_LINE = 2000;

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return htmlFiles(path);
      return entry.name.endsWith(".html") ? [path] : [];
    }),
  );
  return nested.flat();
}

const hashes = new Set();
for (const file of await htmlFiles(out)) {
  const html = await readFile(file, "utf8");
  // Inline scripts only; JSON-LD is data, not script, so it needs no hash.
  for (const [, attributes, body] of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (attributes.includes("application/ld+json") || !body) continue;
    hashes.add(`'sha256-${createHash("sha256").update(body).digest("base64")}'`);
  }
}

const policy = [
  "default-src 'self'",
  `script-src 'self' https://static.cloudflareinsights.com https://cloud.umami.is ${[...hashes].sort().join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://cloudflareinsights.com https://gateway.umami.is",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const line = `  Content-Security-Policy: ${policy}`;
if (line.length > MAX_LINE) {
  throw new Error(`The Content-Security-Policy line is ${line.length} characters; Cloudflare allows ${MAX_LINE}.`);
}

const headersFile = join(out, "_headers");
const headers = await readFile(headersFile, "utf8");
await writeFile(headersFile, headers.replace(/^\/\*\n/, `/*\n${line}\n`));
console.log(`Content-Security-Policy: ${hashes.size} script hashes, ${line.length} characters.`);
