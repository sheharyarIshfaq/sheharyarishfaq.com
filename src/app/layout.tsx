import type { Metadata, Viewport } from "next";
import { Archivo, Doto } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { site, SITE_URL } from "@/lib/site";
import { website } from "@/lib/structured-data";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const doto = Doto({
  subsets: ["latin"],
  weight: "900",
  display: "swap",
  preload: false,
  variable: "--font-doto",
});

const bingVerification = process.env.NEXT_PUBLIC_BING_VERIFICATION;

export const metadata: Metadata = {
  ...pageMetadata({ description: site.seo.description, path: "/" }),
  metadataBase: new URL(SITE_URL),
  title: { default: site.seo.title, template: `%s · ${site.name}` },
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  keywords: ["AI engineer", "LLM agents", "Rust", "Kubernetes", "Paris", "internship"],
  formatDetection: { email: false, address: false, telephone: false },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    ...(bingVerification && { other: { "msvalidate.01": bingVerification } }),
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFBFC" },
    { media: "(prefers-color-scheme: dark)", color: "#11161F" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${archivo.variable} ${doto.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <JsonLd data={{ "@context": "https://schema.org", ...website }} />
      </body>
    </html>
  );
}
