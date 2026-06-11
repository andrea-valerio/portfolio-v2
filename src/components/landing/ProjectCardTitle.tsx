"use client";

import { useLayoutEffect, useRef, useState } from "react";

type ProjectCardTitleProps = {
  titleLines: string[];
  isBig: boolean;
};

function joinTitleLines(lines: string[]) {
  return lines.join(" ");
}

export function ProjectCardTitle({ titleLines, isBig }: ProjectCardTitleProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLHeadingElement>(null);
  const [useLineBreaks, setUseLineBreaks] = useState(false);

  const fontSize = isBig ? "clamp(18px, 4vw, 44px)" : "clamp(18px, 2.8vw, 28px)";
  const joined = joinTitleLines(titleLines);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const measure = measureRef.current;
    if (!wrap || !measure) return;

    const check = () => {
      const w = wrap.clientWidth;
      if (w < 1) return;
      setUseLineBreaks(measure.scrollWidth > w);
    };

    check();
    const ro = new ResizeObserver(check);
    ro.observe(wrap);

    document.fonts?.ready.then(check).catch(() => {});

    return () => ro.disconnect();
  }, [titleLines, isBig]);

  return (
    <div ref={wrapRef} style={{ position: "relative", minWidth: 0, width: "100%" }}>
      <h3
        ref={measureRef}
        aria-hidden
        className="display"
        style={{
          fontSize,
          lineHeight: 0.95,
          margin: 0,
          whiteSpace: "nowrap",
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none",
          top: 0,
          left: 0,
        }}
      >
        {joined}
      </h3>
      <h3
        className="display"
        style={{
          fontSize,
          lineHeight: 0.95,
          margin: 0,
          minWidth: 0,
          maxWidth: "100%",
        }}
      >
        {useLineBreaks
          ? titleLines.map((line, li) => (
              <span key={li} style={{ display: "block" }}>
                {line}
              </span>
            ))
          : joined}
      </h3>
    </div>
  );
}
