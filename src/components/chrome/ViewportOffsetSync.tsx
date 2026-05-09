"use client";

import { useEffect } from "react";

/**
 * Compensates for iOS 26's WebKit fixed-position drift bug
 * (Bugzilla 297779). On iOS, the visual viewport drifts vertically
 * relative to the layout viewport during URL-bar transitions; any
 * `position: fixed` element anchored to the layout viewport (like the
 * navbar and the iOS status shield) appears to slide as a result.
 *
 * `window.visualViewport.offsetTop` reports the exact drift in CSS
 * pixels. We write `-offsetTop` into the `--vv-offset` custom property
 * on `<html>`, and the corresponding fixed elements consume it via
 * `transform: translate3d(0, var(--vv-offset, 0px), 0)` to counter the
 * drift. On non-buggy surfaces (desktop, Android, iOS 26.1+ with the
 * fix) offsetTop is always 0 and the transform is a no-op.
 *
 * Listens to `resize` and `scroll` on `visualViewport` (not on
 * `window`), since those events fire when the visual viewport drifts
 * even if the layout viewport / scroll position is unchanged.
 */
export function ViewportOffsetSync() {
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const root = document.documentElement;
    const update = () => {
      const offset = vv.offsetTop || 0;
      // Negative because we want to translate the fixed element UP by
      // the drift amount to keep it visually pinned to the visual
      // viewport top.
      root.style.setProperty("--vv-offset", `${-offset}px`);
    };

    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    update();

    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      root.style.removeProperty("--vv-offset");
    };
  }, []);

  return null;
}
