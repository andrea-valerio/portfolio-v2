"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Section hashes we scroll to then strip from the URL (clean address bar on load / inbound nav). */
const STRIP_AFTER_SCROLL = new Set(["projects", "publications"]);

function scrollHashIntoView() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (STRIP_AFTER_SCROLL.has(id)) {
      const clean = window.location.pathname + window.location.search;
      window.history.replaceState(null, "", clean);
    }
  }, 0);
}

/** After client navigation to `/` with a hash, scroll the target into view smoothly. */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    scrollHashIntoView();
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const onHashChange = () => scrollHashIntoView();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  return null;
}
