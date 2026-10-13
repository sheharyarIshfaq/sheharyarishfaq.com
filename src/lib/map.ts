import map from "@content/map.json";

export type ClusterKey = "a" | "s" | "m" | "p";
export type Filter = ClusterKey | "all";

export type MapPoint = {
  id: number;
  name: string;
  x: number;
  y: number;
  size: number;
  cluster: ClusterKey;
  year: number;
  tag: string;
  desc: string;
  metric: [value: string, label: string];
  stack: string[];
  neighbours: [id: number, similarity: number][];
  cta: [label: string, href: string];
};

export type CloudDot = { x: number; y: number; year: number };

export const mapData = map;
export const points = map.points as MapPoint[];
export const filters = map.filters as [Filter, string][];
export const years = map.years;
export const latestYear = years[years.length - 1];
export const DEFAULT_POINT = 0;
export const HAND_SET_FOOTNOTE = "Positions and scores are set by hand to show how the projects relate.";

// Park–Miller generator with a fixed seed, so the cloud is identical on the server and the client.
function freelanceCloud(): CloudDot[] {
  const { count, centerX, centerY, spreadX, spreadY, yearsFrom, yearsTo, seed: start } = map.freelanceCloud;
  let seed = start;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  // The sum of three uniforms approximates a normal distribution.
  const gaussian = () => (random() + random() + random() - 1.5) / 1.5;

  return Array.from({ length: count }, () => {
    const x = centerX + gaussian() * spreadX;
    const y = centerY + gaussian() * spreadY;
    const year = yearsFrom + Math.floor(random() * (yearsTo - yearsFrom + 1));
    return { x, y, year };
  });
}

export const cloud = freelanceCloud();

// One path per year: each dot is a zero-length segment with a round cap, which keeps 165 dots out of the DOM.
export const cloudByYear = [...new Set(cloud.map((dot) => dot.year))].sort().map((year) => ({
  year,
  d: cloud
    .filter((dot) => dot.year === year)
    .map((dot) => `M${dot.x.toFixed(2)} ${dot.y.toFixed(2)}h0`)
    .join(""),
}));

export function pointByName(name: string) {
  return points.find((point) => point.name === name)!;
}

export function pointById(id: number) {
  return points.find((point) => point.id === id)!;
}
