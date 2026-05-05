"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollHashIntoView() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
