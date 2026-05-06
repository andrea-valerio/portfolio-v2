"use client";

import Image from "next/image";
import type { ProjectImageItem } from "@/lib/projects";

type SingleImageBlockProps = {
  item: ProjectImageItem;
  layout: "landscape" | "portrait";
  onOpen: (id: string) => void;
};

export function SingleImageBlock({ item, layout, onOpen }: SingleImageBlockProps) {
  const imageHeight =
    layout === "portrait" ? "clamp(440px, 56vw, 640px)" : "clamp(240px, 36vw, 540px)";
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
        data-card-hover
        data-single-image
        style={{
          position: "relative",
          height: imageHeight,
          aspectRatio: `${item.src.width} / ${item.src.height}`,
          maxWidth: "100%",
          margin: "0 auto",
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
          sizes={layout === "portrait" ? "320px" : "(max-width: 900px) 90vw, 920px"}
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
          textAlign: "center",
        }}
      >
        {item.caption}
      </div>
    </button>
  );
}
