import Link from "next/link";
import Image from "next/image";
import { PROJECTS_SUMMARY } from "@/lib/projects";
import { Sticker } from "@/components/primitives/Sticker";

const SPAN_TO_COLS = { big: 8, med: 4, small: 4 } as const;

/** Set to true to show the short blurb under project titles on cards. */
const SHOW_PROJECT_CARD_DESCRIPTION = false;

export function ProjectsSection() {
  return (
    <section
      id="projects"
      style={{ padding: "120px 48px 100px", maxWidth: 1440, margin: "0 auto", position: "relative" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 24,
          marginBottom: 56,
        }}
      >
        <div>
          <div
            className="hand"
            style={{
              fontSize: 32,
              color: "var(--accent)",
              transform: "rotate(-2deg)",
              display: "inline-block",
              marginBottom: 4,
            }}
          >
            recent runs
          </div>
          <h2
            className="display-wide"
            data-anim="section-title-wordmarks"
            style={{
              fontSize: "clamp(44px, 7vw, 96px)",
              display: "flex",
              flexWrap: "wrap",
              columnGap: "0.22em",
              rowGap: "0.06em",
              alignItems: "baseline",
              hyphens: "none",
              wordBreak: "normal",
              overflowWrap: "normal",
            }}
          >
            <span data-anim-word style={{ whiteSpace: "nowrap" }}>
              SELECTED
            </span>
            <span data-anim-word style={{ whiteSpace: "nowrap" }}>
              PROJECTS
            </span>
          </h2>
        </div>
      </div>

      <div
        data-anim="project-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 24,
          gridAutoRows: "minmax(240px, auto)",
        }}
      >
        {PROJECTS_SUMMARY.map((p, i) => {
          const col = SPAN_TO_COLS[p.span];
          const isBig = p.span === "big";
          const aspect = isBig ? "16/10" : p.span === "med" ? "4/3" : "1/1";
          const rotate = i % 3 === 0 ? "rotate(-0.4deg)" : i % 3 === 1 ? "rotate(0.3deg)" : "rotate(-0.2deg)";
          return (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}/`}
              data-anim-item
              data-card-hover
              style={{
                gridColumn: `span ${col}`,
                position: "relative",
                minWidth: 0,
                width: "100%",
                maxWidth: "100%",
                background: i % 2 === 0 ? "var(--paper)" : "var(--paper-2)",
                border: "2px solid var(--ink)",
                boxShadow: "6px 6px 0 var(--ink)",
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s",
                transform: rotate,
              }}
            >
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  border: "2px solid var(--ink)",
                  aspectRatio: aspect,
                }}
              >
                <div data-card-image style={{ position: "relative", width: "100%", height: "100%" }}>
                  <Image
                    src={p.hero}
                    alt={`${p.title} — cover`}
                    fill
                    sizes={isBig ? "(max-width: 1440px) 60vw, 880px" : "(max-width: 1440px) 32vw, 440px"}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div
                  className="halftone"
                  style={{ position: "absolute", inset: 0, opacity: 0.09, pointerEvents: "none" }}
                />
                <div style={{ position: "absolute", top: 12, right: 12 }}>
                  <Sticker variant="solid" data-project-year>
                    {p.year}
                  </Sticker>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    data-card-num
                    className="display"
                    style={{ fontSize: 28, color: "var(--ink)", transition: "all 0.3s" }}
                  >
                    {p.n}
                  </span>
                  <span className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", opacity: 0.65 }}>
                    {p.tag}
                  </span>
                </div>
                <h3
                  className="display"
                  style={{
                    fontSize: isBig ? "clamp(28px, 4vw, 44px)" : "clamp(18px, 2.8vw, 28px)",
                    lineHeight: 0.95,
                    overflowWrap: "break-word",
                    hyphens: "none",
                  }}
                >
                  {p.title}
                </h3>
                {SHOW_PROJECT_CARD_DESCRIPTION && p.span !== "small" && (
                  <p style={{ fontSize: 14, lineHeight: 1.5, opacity: 0.85, maxWidth: 520 }}>{p.desc}</p>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 8,
                    fontSize: 12,
                  }}
                >
                  <span className="mono" style={{ letterSpacing: "0.16em" }}>
                    READ CASE STUDY
                  </span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M2 7H12M12 7L8 3M12 7L8 11" />
                  </svg>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
