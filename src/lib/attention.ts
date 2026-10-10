import home from "@content/home.json";

export type Link = [token: number, weight: number];
export type Evidence = [title: string, weight: number, proof: string];
export type TokenFocus = { links: Link[]; note: string; evidence: Evidence[] };

export const attention = home.attention;

const map = attention.map as unknown as Record<string, TokenFocus>;

export function focusFor(token: number): TokenFocus | null {
  return map[token] ?? null;
}

export function describeFocus(token: number) {
  const focus = focusFor(token);
  const word = attention.tokens[token];
  if (!focus) return `“${word}” ${attention.smallWordNote}`;
  const links = focus.links.map(([index, weight]) => `${attention.tokens[index]} ${weight.toFixed(2)}`).join(", ");
  return `“${word}” attends to ${links}.`;
}
