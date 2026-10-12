import type { MDXComponents } from "mdx/types";
import { Card, Cards, HardCall, Quote, Screenshot, Section, Stat, Stats } from "@/components/case-study/blocks";
import { Todo } from "@/components/case-study/Todo";

const components: MDXComponents = {
  Card,
  Cards,
  HardCall,
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
