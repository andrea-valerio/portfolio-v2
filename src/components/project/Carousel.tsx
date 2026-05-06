"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ProjectImageGroup } from "@/lib/projects";

type CarouselProps = {
  group: ProjectImageGroup;
  onOpen: (id: string) => void;
};

export function Carousel({ group, onOpen }: CarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const firstImageRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [imageH, setImageH] = useState<number>(0);

  const isPortrait = group.layout === "portrait";
  /** Landscape rows: height-driven frame. Portrait rows: fixed width so size does not follow vw/vmin or the mobile full-bleed carousel override in globals.css. */
  const landscapeFrameHeight = "clamp(240px, 36vw, 540px)";
  const portraitFrameWidth = "220px";
  const showArrows = group.items.length > 1;

  const scrollByItem = (delta: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-carousel-item]"));
    if (!items.length) return;
    const offsets = items.map((it) => it.offsetLeft);
    const currentScroll = el.scrollLeft;
    let target: number | null = null;
    if (delta > 0) {
      target = offsets.find((o) => o > currentScroll + 5) ?? null;
    } else {
      for (let i = offsets.length - 1; i >= 0; i--) {
        if (offsets[i] < currentScroll - 5) {
          target = offsets[i];
          break;
        }
      }
    }
    if (target == null) return;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      const overflow = el.scrollWidth - el.clientWidth > 1;
      setCanPrev(overflow && el.scrollLeft > 1);
      setCanNext(overflow && el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [group.items.length]);

  useEffect(() => {
    const el = firstImageRef.current;
    if (!el) return;
    const update = () => setImageH(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isPortrait, group.items.length]);

  const arrowBaseStyle = {
    position: "absolute" as const,
    top:
      imageH > 0
        ? imageH / 2
        : isPortrait
          ? 232
          : `calc(${landscapeFrameHeight} / 2)`,
    transform: "translateY(-50%)",
    width: 44,
    height: 44,
    display: "grid",
    placeItems: "center",
    background: "var(--paper)",
    border: "2px solid var(--ink)",
    zIndex: 2,
    transition: "opacity 0.2s, box-shadow 0.2s",
  };

  return (
    <div style={{ position: "relative", margin: "32px 0" }}>
      <div style={{ position: "relative" }}>
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
          {group.items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              data-carousel-item
              data-anim-item
              onClick={() => onOpen(item.id)}
              style={{
                flex: "0 0 auto",
                scrollSnapAlign: "start",
                padding: 0,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {isPortrait ? (
                <div
                  ref={idx === 0 ? firstImageRef : undefined}
                  data-card-hover
                  data-carousel-image
                  data-carousel-layout="portrait"
                  style={{
                    position: "relative",
                    width: portraitFrameWidth,
                    height: "auto",
                    padding: 10,
                    border: "2px solid var(--ink)",
                    boxShadow: "5px 5px 0 var(--ink)",
                    background: "var(--paper-2)",
                    transition: "box-shadow 0.3s",
                    boxSizing: "border-box",
                  }}
                >
                  {/*
                    Padding + aspect-ratio on the same box skews the content area vs the image.
                    Keep ratio on an inner wrapper so object-fit tracks true dimensions.
                  */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: `${item.src.width} / ${item.src.height}`,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 900px) 280px, 280px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              ) : (
                <div
                  ref={idx === 0 ? firstImageRef : undefined}
                  data-card-hover
                  data-carousel-image
                  data-carousel-layout="landscape"
                  style={{
                    position: "relative",
                    height: landscapeFrameHeight,
                    aspectRatio: `${item.src.width} / ${item.src.height}`,
                    border: "2px solid var(--ink)",
                    boxShadow: "5px 5px 0 var(--ink)",
                    background: "var(--paper-2)",
                    overflow: "hidden",
                    transition: "box-shadow 0.3s",
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 900px) 80vw, 800px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              )}
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  opacity: 0.7,
                  marginTop: 10,
                  textTransform: "uppercase",
                  textAlign: "center",
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
              disabled={!canPrev}
              className="carousel-arrow carousel-arrow-prev"
              style={{
                ...arrowBaseStyle,
                left: -18,
                boxShadow: canPrev ? "3px 3px 0 var(--accent)" : "3px 3px 0 var(--ink)",
                cursor: canPrev ? "pointer" : "not-allowed",
                opacity: canPrev ? 1 : 0.35,
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
              disabled={!canNext}
              className="carousel-arrow carousel-arrow-next"
              style={{
                ...arrowBaseStyle,
                right: -18,
                boxShadow: canNext ? "3px 3px 0 var(--accent)" : "3px 3px 0 var(--ink)",
                cursor: canNext ? "pointer" : "not-allowed",
                opacity: canNext ? 1 : 0.35,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 22 22" fill="none" stroke="var(--ink)" strokeWidth="2.5">
                <path d="M8 4L15 11L8 18" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
