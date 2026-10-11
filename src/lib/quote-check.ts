import type { BriefPart } from "@/lib/work";

export type Range = [start: number, end: number];

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// A quote counts as found when its words appear in the source in order, ignoring case and spacing.
export function findQuote(source: string, quote: string): Range | null {
  const pattern = quote.trim().split(/\s+/).map(escapeRegExp).join("\\s+");
  const match = new RegExp(pattern, "i").exec(source);
  return match ? [match.index, match.index + match[0].length] : null;
}

export function checkBrief(brief: BriefPart[], source: string) {
  return brief.flatMap((part) => (typeof part === "string" ? [] : [findQuote(source, part.quote)]));
}
