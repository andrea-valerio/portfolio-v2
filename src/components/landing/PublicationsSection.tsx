"use client";

import { useState } from "react";
import { PUBLICATIONS } from "@/lib/publications";

type View = "interactive" | "academic";

const AUTHOR_HIGHLIGHT = "Valerio, A.";

function renderAuthors(authors: string) {
  const parts = authors.split(AUTHOR_HIGHLIGHT);
  return parts.map((part, idx) => (
    <span key={idx}>
      {part}
      {idx < parts.length - 1 ? <strong style={{ fontWeight: 700, fontStyle: "normal" }}>{AUTHOR_HIGHLIGHT}</strong> : null}
    </span>
  ));
}

export function PublicationsSection() {
  const [view, setView] = useState<View>("interactive");

  return (
    <section
      id="publications"
      style={{ padding: "100px 48px 120px", maxWidth: 1440, margin: "0 auto" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 24,
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
            also: I write papers
          </div>
          <h2
            className="display-wide"
            data-anim="section-title"
            data-title-words
            style={{
              fontSize: "clamp(32px, 7vw, 96px)",
              overflowWrap: "normal",
              wordBreak: "normal",
              hyphens: "none",
            }}
          >
            PUBLICATIONS
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            border: "2px solid var(--ink)",
            boxShadow: "4px 4px 0 var(--ink)",
            background: "var(--paper)",
          }}
        >
          <button
            onClick={() => setView("interactive")}
            title="Interactive view"
            aria-label="Interactive view"
            type="button"
            style={{
              width: 52,
              height: 52,
              display: "grid",
              placeItems: "center",
              border: "none",
              borderRight: "2px solid var(--ink)",
              background: view === "interactive" ? "var(--accent)" : "transparent",
              cursor: "pointer",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="var(--ink)" strokeWidth="2">
              <rect x="2" y="2" width="7" height="7" />
              <rect x="11" y="2" width="7" height="7" />
              <rect x="2" y="11" width="7" height="7" />
              <rect x="11" y="11" width="7" height="7" />
            </svg>
          </button>
          <button
            onClick={() => setView("academic")}
            title="Academic list"
            aria-label="Academic list"
            type="button"
            style={{
              width: 52,
              height: 52,
              display: "grid",
              placeItems: "center",
              border: "none",
              background: view === "academic" ? "var(--accent)" : "transparent",
              cursor: "pointer",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="var(--ink)" strokeWidth="2">
              <line x1="3" y1="5" x2="17" y2="5" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="15" x2="13" y2="15" />
            </svg>
          </button>
        </div>
      </div>

      {view === "interactive" && (
        <div data-anim="pub-list" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {PUBLICATIONS.map((p, i) => (
            <article
              key={i}
              data-anim-item
              className={`pub-card${p.link ? " pub-card--linked" : ""}`}
              style={{
                background: "var(--paper)",
                border: "2px solid var(--ink)",
                boxShadow: "4px 4px 0 var(--ink)",
                padding: 24,
                position: "relative",
              }}
            >
              {p.link ? (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open publication: ${p.t}`}
                  className="pub-card__overlay"
                />
              ) : null}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  marginBottom: 22,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "7px 14px",
                    background: "var(--ink)",
                    color: "var(--paper)",
                    border: "2px solid var(--ink)",
                    boxShadow: "3px 3px 0 var(--accent)",
                    fontFamily: "var(--font-mono), ui-monospace, monospace",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {p.venue}
                </span>
                {p.link ? (
                  <span className="pub-card__arrow" aria-hidden="true">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                    >
                      <line x1="6" y1="16" x2="16" y2="6" />
                      <polyline points="7.5,6 16,6 16,14.5" />
                    </svg>
                  </span>
                ) : null}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) minmax(180px, 260px)",
                  gap: 32,
                  alignItems: "start",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <h3
                    className="serif"
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      lineHeight: 1.25,
                      letterSpacing: "-0.005em",
                      color: "var(--ink)",
                    }}
                  >
                    {p.t}
                  </h3>
                  <div
                    className="serif"
                    style={{
                      fontSize: 13,
                      fontStyle: "italic",
                      opacity: 0.7,
                      marginTop: 12,
                      lineHeight: 1.4,
                    }}
                  >
                    {renderAuthors(p.authors)} <span style={{ opacity: 0.5, padding: "0 4px" }}>•</span> {p.y}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    className="serif"
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "var(--accent)",
                      letterSpacing: "-0.005em",
                      lineHeight: 1.3,
                    }}
                  >
                    {p.topic}
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      opacity: 0.6,
                      marginTop: 10,
                      textTransform: "uppercase",
                    }}
                  >
                    {p.type}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {view === "academic" && (
        <div style={{ borderTop: "2px solid var(--ink)" }}>
          {PUBLICATIONS.map((p, i) => {
            const hasDoi = p.doi && p.doi !== "—";
            const doiHref = p.link ?? (hasDoi ? `https://doi.org/${p.doi}` : undefined);
            return (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr",
                  gap: 24,
                  padding: "24px 0",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <div className="mono" style={{ fontSize: 14, letterSpacing: "0.1em", opacity: 0.6 }}>
                  [{i + 1}]
                </div>
                <div>
                  <p className="serif" style={{ fontSize: 16, lineHeight: 1.6 }}>
                    <strong>{p.authors}</strong> ({p.y}). &ldquo;{p.t}&rdquo;. In <em>Proceedings of {p.venue}</em>.
                    {hasDoi && doiHref ? (
                      <>
                        {" "}DOI:{" "}
                        <a
                          href={doiHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "inherit", textDecoration: "underline" }}
                        >
                          {p.doi}
                        </a>
                      </>
                    ) : null}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
