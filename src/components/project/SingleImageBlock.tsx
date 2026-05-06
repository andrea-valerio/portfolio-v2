"use client";

import Image from "next/image";
import type { ProjectImageItem } from "@/lib/projects";

type SingleImageBlockProps = {
  item: ProjectImageItem;
  layout: "landscape" | "portrait";
  onOpen: (id: string) => void;
};

export function SingleImageBlock({ item, layout, onOpen }: SingleImageBlockProps) {
  const { width: intrinsicW, height: intrinsicH } = item.src;
  /** Portrait singles stay narrower; landscape uses full column width. Height follows intrinsic ratio. */
  const frameWidth =
    layout === "portrait" ? ("min(100%, min(420px, 90vw))" as const) : ("100%" as const);

  return (
    <button
      type="button"
      data-anim-item
      onClick={() => onOpen(item.id)}
      style={{
        display: "block",
        width: "100%",
        padding: 0,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        margin: "32px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          data-card-hover
          data-single-image
          style={{
            width: frameWidth,
            maxWidth: "100%",
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
            width={intrinsicW}
            height={intrinsicH}
            sizes={
              layout === "portrait"
                ? "(max-width: 480px) 90vw, 420px"
                : "(max-width: 900px) 90vw, min(920px, 100vw)"
            }
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
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
            textAlign: "center",
            width: "100%",
          }}
        >
          {item.caption}
        </div>
      </div>
    </button>
  );
}
