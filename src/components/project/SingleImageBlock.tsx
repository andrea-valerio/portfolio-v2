"use client";

import Image from "next/image";
import type { ProjectImageItem } from "@/lib/projects";

type SingleImageBlockProps = {
  item: ProjectImageItem;
  layout: "landscape" | "portrait";
  onOpen: (id: string) => void;
};

export function SingleImageBlock({ item, layout, onOpen }: SingleImageBlockProps) {
  const aspectRatio = layout === "portrait" ? "9 / 19.5" : "16 / 10";
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
        textAlign: "left",
        margin: "32px 0",
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
        }}
      >
        {item.caption}
      </div>
    </button>
  );
}
