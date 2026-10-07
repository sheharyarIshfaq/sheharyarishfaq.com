import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ogSize } from "@/lib/metadata";
import { site } from "@/lib/site";

function asset(path: string) {
  return readFile(join(process.cwd(), "src/assets", path));
}

type OgImageProps = {
  title: string;
  number?: string;
};

// next/og can't apply font-stretch, so the wide headline face is a static instance at wdth 118.
export async function ogImage({ title, number }: OgImageProps) {
  const [wide, regular, doto, photo] = await Promise.all([
    asset("fonts/archivo-850-118.woff"),
    asset("fonts/archivo-400.woff"),
    asset("fonts/doto-900.woff"),
    asset("og-photo.jpg"),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#FFFFFF", color: "#1B2333" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 678,
            padding: "64px 64px 60px",
          }}
        >
          <svg width="68" height="60" viewBox="0 0 34 30">
            <polygon points="17,18 32,23 17,28 2,23" fill="none" stroke="#5B6578" strokeWidth="1.6" strokeLinejoin="round" />
            <polygon points="17,11 32,16 17,21 2,16" fill="#FFFFFF" stroke="#5B6578" strokeWidth="1.6" strokeLinejoin="round" />
            <polygon points="17,2 32,7 17,12 2,7" fill="#2F6BE4" stroke="#2F6BE4" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          <div style={{ display: "flex", fontFamily: "Archivo Wide", fontSize: 52, lineHeight: 1.04, letterSpacing: "-2px" }}>
            {site.name}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, fontFamily: "Archivo", fontSize: 30, lineHeight: 1.3, color: "#5B6578" }}>
            {number && <span style={{ fontFamily: "Doto", fontSize: 34, color: "#2459C4" }}>{number}</span>}
            <span style={{ maxWidth: 470 }}>{title}</span>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og only renders plain img elements */}
        <img src={`data:image/jpeg;base64,${photo.toString("base64")}`} width={522} height={630} alt="" />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Archivo Wide", data: wide, weight: 800, style: "normal" },
        { name: "Archivo", data: regular, weight: 400, style: "normal" },
        { name: "Doto", data: doto, weight: 900, style: "normal" },
      ],
    },
  );
}
