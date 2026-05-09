"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * After client-side route changes, force the layout viewport to the
 * top. Next.js usually does this on `<Link>` navigation, but GSAP
 * ScrollTrigger (re-created in [Animations.tsx](Animations.tsx) on
 * every pathname change) can refresh and nudge `scrollY` slightly —
 * which reads as “the page scrolled up but stopped short of the nav”
 * when combined with the fixed desktop navbar overlay model.
 *
 * Skips the reset on `/` when `location.hash` is set so
 * [HashScroll.tsx](HashScroll.tsx) can scroll `#projects` /
 * `#publications` into view without fighting this pass.
 */
export function RouteScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname === "/" && window.location.hash.length > 1) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
