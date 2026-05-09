"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const EMAIL = "andrea@icio.it";
export const LINKEDIN_URL = "https://www.linkedin.com/in/andreavalerio1";
const LINKEDIN_HANDLE = "/in/andreavalerio1";
export const GITHUB_URL = "https://github.com/andrea-valerio";
export const CV_PATH = "/CV/CV_Summer2026.pdf";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ContactModal({ open, onClose }: ContactModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // data-contact-open is kept as a state-tracking primitive even though
    // no CSS rule currently consumes it. Mirrors data-menu-open in
    // Nav.tsx — both attributes are cheap CSS hooks for any future
    // modal-state-driven styling we might want. The previous design
    // used :is([data-menu-open], [data-contact-open]) to hide the shields
    // during modal-open; that's been simplified to "top shield always
    // visible cream/theme, no bottom shield." See globals.css and
    // .claude/skills/ios-liquid-glass.md for the full rationale.
    document.documentElement.setAttribute("data-contact-open", "");
    closeBtnRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-contact-open");
    };
  }, [open, onClose]);

  if (!open) return null;

  const titleId = "contact-modal-title";

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
          maxWidth: 480,
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
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="var(--paper)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 2h7l3 3v11H4z" />
                    <path d="M11 2v3h3" />
                  </svg>
                }
              />
            </div>
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
  /** Trailing indicator. Defaults to an external-link arrow SVG.
   *  We render an SVG (not a Unicode "↗") because U+2197 has emoji
   *  presentation on iOS — Safari/Chrome on iPhone render it as a
   *  blue rounded-square emoji instead of a text glyph. */
  glyph?: React.ReactNode;
  icon: React.ReactNode;
  external?: boolean;
  download?: boolean;
};

function ContactRow({
  href,
  label,
  sublabel,
  ariaLabel,
  glyph,
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
        style={{
          color: "var(--ink)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {glyph ?? <ExternalArrow size={24} />}
      </span>
    </a>
  );
}

function ExternalArrow({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 12L12 6" />
      <path d="M7 6h5v5" />
    </svg>
  );
}
