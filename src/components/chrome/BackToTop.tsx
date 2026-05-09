"use client";

import { useEffect, useRef } from "react";

/** Mobile-only floating back-to-top sticker.
 *
 *  Anchored 16px above the viewport bottom (16px above the iOS home
 *  indicator on phones via env(safe-area-inset-bottom)). Slides up
 *  past ~50% scroll and parks 16px above the footer top once the
 *  footer enters the viewport, so the ink-filled button doesn't
 *  camouflage into the same-colored footer band.
 *
 *  All visibility + parking work runs through a single rAF-throttled
 *  scroll/resize listener — one getBoundingClientRect() per animation
 *  frame, no GSAP, no ScrollTrigger. CSS handles the actual slide via
 *  the .is-visible class toggle (see .back-to-top in globals.css). */
const REDUCED_MOTION_MQ = "(prefers-reduced-motion: reduce)";

/** Visual gap (px) between the parked button's bottom edge and the
 *  footer's top edge. The footer extends through the iOS home-indicator
 *  zone on its own, so this is the literal visual gap — no need to add
 *  env(safe-area-inset-bottom) on top of it. */
const FOOTER_GAP_PX = 16;

/** Show the button once the user has scrolled past half a viewport.
 *  Same threshold drives the reverse on scroll-back. */
const VISIBILITY_THRESHOLD_RATIO = 0.5;

export function BackToTop() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let rafId = 0;
    const reposition = () => {
      rafId = 0;
      // Footer parking — keep the button bottom-edge 16px above the
      // footer top once the footer enters the viewport. Otherwise
      // clear the inline style so the CSS default
      // (`env(safe-area-inset-bottom) + 16px`) takes over.
      const footer = document.querySelector("footer");
      if (footer) {
        const distance = window.innerHeight - footer.getBoundingClientRect().top;
        wrapper.style.bottom = distance > 0 ? `${distance + FOOTER_GAP_PX}px` : "";
      }
      // Visibility — single class toggle, CSS owns the actual slide.
      wrapper.classList.toggle(
        "is-visible",
        window.scrollY > window.innerHeight * VISIBILITY_THRESHOLD_RATIO
      );
    };
    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(reposition);
    };
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    reposition();

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handleClick = () => {
    // Honor the OS-level reduced-motion preference end-to-end. Modern
    // browsers also respect this for behavior:'smooth' automatically,
    // but checking explicitly keeps the contract obvious at the call
    // site (and removes any reliance on browser-version differences).
    const reducedMotion = window.matchMedia(REDUCED_MOTION_MQ).matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <div ref={wrapperRef} className="back-to-top">
      <button
        type="button"
        className="sticker solid"
        aria-label="Back to top"
        onClick={handleClick}
      >
        Back to top
      </button>
    </div>
  );
}
