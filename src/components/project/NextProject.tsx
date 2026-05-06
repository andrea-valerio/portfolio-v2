"use client";

import Link from "next/link";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import type { ProjectCaseStudy } from "@/lib/projects";
import { PROJECTS_DATA } from "@/lib/projects";

function fitNextProjectTitle(titleEl: HTMLElement, wrapWidth: number, maxPx: number, minPx: number) {
  titleEl.style.removeProperty("overflow");
  titleEl.style.removeProperty("text-overflow");

  titleEl.style.fontSize = `${maxPx}px`;
  if (titleEl.scrollWidth <= wrapWidth) return;

  let lo = minPx;
  let hi = maxPx;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    titleEl.style.fontSize = `${mid}px`;
    if (titleEl.scrollWidth <= wrapWidth) lo = mid;
    else hi = mid;
  }
  titleEl.style.fontSize = `${lo}px`;

  if (titleEl.scrollWidth > titleEl.clientWidth) {
    titleEl.style.overflow = "hidden";
    titleEl.style.textOverflow = "ellipsis";
  }
}

export function NextProject({ data }: { data: ProjectCaseStudy }) {
  const next = PROJECTS_DATA[data.nextSlug];
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const wrap = titleWrapRef.current;
    const title = titleRef.current;
    if (!wrap || !title) return;
    const fit = () => {
      const w = wrap.clientWidth;
      if (w < 1) return;
      fitNextProjectTitle(title, w, 72, 16);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [data.nextTitle]);

  if (!next) return null;

  return (
    <section style={{ padding: "80px 48px 120px", maxWidth: 1440, margin: "0 auto" }}>
      <div className="rule" style={{ marginBottom: 48 }} />
      <Link
        href={`/projects/${data.nextSlug}/`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          textDecoration: "none",
          color: "inherit",
          maxWidth: "100%",
          minWidth: 0,
          paddingBottom: 4,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "clamp(92px, 26vw, 140px)",
            flex: "0 0 clamp(92px, 26vw, 140px)",
            aspectRatio: "16 / 10",
            border: "2px solid var(--ink)",
            boxShadow: "5px 5px 0 var(--ink)",
            background: "var(--paper-2)",
            overflow: "hidden",
          }}
        >
          <Image
            src={next.hero}
            alt={`${next.title} — cover`}
            fill
            sizes="(max-width: 480px) 92px, (max-width: 900px) 120px, 140px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div ref={titleWrapRef} style={{ flex: "1 1 auto", minWidth: 0 }}>
          <div className="mono" style={{ fontSize: 12, letterSpacing: "0.2em", opacity: 0.6, marginBottom: 12 }}>
            ━━ KEEP READING
          </div>
          <h3
            ref={titleRef}
            className="display-wide"
            style={{
              fontSize: "clamp(36px, 5vw, 72px)",
              margin: 0,
              maxWidth: "100%",
              minWidth: 0,
              whiteSpace: "nowrap",
            }}
          >
            {data.nextTitle}
          </h3>
        </div>
        <div
          style={{
            flex: "0 0 auto",
            display: "grid",
            placeItems: "center",
            width: 52,
            height: 52,
            border: "2px solid var(--ink)",
            boxShadow: "4px 4px 0 var(--accent)",
            background: "var(--paper)",
          }}
          aria-hidden
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="var(--ink)" strokeWidth="2.5">
            <path d="M8 4L15 11L8 18" />
          </svg>
        </div>
      </Link>
    </section>
  );
}
