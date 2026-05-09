import Link from "next/link";
import Image from "next/image";
import { Sticker } from "@/components/primitives/Sticker";
import type { ProjectCaseStudy } from "@/lib/projects";

export function ProjectHero({ data }: { data: ProjectCaseStudy }) {
  const meta = [
    { k: "WHEN", v: data.when },
    { k: "WHERE", v: data.where },
    { k: "ROLE", v: data.role },
    { k: "TEAM", v: data.team },
  ];
  return (
    <section data-section="project-hero" style={{ padding: "120px 48px 80px", maxWidth: 1440, margin: "0 auto", position: "relative" }}>
      <Link
        href="/"
        data-anim="fade-up"
        data-delay="0"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12,
          marginBottom: 32,
          fontFamily: "var(--font-mono), monospace",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--ink)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 7H2M2 7L6 3M2 7L6 11" />
        </svg>
        <span className="hero-intro-mark">Back to projects</span>
      </Link>

      <div data-anim="chip-row" style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        <Sticker variant="solid" data-anim-item>
          {data.n}
        </Sticker>
        {data.tags.map((t, i) => (
          <Sticker key={i} data-anim-item>
            {t}
          </Sticker>
        ))}
      </div>

      <h1
        className="display-wide"
        data-anim="hero-title"
        style={{
          fontSize: "clamp(40px, 8.5vw, 116px)",
          marginBottom: 24,
          lineHeight: 0.92,
          overflowWrap: "normal",
          wordBreak: "normal",
          hyphens: "none",
        }}
      >
        {data.titleLines.map((line, i) => (
          <span
            key={i}
            className="hero-line"
            style={{
              display: "block",
              ...(i === data.titleLines.length - 1 ? { color: "var(--accent)" } : {}),
            }}
          >
            {line}
          </span>
        ))}
      </h1>

      <div
        className="project-hero-meta"
        data-anim="fade-up"
        data-delay="0.5"
        style={{
          borderTop: "2px solid var(--ink)",
          borderBottom: "2px solid var(--ink)",
          padding: "20px 0",
        }}
      >
        {meta.map((m, i) => (
          <div key={i}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.2em", opacity: 0.6, marginBottom: 6 }}>
              ━━ {m.k}
            </div>
            <div className="display display--sentence" style={{ fontSize: 18 }}>
              {m.v}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 48, position: "relative" }}>
        {/* clip-reveal on mount (see Animations.tsx clip-reveal-mount); scroll-based clip-reveal stays for other pages */}
        <div data-anim="clip-reveal-mount" style={{ position: "relative", width: "100%" }}>
          <div
            style={{
              position: "relative",
              aspectRatio: "16 / 9",
              width: "100%",
              border: "2px solid var(--ink)",
              boxShadow: "8px 8px 0 var(--ink)",
              background: "var(--paper-2)",
              overflow: "hidden",
            }}
          >
            <Image
              src={data.hero}
              alt={`${data.title} — hero`}
              fill
              priority
              sizes="(max-width: 1440px) 92vw, 1344px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            className="halftone"
            style={{ position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none", border: "2px solid transparent" }}
          />
        </div>
        <div className="tape" style={{ top: -14, left: "8%", width: 120, height: 36, transform: "rotate(-4deg)" }} />
        <div className="tape" style={{ top: -14, right: "12%", width: 120, height: 36, transform: "rotate(3deg)" }} />
      </div>
    </section>
  );
}
