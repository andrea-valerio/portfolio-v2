"use client";

import { useState, useMemo } from "react";
import { Lightbox, type LightboxImage } from "./Lightbox";
import { Carousel } from "./Carousel";
import { SingleImageBlock } from "./SingleImageBlock";
import { Placeholder } from "@/components/primitives/Placeholder";
import type { ProjectCaseStudy, ProjectImageGroup } from "@/lib/projects";

function Prose({ paragraphs }: { paragraphs: string[] }) {
  if (!paragraphs?.length) return null;
  return (
    <div
      className="serif"
      style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 16, fontSize: 18, lineHeight: 1.6 }}
    >
      {paragraphs.map((p, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
      ))}
    </div>
  );
}

function GroupRenderer({
  groups,
  onOpen,
}: {
  groups: ProjectImageGroup[];
  onOpen: (id: string) => void;
}) {
  if (!groups?.length) return null;
  return (
    <>
      {groups.map((group, i) => {
        // No images wired up yet → show a labeled placeholder in the gallery's
        // slot. Drop real items into the group (see src/lib/project-images.ts)
        // and it renders as the live carousel / image automatically.
        if (group.items.length === 0) {
          return (
            <Placeholder
              key={i}
              label={`${group.label ?? "Gallery"} — images coming soon`}
              style={{
                width: "100%",
                height:
                  group.layout === "portrait"
                    ? "clamp(360px, 60vw, 540px)"
                    : "clamp(240px, 36vw, 540px)",
                margin: "32px 0",
              }}
            />
          );
        }
        if (group.kind === "carousel") {
          return <Carousel key={i} group={group} onOpen={onOpen} />;
        }
        return (
          <SingleImageBlock
            key={i}
            item={group.items[0]}
            layout={group.layout}
            onOpen={onOpen}
          />
        );
      })}
    </>
  );
}

export function ProjectClient({ data }: { data: ProjectCaseStudy }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const allImages: LightboxImage[] = useMemo(
    () =>
      data.sections.flatMap((s) => {
        const groups = [...s.groups, ...(s.groupsAfterBody ?? [])];
        return groups.flatMap((g) =>
          g.items.map((item) => ({
            id: item.id,
            src: item.src,
            alt: item.alt,
            caption: item.caption,
            section: s.title,
          })),
        );
      }),
    [data],
  );

  const indexById = useMemo(() => {
    const map = new Map<string, number>();
    allImages.forEach((img, i) => map.set(img.id, i));
    return map;
  }, [allImages]);

  const openById = (id: string) => {
    const idx = indexById.get(id);
    if (idx != null) setLightboxIdx(idx);
  };
  const close = () => setLightboxIdx(null);

  return (
    <>
      {data.sections.map((section, i) => (
        <section
          key={i}
          data-section="project-body"
          style={{ padding: "80px 48px", maxWidth: 1440, margin: "0 auto", position: "relative" }}
        >
          <div className="project-section-shell">
            <div className="project-section-num-wrap">
              <div className="project-section-num-inner">
                <div className="display-wide" style={{ fontSize: 64, color: "var(--accent)" }}>
                  {section.n}
                </div>
                <div
                  className="mono"
                  style={{ fontSize: 11, letterSpacing: "0.2em", marginTop: 8, opacity: 0.5 }}
                >
                  ━━━━━━
                </div>
              </div>
            </div>
            <div className="project-section-heading-block">
              <div className="hand project-section-eyebrow" style={{ fontSize: 28, color: "var(--accent)" }}>
                {section.eyebrow}
              </div>
              <h2
                className="display-wide"
                data-anim="section-title"
                data-title-words
                style={{
                  fontSize: "clamp(36px, 5vw, 72px)",
                  marginBottom: 24,
                  overflowWrap: "normal",
                  wordBreak: "normal",
                  hyphens: "none",
                }}
              >
                {section.title}
                <span style={{ color: "var(--accent)" }}>.</span>
              </h2>
              {section.subtitle && (
                <div
                  className="hand"
                  style={{
                    fontSize: "clamp(22px, 3.2vw, 32px)",
                    color: "var(--ink)",
                    opacity: 0.82,
                    lineHeight: 1.15,
                    marginTop: -6,
                    transform: "rotate(-1deg)",
                    transformOrigin: "left center",
                  }}
                >
                  {section.subtitle}
                </div>
              )}
            </div>
            <div className="project-section-gutter" aria-hidden />
            <div className="project-section-body">
              <Prose paragraphs={section.intro} />
              <GroupRenderer groups={section.groups} onOpen={openById} />
              <Prose paragraphs={section.body} />
              <GroupRenderer groups={section.groupsAfterBody ?? []} onOpen={openById} />
            </div>
          </div>
        </section>
      ))}

      {lightboxIdx !== null && (
        <Lightbox
          images={allImages}
          currentIdx={lightboxIdx}
          onClose={close}
        />
      )}
    </>
  );
}
