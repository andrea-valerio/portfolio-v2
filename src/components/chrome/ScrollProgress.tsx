"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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
