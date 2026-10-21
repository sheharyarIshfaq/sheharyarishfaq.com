# sheharyarishfaq.com

[![The homepage of sheharyarishfaq.com](https://sheharyarishfaq.com/og.png)](https://sheharyarishfaq.com)

**Live at [sheharyarishfaq.com](https://sheharyarishfaq.com)**

My personal website: who I am, the work I've led, and how to reach me. I'm an AI engineer in Paris, finishing an MSc in Computer Science at Sorbonne and open to a six-month internship from 15 February 2027.

## Stack

- Next.js (App Router) with TypeScript, exported as static HTML (`output: "export"`)
- Tailwind CSS 4, with the design tokens in `src/styles/tokens.css`
- Archivo and Doto through `next/font`, self-hosted at build time
- Case studies in MDX (`content/work/*.mdx`); every other piece of copy in `content/*.json`
- Hosted as static assets on Cloudflare Workers
- Playwright and axe for screenshots and accessibility checks

## Running it

Needs Node 22 or newer and pnpm.

```bash
pnpm install
pnpm dev            # local server on http://localhost:3000
pnpm build          # optimises images, then writes the static site to out/
pnpm start:static   # serves out/ locally
pnpm lint
pnpm typecheck
pnpm test:e2e       # screenshots every page at 375, 768 and 1440 in both themes, and runs axe
```

Canonical URLs, Open Graph images and the sitemap use `NEXT_PUBLIC_SITE_URL`, falling back to https://sheharyarishfaq.com.

## How it's built

Every page is prerendered, so all the text is in the HTML and the site works with JavaScript off. The interactive figures (the streaming headline, the attention arcs, the request trace, the quote check, the project map, the CUDA kernel) render a finished, static version on the server. Their code loads only when they scroll into view, and they respect `prefers-reduced-motion` by showing that final state straight away.

Some of the numbers in those figures are set by hand to tell the story: the attention weights, the map's positions and similarity scores, and the trace's bar widths. The site says so next to each one. The quote check is real: it runs a matching function on example text.

Photos are cropped and converted to AVIF, WebP and JPEG at build time by `scripts/optimize-images.mjs`, since a static export can't use the Next.js image optimiser. The share images are drawn with `next/og` from the same fonts.

## Deploying

Cloudflare Workers builds the repository with `pnpm build` and deploys `out/` with `npx wrangler deploy`, using `wrangler.jsonc`. Cache and security headers live in `public/_headers`.
