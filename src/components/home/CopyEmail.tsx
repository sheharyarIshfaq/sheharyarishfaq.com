"use client";

import { useEffect, useState, type MouseEvent } from "react";

type CopyEmailProps = {
  email: string;
  label: string;
  copiedLabel: string;
};

const RESET_MS = 2000;

// A mailto link that copies the address instead when the clipboard is available.
export function CopyEmail({ email, label, copiedLabel }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), RESET_MS);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy(event: MouseEvent<HTMLAnchorElement>) {
    if (!navigator.clipboard) return;
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <>
      <a
        href={`mailto:${email}`}
        onClick={copy}
        className="inline-flex min-h-14 items-center justify-center rounded-[16px] bg-paper px-5 text-[17px] font-extrabold text-blue-text transition-[scale] duration-300 active:scale-[0.98]"
      >
        {copied ? copiedLabel : label}
      </a>
      <span className="sr-only" aria-live="polite">
        {copied ? copiedLabel : ""}
      </span>
    </>
  );
}
