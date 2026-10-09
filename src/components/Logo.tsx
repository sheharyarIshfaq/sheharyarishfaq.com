type LogoProps = {
  className?: string;
};

export function LogoMark({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 34 30" aria-hidden="true" className={className}>
      <polygon points="17,18 32,23 17,28 2,23" fill="none" stroke="var(--ink-2)" strokeWidth="1.6" strokeLinejoin="round" />
      <polygon points="17,11 32,16 17,21 2,16" fill="var(--paper)" stroke="var(--ink-2)" strokeWidth="1.6" strokeLinejoin="round" />
      <polygon points="17,2 32,7 17,12 2,7" fill="var(--blue)" stroke="var(--blue)" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
