"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const EMAIL = "andrea@icio.it";
const LINKEDIN_URL = "https://www.linkedin.com/in/andreavalerio1";
const LINKEDIN_HANDLE = "/in/andreavalerio1";
const CV_PATH = "/CV_Summer2026.pdf";

export type ContactModalMode = "contact" | "cv";

type ContactModalProps = {
  open: boolean;
  mode: ContactModalMode;
  onClose: () => void;
};

export function ContactModal({ open, mode, onClose }: ContactModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // data-contact-open drives the same CSS rule (joined via :is() with
    // data-menu-open) that hides .ios-status-shield and
    // .ios-toolbar-fill-bottom while a modal is open. Without this,
    // the shields (z=102, solid cream var(--paper)) sit above this
    // modal's overlay (z=100, dark rgba) and break the edge-to-edge
    // dark backdrop with a 6px cream stripe at the very top of the
    // viewport — visible on desktop and a sampling problem on iOS.
    // See globals.css and .claude/skills/ios-liquid-glass.md. */
    document.documentElement.setAttribute("data-contact-open", "");
    closeBtnRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-contact-open");
    };
  }, [open, onClose]);

  if (!open) return null;

  const isCv = mode === "cv";
  const titleId = isCv ? "cv-modal-title" : "contact-modal-title";

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(10, 10, 10, 0.92)",
        backdropFilter: "blur(8px)",
        display: "grid",
        placeItems: "center",
        padding: 24,
        animation: "lightboxIn 0.3s ease-out",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: isCv ? 900 : 480,
          maxHeight: isCv ? "min(92vh, 880px)" : undefined,
          display: isCv ? "flex" : undefined,
          flexDirection: isCv ? "column" : undefined,
          minHeight: 0,
          background: "var(--paper)",
          border: "2px solid var(--ink)",
          boxShadow: "8px 8px 0 var(--accent)",
          padding: 32,
          transform: "rotate(-0.5deg)",
        }}
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 36,
            height: 36,
            display: "grid",
            placeItems: "center",
            background: "transparent",
            color: "var(--ink)",
            border: "2px solid var(--ink)",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="var(--ink)" strokeWidth="2.5">
            <path d="M3 3L15 15M15 3L3 15" />
          </svg>
        </button>

        {isCv ? (
          <>
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "var(--muted)",
                marginBottom: 8,
              }}
            >
              PREVIEW
            </div>
            <h2
              id="cv-modal-title"
              className="display-wide"
              style={{
                fontSize: 36,
                lineHeight: 0.95,
                margin: 0,
                marginBottom: 16,
              }}
            >
              <span style={{ color: "var(--accent)" }}>CV</span>
            </h2>
            <div
              style={{
                flex: 1,
                minHeight: 0,
                border: "2px solid var(--ink)",
                boxShadow: "4px 4px 0 var(--ink)",
                background: "color-mix(in srgb, var(--ink) 4%, transparent)",
              }}
            >
              <iframe
                src={CV_PATH}
                title="CV PDF preview"
                style={{
                  display: "block",
                  width: "100%",
                  height: "min(70vh, 640px)",
                  border: 0,
                }}
              />
            </div>
            <p
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                margin: "14px 0 0",
                color: "var(--muted)",
              }}
            >
              <a
                href={CV_PATH}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--ink)", textUnderlineOffset: 3 }}
              >
                OPEN PDF IN NEW TAB ↗
              </a>
            </p>
          </>
        ) : (
          <>
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "var(--muted)",
                marginBottom: 8,
              }}
            >
              LET&apos;S TALK
            </div>
            <h2
              id="contact-modal-title"
              className="display-wide"
              style={{
                fontSize: 36,
                lineHeight: 0.95,
                margin: 0,
                marginBottom: 12,
              }}
            >
              GET IN <span style={{ color: "var(--accent)" }}>TOUCH</span>
            </h2>
            <p
              className="serif"
              style={{
                fontSize: 15,
                lineHeight: 1.5,
                color: "var(--ink-soft)",
                margin: 0,
                marginBottom: 24,
              }}
            >
              Pick whichever channel works best for you — I usually reply within a day or two.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <ContactRow
                href={`mailto:${EMAIL}`}
                label="Email"
                ariaLabel={`Email ${EMAIL}`}
                icon={
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="var(--paper)" strokeWidth="2">
                    <rect x="2" y="4" width="14" height="10" />
                    <path d="M2 5L9 10L16 5" />
                  </svg>
                }
              />
              <ContactRow
                href={LINKEDIN_URL}
                label="LinkedIn"
                ariaLabel={`LinkedIn profile ${LINKEDIN_HANDLE}`}
                external
                icon={
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="var(--paper)">
                    <rect x="2" y="6.5" width="3" height="9" />
                    <circle cx="3.5" cy="3.5" r="1.6" />
                    <path d="M7.5 6.5h3v1.3c.5-.85 1.6-1.5 3-1.5 2.4 0 3 1.5 3 3.4v5.8h-3v-5c0-1.1-.4-1.85-1.5-1.85S10.5 9.4 10.5 10.5v5h-3z" />
                  </svg>
                }
              />
              <ContactRow
                href={CV_PATH}
                label="CV (PDF)"
                ariaLabel="Open CV as PDF"
                external
                icon={
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="var(--paper)" strokeWidth="1.8">
                    <path d="M4 3h8l3 3v9H4z" />
                    <path d="M12 3v4h4" />
                    <circle cx="8.5" cy="11" r="2.2" />
                    <path d="M10.2 12.7 13 15.5" strokeLinecap="round" />
                  </svg>
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

type ContactRowProps = {
  href: string;
  label: string;
  /** Shown under the title when set; omit for a single-line row. */
  sublabel?: string;
  /** Accessible name when sublabel is hidden (e.g. email address). */
  ariaLabel?: string;
  glyph?: string;
  icon: React.ReactNode;
  external?: boolean;
  download?: boolean;
};

function ContactRow({
  href,
  label,
  sublabel,
  ariaLabel,
  glyph = "↗",
  icon,
  external,
  download,
}: ContactRowProps) {
  const linkProps: { target?: string; rel?: string; download?: string } = {};
  if (external) {
    linkProps.target = "_blank";
    linkProps.rel = "noopener noreferrer";
  }
  if (download) {
    linkProps.download = "";
  }

  const baseStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "12px 16px",
    background: "var(--paper)",
    color: "var(--ink)",
    border: "2px solid var(--ink)",
    boxShadow: "3px 3px 0 var(--ink)",
    textDecoration: "none",
    transition:
      "transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s",
    cursor: "pointer",
  };

  return (
    <a
      href={href}
      {...linkProps}
      aria-label={ariaLabel}
      style={baseStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translate(-2px, -2px)";
        e.currentTarget.style.boxShadow = "5px 5px 0 var(--accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "3px 3px 0 var(--ink)";
      }}
      onFocus={(e) => {
        e.currentTarget.style.transform = "translate(-2px, -2px)";
        e.currentTarget.style.boxShadow = "5px 5px 0 var(--accent)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "3px 3px 0 var(--ink)";
      }}
    >
      <span
        aria-hidden="true"
        style={{
          flex: "0 0 auto",
          width: 36,
          height: 36,
          display: "grid",
          placeItems: "center",
          background: "var(--ink)",
        }}
      >
        {icon}
      </span>
      <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
        <span
          className="display-wide"
          style={{ fontSize: 15, letterSpacing: "0.06em", lineHeight: 1 }}
        >
          {label.toUpperCase()}
        </span>
        {sublabel ? (
          <span
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              color: "var(--muted)",
              textTransform: "none",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {sublabel}
          </span>
        ) : null}
      </span>
      <span
        aria-hidden="true"
        className="display-wide"
        style={{ fontSize: 18, color: "var(--ink)" }}
      >
        {glyph}
      </span>
    </a>
  );
}
