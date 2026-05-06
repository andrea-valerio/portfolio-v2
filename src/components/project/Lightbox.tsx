"use client";

import { useEffect } from "react";
import Image, { type StaticImageData } from "next/image";

/** Fixed cream / ink so the overlay stays readable in site dark mode (theme tokens flip). */
const LB = {
  paper: "#f4ede0",
  paper2: "#ebe2d0",
  ink: "#161310",
  line: "rgba(244, 237, 224, 0.15)",
  lineStrong: "rgba(244, 237, 224, 0.3)",
} as const;

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

export function Lightbox({ images, currentIdx, onClose, onNav, onJump }: LightboxProps) {
  const img = images[currentIdx];

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

  if (!img) return null;
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
        style={{
          flex: "1 1 0%",
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          position: "relative",
          width: "100%",
        }}
      >
        <div
          className="lightbox-stage-inner"
          style={{
            position: "relative",
            width: "min(100%, min(80vw, 1200px))",
            height: "100%",
            maxHeight: "100%",
            minHeight: 0,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            sizes="80vw"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              border: `2px solid ${LB.paper}`,
              background: LB.paper,
            }}
          />
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
        {images.map((im, i) => (
          <button
            key={im.id}
            type="button"
            onClick={() => onJump(i)}
            aria-label={`View ${im.caption}`}
            style={{
              flex: "0 0 auto",
              width: 90,
              height: 64,
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
            <Image src={im.src} alt={im.alt} fill sizes="90px" style={{ objectFit: "cover" }} />
          </button>
        ))}
      </div>
    </div>
  );
}
