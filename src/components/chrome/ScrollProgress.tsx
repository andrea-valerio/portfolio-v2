"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Body is the scroll container (see html/body overflow wrapper in
    // globals.css — iOS 26 fixed-position drift workaround). Read scroll
    // from document.body, not window.
    const scroller = document.body;
    const onScroll = () => {
      const h = scroller.scrollHeight - scroller.clientHeight;
      const p = h > 0 ? scroller.scrollTop / h : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="hidden lg:block"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 60,
        background: "transparent",
        pointerEvents: "none",
      }}
    >
      <div
        ref={ref}
        style={{
          height: "100%",
          background: "var(--accent)",
          transformOrigin: "0 50%",
          transform: "scaleX(0)",
          transition: "transform 0.1s linear",
        }}
      />
    </div>
  );
}
