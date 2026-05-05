"use client";

import { useRef } from "react";
import Image from "next/image";
import type { ProjectImageGroup } from "@/lib/projects";

type CarouselProps = {
  group: ProjectImageGroup;
  onOpen: (id: string) => void;
};

export function Carousel({ group, onOpen }: CarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByItem = (delta: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>("[data-carousel-item]");
    const step = item ? item.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: delta * step, behavior: "smooth" });
  };

  const isPortrait = group.layout === "portrait";
  const aspectRatio = isPortrait ? "9 / 19.5" : "16 / 10";
  const itemBasis = isPortrait ? "clamp(220px, 28%, 300px)" : "clamp(280px, 88%, 880px)";
  const showArrows = group.items.length > 1;

  return (
    <div style={{ position: "relative", margin: "32px 0" }}>
      {group.label && (
        <div
          className="mono"
          style={{ fontSize: 11, letterSpacing: "0.2em", opacity: 0.65, marginBottom: 14 }}
        >
          ━━ {group.label.toUpperCase()}
        </div>
      )}

      <div
        ref={scrollerRef}
        data-anim="project-grid"
        style={{
          display: "flex",
          gap: 20,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingBottom: 12,
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {group.items.map((item) => (
          <button
            key={item.id}
            type="button"
            data-carousel-item
            data-anim-item
            onClick={() => onOpen(item.id)}
            style={{
              flex: `0 0 ${itemBasis}`,
              scrollSnapAlign: "start",
              padding: 0,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div
              data-card-hover
              style={{
                position: "relative",
                aspectRatio,
                border: "2px solid var(--ink)",
                boxShadow: "5px 5px 0 var(--ink)",
                background: "var(--paper-2)",
                overflow: "hidden",
                transition: "box-shadow 0.3s",
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={isPortrait ? "300px" : "(max-width: 900px) 88vw, 880px"}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                opacity: 0.7,
                marginTop: 10,
                textTransform: "uppercase",
              }}
            >
              {item.caption}
            </div>
          </button>
        ))}
      </div>

      {showArrows && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => scrollByItem(-1)}
            style={{
              position: "absolute",
              left: -18,
              top: "42%",
              transform: "translateY(-50%)",
              width: 44,
              height: 44,
              display: "grid",
              placeItems: "center",
              background: "var(--paper)",
              border: "2px solid var(--ink)",
              boxShadow: "3px 3px 0 var(--accent)",
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none" stroke="var(--ink)" strokeWidth="2.5">
              <path d="M14 4L7 11L14 18" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => scrollByItem(1)}
            style={{
              position: "absolute",
              right: -18,
              top: "42%",
              transform: "translateY(-50%)",
              width: 44,
              height: 44,
              display: "grid",
              placeItems: "center",
              background: "var(--paper)",
              border: "2px solid var(--ink)",
              boxShadow: "3px 3px 0 var(--accent)",
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none" stroke="var(--ink)" strokeWidth="2.5">
              <path d="M8 4L15 11L8 18" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
