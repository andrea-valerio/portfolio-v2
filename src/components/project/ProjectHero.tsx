import Link from "next/link";
import Image from "next/image";
import { Sticker } from "@/components/primitives/Sticker";
import type { ProjectCaseStudy } from "@/lib/projects";

export function ProjectHero({ data }: { data: ProjectCaseStudy }) {
  const meta = [
    { k: "WHEN", v: data.when },
    { k: "TYPE", v: data.type },
    { k: "WHERE", v: data.where },
    { k: "ROLE", v: data.role },
    { k: "TEAM", v: data.team },
  ];
  return (
    <section style={{ padding: "120px 48px 80px", maxWidth: 1440, margin: "0 auto", position: "relative" }}>
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
          borderBottom: "2px solid var(--ink)",
          paddingBottom: 4,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 7H2M2 7L6 3M2 7L6 11" />
        </svg>
        Back to projects
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
        style={{ fontSize: "clamp(48px, 7.5vw, 112px)", marginBottom: 24, lineHeight: 0.92 }}
      >
        {data.titleLines.map((line, i) => (
          <span
            key={i}
            className="hero-line"
            style={{
              display: "block",
              color: i === data.titleLines.length - 1 ? "var(--accent)" : "var(--ink)",
            }}
          >
            {line}
          </span>
        ))}
      </h1>

      <p
        data-anim="fade-up"
        data-delay="1.2"
        className="serif"
        style={{ fontSize: 22, lineHeight: 1.4, maxWidth: 760, marginBottom: 48 }}
      >
        {data.subtitle}
      </p>

      <div
        data-anim="fade-up"
        data-delay="1.4"
        style={{
          borderTop: "2px solid var(--ink)",
          borderBottom: "2px solid var(--ink)",
          padding: "20px 0",
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 24,
        }}
      >
        {meta.map((m, i) => (
          <div key={i}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.2em", opacity: 0.6, marginBottom: 6 }}>
              ━━ {m.k}
            </div>
            <div className="display" style={{ fontSize: 18 }}>
              {m.v}
            </div>
          </div>
        ))}
      </div>

      <div data-anim="clip-reveal" style={{ marginTop: 48, position: "relative" }}>
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
        <div className="tape" style={{ top: -14, left: "8%", width: 120, height: 36, transform: "rotate(-4deg)" }} />
        <div className="tape" style={{ top: -14, right: "12%", width: 120, height: 36, transform: "rotate(3deg)" }} />
      </div>
    </section>
  );
}
