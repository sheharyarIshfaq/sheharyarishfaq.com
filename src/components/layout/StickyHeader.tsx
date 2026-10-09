"use client";

import { useEffect, useState, type ReactNode } from "react";

export function StickyHeader({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="sticky top-0 z-40 border-b border-transparent transition-[background-color,border-color] duration-300 data-scrolled:border-line data-scrolled:bg-paper/80 data-scrolled:backdrop-blur-md"
    >
      {children}
    </header>
  );
}
