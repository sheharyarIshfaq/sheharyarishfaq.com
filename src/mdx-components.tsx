import type { MDXComponents } from "mdx/types";
import { Bars, Card, Cards, HardCall, Quote, ReportFigure, Screenshot, Section, Stat, Stats } from "@/components/case-study/blocks";
import { ExplodedSection } from "@/components/case-study/ExplodedSection";
import { ProjectFigure } from "@/components/case-study/ProjectFigure";
import { Todo } from "@/components/case-study/Todo";

const components: MDXComponents = {
  Bars,
  Card,
  Cards,
  ExplodedSection,
  HardCall,
  ProjectFigure,
  ReportFigure,
  Quote,
  Screenshot,
  Section,
  Stat,
  Stats,
  Todo,
  a: (props) => <a {...props} className="text-link" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
