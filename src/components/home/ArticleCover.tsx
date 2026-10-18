type Cover = "chunks" | "stack" | "tenants";

const label = "font-[family-name:var(--font-sans)] text-[11px] font-semibold";

// Small drawings in the figure style, one per article, so the covers match the rest of the site in both themes.
function Chunks() {
  return (
    <>
      <rect x="28" y="56" width="52" height="68" rx="8" fill="var(--card)" stroke="var(--plate-line)" strokeWidth="1.5" />
      <path d="M64 56v14h16" fill="none" stroke="var(--plate-line)" strokeWidth="1.5" />
      <text x="54" y="104" textAnchor="middle" className="font-num text-[13px]" fill="var(--blue-text)">
        20GB
      </text>
      {Array.from({ length: 6 }, (_, index) => (
        <rect
          key={index}
          x={100 + index * 26}
          y="78"
          width="20"
          height="24"
          rx="5"
          fill={index < 4 ? "var(--blue)" : "var(--soft)"}
        />
      ))}
      <path d="M262 90h12" stroke="var(--plate-line)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M278 66h22l-4 48h-14Z" fill="var(--card)" stroke="var(--plate-line)" strokeWidth="1.5" strokeLinejoin="round" />
      <ellipse cx="289" cy="66" rx="11" ry="4" fill="var(--part)" stroke="var(--plate-line)" strokeWidth="1.5" />
      <text x="289" y="138" textAnchor="middle" className={label} fill="var(--ink-2)">
        S3
      </text>
    </>
  );
}

function Stack() {
  const layers = [
    ["Next.js", "var(--blue)", "var(--on-blue)"],
    ["Nginx", "var(--card)", "var(--ink)"],
    ["EC2", "var(--card)", "var(--ink)"],
  ];
  return (
    <>
      {layers.map(([name, fill, text], index) => (
        <g key={name}>
          <rect x="70" y={38 + index * 36} width="180" height="28" rx="14" fill={fill} stroke={index ? "var(--plate-line)" : "var(--blue)"} strokeWidth="1.5" />
          <text x="160" y={56 + index * 36} textAnchor="middle" className={label} fill={text}>
            {name}
          </text>
        </g>
      ))}
      <rect x="262" y="44" width="22" height="16" rx="4" fill="var(--green)" />
      <path d="M266 44v-4a7 7 0 0 1 14 0v4" fill="none" stroke="var(--green)" strokeWidth="2.5" />
    </>
  );
}

function Tenants() {
  const tenants = ["a.example.com", "b.example.com", "c.example.com"];
  return (
    <>
      {tenants.map((tenant, index) => (
        <g key={tenant}>
          <rect x="22" y={40 + index * 38} width="118" height="26" rx="13" fill="var(--card)" stroke="var(--plate-line)" strokeWidth="1.5" />
          <text x="81" y={57 + index * 38} textAnchor="middle" className={label} fill="var(--ink)">
            {tenant}
          </text>
          <path d={`M140 ${53 + index * 38} C 170 ${53 + index * 38}, 170 91, 198 91`} fill="none" stroke="var(--soft)" strokeWidth="1.5" />
        </g>
      ))}
      <rect x="198" y="72" width="102" height="38" rx="12" fill="var(--blue)" />
      <text x="249" y="95" textAnchor="middle" className={label} fill="var(--on-blue)">
        /apps/[tenant]
      </text>
    </>
  );
}

const covers = { chunks: Chunks, stack: Stack, tenants: Tenants };

export function ArticleCover({ cover, className = "" }: { cover: string; className?: string }) {
  const Drawing = covers[cover as Cover];
  if (!Drawing) return null;
  return (
    <svg aria-hidden="true" viewBox="0 0 320 180" className={`block h-auto w-full rounded-[16px] bg-panel ${className}`}>
      <Drawing />
    </svg>
  );
}
