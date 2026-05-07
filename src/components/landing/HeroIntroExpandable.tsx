"use client";

import { useState, type ReactNode } from "react";

/**
 * Mobile-only "read more" expander for the hero intro paragraph. On phones
 * (<640px) the prose is clamped to 5 lines and a handwritten toggle reveals
 * the full text; tablets+ render the paragraph in full and the toggle is
 * hidden via CSS, so the markup stays identical for SSR.
 */
export function HeroIntroExpandable({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <p
        className={`serif hero-intro hero-intro-truncatable${expanded ? " is-expanded" : ""}`}
        style={{ fontSize: 18, lineHeight: 1.65, color: "var(--ink)" }}
      >
        {children}
      </p>
      <button
        type="button"
        className="hero-intro-readmore hand"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        {expanded ? "read less" : "read more"}
      </button>
    </>
  );
}
