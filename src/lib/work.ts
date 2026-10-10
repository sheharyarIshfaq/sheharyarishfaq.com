import work from "@content/work.json";

export type ParagraphPart = [text: string, span: number | null];

export type TraceSpan = {
  label: string;
  depth: number;
  start: number;
  width: number;
  thin?: boolean;
  note: string;
};

export type BriefPart = string | { quote: string; found: boolean };

type BaseProject = {
  slug: string;
  number: string;
  name: string;
  meta: string;
  chips?: string[];
  stamp?: string;
  context?: string;
  link: { label: string; href: string };
  url?: string;
  repo?: string;
};

export type TraceProject = BaseProject & {
  figure: "trace";
  paragraph: ParagraphPart[];
  trace: TraceSpan[];
  traceCaption: string;
};

export type QuoteCheckProject = BaseProject & {
  figure: "quote-check";
  paragraph: string;
  quoteCheck: {
    briefLabel: string;
    brief: BriefPart[];
    sourceLabel: string;
    source: string;
    idle: string;
    result: string;
    button: string;
    reset: string;
    caption: string;
  };
};

export type FanOutProject = BaseProject & {
  figure: "fan-out";
  paragraph: string;
  fanOut: { agent: string; apps: string[]; layer: string; caption: string };
};

export type Project = TraceProject | QuoteCheckProject | FanOutProject;

export const projects = work.projects as Project[];

export function paragraphText(paragraph: Project["paragraph"]) {
  return typeof paragraph === "string" ? paragraph : paragraph.map(([text]) => text).join("");
}

export { work };
