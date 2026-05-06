"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, TouchEvent as ReactTouchEvent } from "react";
import Image, { type StaticImageData } from "next/image";

/** Fixed cream / ink so the overlay stays readable in site dark mode (theme tokens flip). */
const LB = {
  paper: "#f4ede0",
  paper2: "#ebe2d0",
  ink: "#161310",
  line: "rgba(244, 237, 224, 0.15)",
  lineStrong: "rgba(244, 237, 224, 0.3)",
} as const;

const TRANSITION = "transform 300ms ease-out";
const NO_TRANSITION = "none";

export type LightboxImage = {
  id: string;
  src: StaticImageData;
  alt: string;
  caption: string;
  section: string;
};

type LightboxProps = {
  images: LightboxImage[];
  currentIdx: number;
  onClose: () => void;
  onNav: (delta: number) => void;
  onJump: (idx: number) => void;
};

type DragState = {
  neighborIdx: number;
  side: 1 | -1;
  phase: "dragging" | "settling";
};

type Ghost = { image: LightboxImage; direction: 1 | -1 };

export function Lightbox({ images, currentIdx, onClose, onNav, onJump }: LightboxProps) {
  const img = images[currentIdx];
  const len = images.length;

  const prevIdxRef = useRef(currentIdx);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const [dragDx, setDragDx] = useState(0);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [ghosts, setGhosts] = useState<Record<string, Ghost>>({});
  const [lastDirection, setLastDirection] = useState<1 | -1 | 0>(0);

  // Direction inference: when currentIdx changes, retire the previous image into a ghost layer.
  useEffect(() => {
    const prev = prevIdxRef.current;
    if (prev === currentIdx) return;
    prevIdxRef.current = currentIdx;
    let delta = currentIdx - prev;
    if (Math.abs(delta) > len / 2) {
      delta = delta > 0 ? delta - len : delta + len;
    }
    const direction = (delta > 0 ? 1 : -1) as 1 | -1;
    const prevImage = images[prev];
    const newImage = images[currentIdx];
    setGhosts((g) => {
      const next = { ...g };
      if (newImage) delete next[newImage.id];
      if (prevImage) next[prevImage.id] = { image: prevImage, direction };
      return next;
    });
    setLastDirection(direction);
    setDrag(null);
    setDragDx(0);
  }, [currentIdx, images, len]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onNav, onClose]);

  const onTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) {
      touchStart.current = null;
      return;
    }
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchMove = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 1) {
      touchStart.current = null;
      setDrag(null);
      setDragDx(0);
      return;
    }
    const start = touchStart.current;
    if (!start) return;
    const t = e.touches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;

    const side: 1 | -1 = dx < 0 ? 1 : -1;
    const neighborForSide = (s: 1 | -1) =>
      s === 1 ? (currentIdx + 1) % len : (currentIdx - 1 + len) % len;

    if (!drag) {
      if (Math.abs(dx) < 8) return;
      if (Math.abs(dx) <= Math.abs(dy)) return;
      setDrag({ neighborIdx: neighborForSide(side), side, phase: "dragging" });
    } else if (drag.phase === "settling" || drag.side !== side) {
      setDrag({ neighborIdx: neighborForSide(side), side, phase: "dragging" });
    }
    setDragDx(dx);
  };

  const onTouchEnd = (e: ReactTouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) {
      if (drag) setDrag({ ...drag, phase: "settling" });
      setDragDx(0);
      return;
    }
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    const horizontal = Math.abs(dx) > Math.abs(dy);
    const passes = Math.abs(dx) >= 50 && horizontal;

    if (passes && drag && drag.phase === "dragging") {
      onNav(drag.side);
    } else if (drag) {
      setDrag({ ...drag, phase: "settling" });
      setDragDx(0);
    } else {
      setDragDx(0);
    }
  };

  const removeGhost = (id: string) =>
    setGhosts((g) => {
      if (!g[id]) return g;
      const next = { ...g };
      delete next[id];
      return next;
    });

  if (!img) return null;
  const isPortrait = img.src.height > img.src.width;

  type Layer = {
    image: LightboxImage;
    start: string;
    target: string;
    transition: string;
    onSettled?: () => void;
  };
  const layers: Layer[] = [];

  for (const id of Object.keys(ghosts)) {
    if (id === img.id) continue;
    const g = ghosts[id];
    layers.push({
      image: g.image,
      start: "translateX(0%)",
      target: `translateX(${-g.direction * 100}%)`,
      transition: TRANSITION,
      onSettled: () => removeGhost(id),
    });
  }

  let currentLayer: Layer;
  if (drag && drag.phase === "dragging") {
    currentLayer = {
      image: img,
      start: "translateX(0%)",
      target: `translateX(${dragDx}px)`,
      transition: NO_TRANSITION,
    };
  } else {
    const startPct = lastDirection === 0 ? 0 : lastDirection * 100;
    currentLayer = {
      image: img,
      start: `translateX(${startPct}%)`,
      target: "translateX(0%)",
      transition: TRANSITION,
    };
  }
  layers.push(currentLayer);

  if (drag) {
    const neighbor = images[drag.neighborIdx];
    if (neighbor) {
      const sidePct = drag.side * 100;
      if (drag.phase === "dragging") {
        layers.push({
          image: neighbor,
          start: `translateX(${sidePct}%)`,
          target: `translateX(calc(${dragDx}px + ${sidePct}%))`,
          transition: NO_TRANSITION,
        });
      } else {
        layers.push({
          image: neighbor,
          start: `translateX(${sidePct}%)`,
          target: `translateX(${sidePct}%)`,
          transition: TRANSITION,
          onSettled: () => setDrag(null),
        });
      }
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(10, 10, 10, 0.92)",
        backdropFilter: "blur(8px)",
        display: "flex",
        flexDirection: "column",
        animation: "lightboxIn 0.3s ease-out",
        color: LB.paper,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "44px 1fr 44px",
          alignItems: "center",
          gap: 16,
          padding: "20px 32px",
          color: LB.paper,
          borderBottom: `1px solid ${LB.line}`,
        }}
      >
        <div />
        <div
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            color: LB.paper,
            textAlign: "center",
          }}
        >
          {img.caption}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            width: 44,
            height: 44,
            display: "grid",
            placeItems: "center",
            background: "transparent",
            border: `2px solid ${LB.paper}`,
            cursor: "pointer",
            justifySelf: "end",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={LB.paper} strokeWidth="2.5">
            <path d="M3 3L15 15M15 3L3 15" />
          </svg>
        </button>
      </div>

      <div
        className="lightbox-stage"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          flex: "1 1 0%",
          minHeight: 0,
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          padding: 24,
          position: "relative",
          width: "100%",
          touchAction: "pan-y pinch-zoom",
        }}
      >
        <div
          className="lightbox-stage-inner"
          data-lightbox-orientation={isPortrait ? "portrait" : "landscape"}
          style={{
            position: "relative",
            width: "min(100%, min(80vw, 1200px))",
            height: "100%",
            maxHeight: "100%",
            minHeight: 0,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            overflow: "hidden",
          }}
        >
          {layers.map((layer) => (
            <ImageLayer
              key={layer.image.id}
              image={layer.image}
              start={layer.start}
              target={layer.target}
              transition={layer.transition}
              onSettled={layer.onSettled}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => onNav(-1)}
          aria-label="Previous"
          className="lightbox-arrow"
          style={{
            position: "absolute",
            left: 32,
            top: "50%",
            transform: "translateY(-50%)",
            width: 56,
            height: 56,
            display: "grid",
            placeItems: "center",
            background: LB.paper,
            border: `2px solid ${LB.paper}`,
            boxShadow: "4px 4px 0 #ff5722",
            cursor: "pointer",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={LB.ink} strokeWidth="2.5">
            <path d="M14 4L7 11L14 18" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onNav(1)}
          aria-label="Next"
          className="lightbox-arrow"
          style={{
            position: "absolute",
            right: 32,
            top: "50%",
            transform: "translateY(-50%)",
            width: 56,
            height: 56,
            display: "grid",
            placeItems: "center",
            background: LB.paper,
            border: `2px solid ${LB.paper}`,
            boxShadow: "4px 4px 0 #ff5722",
            cursor: "pointer",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={LB.ink} strokeWidth="2.5">
            <path d="M8 4L15 11L8 18" />
          </svg>
        </button>
      </div>

      <div
        style={{
          padding: "16px 32px",
          borderTop: `1px solid ${LB.line}`,
          display: "flex",
          gap: 10,
          overflowX: "auto",
          justifyContent: "safe center",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {images.map((im, i) => {
          const nw = im.src.width;
          const nh = im.src.height;
          const thumbH = 64;
          const isPortrait = nh > nw;
          const thumbW = isPortrait
            ? Math.min(90, Math.max(28, Math.round(thumbH * (nw / nh))))
            : 90;
          return (
          <button
            key={im.id}
            type="button"
            onClick={() => onJump(i)}
            aria-label={`View ${im.caption}`}
            style={{
              flex: "0 0 auto",
              width: thumbW,
              height: thumbH,
              position: "relative",
              background: LB.paper2,
              border: i === currentIdx ? "2px solid #ff5722" : `2px solid ${LB.lineStrong}`,
              cursor: "pointer",
              padding: 0,
              opacity: i === currentIdx ? 1 : 0.6,
              transition: "opacity 0.2s, border-color 0.2s",
              overflow: "hidden",
            }}
          >
            <Image src={im.src} alt={im.alt} fill sizes={`${thumbW}px`} style={{ objectFit: "cover" }} />
          </button>
          );
        })}
      </div>
    </div>
  );
}

function ImageLayer({
  image,
  start,
  target,
  transition,
  onSettled,
}: {
  image: LightboxImage;
  start: string;
  target: string;
  transition: string;
  onSettled?: () => void;
}) {
  const [hasMounted, setHasMounted] = useState(false);

  useLayoutEffect(() => {
    if (hasMounted) return;
    const id = requestAnimationFrame(() => setHasMounted(true));
    return () => cancelAnimationFrame(id);
  }, [hasMounted]);

  const layerStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    transform: hasMounted ? target : start,
    transition,
    willChange: "transform",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  };

  return (
    <div
      onTransitionEnd={(e) => {
        if (e.propertyName === "transform") onSettled?.();
      }}
      style={layerStyle}
    >
      <Image
        src={image.src}
        alt={image.alt}
        sizes="80vw"
        style={{
          flex: "1 1 0%",
          minHeight: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          background: "transparent",
        }}
      />
    </div>
  );
}
