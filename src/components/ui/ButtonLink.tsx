import type { ComponentProps } from "react";
import { trackLink } from "@/lib/analytics";

type ButtonLinkProps = ComponentProps<"a"> & {
  variant?: "primary" | "secondary";
};

const variants = {
  primary: "bg-blue text-on-blue hover:bg-[color-mix(in_srgb,var(--blue)_88%,black)]",
  secondary: "border border-line bg-card text-ink hover:border-plate-line",
};

export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return (
    <a
      {...(props.href && trackLink(props.href))}
      className={`inline-flex min-h-[50px] items-center rounded-[14px] px-6 text-[17px] font-bold transition-[background-color,border-color,scale] duration-300 active:scale-[0.98] ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
