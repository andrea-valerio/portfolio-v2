import Link from "next/link";
import { PROJECTS_SUMMARY } from "@/lib/projects";

export function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "var(--paper)", position: "relative" }}>
      {/* Top contact band */}
      <div style={{ padding: "88px 48px 48px", maxWidth: 1440, margin: "0 auto" }}>
        <div className="footer-contact-grid">
          <div>
            <div
              className="hand"
              style={{
                fontSize: 36,
                color: "var(--accent)",
                marginBottom: 8,
                transform: "rotate(-2deg)",
                display: "inline-block",
              }}
            >
              let&apos;s build sth.
            </div>
            <div
              className="display-wide"
              style={{ fontSize: "clamp(36px, 5vw, 72px)", marginBottom: 24, lineHeight: 1 }}
            >
              LET&apos;S CONNECT
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a
                href="mailto:andrea@icio.it"
                className="sticker"
                style={{ background: "var(--paper)", color: "var(--ink)" }}
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/andreavalerio1"
                className="sticker"
                style={{ background: "var(--paper)", color: "var(--ink)" }}
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/andrea-valerio"
                className="sticker"
                style={{ background: "var(--paper)", color: "var(--ink)" }}
              >
                GitHub
              </a>
            </div>
          </div>
          <div>
            <div
              className="mono"
              style={{ fontSize: 11, letterSpacing: "0.2em", opacity: 0.6, marginBottom: 16 }}
            >
              ━━ QUICK LINKS
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {PROJECTS_SUMMARY.slice(0, 3).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}/`}
                    className="serif footer-quick-link"
                    style={{ fontSize: 16, lineHeight: 1.5 }}
                  >
                    {p.n} {p.title}
                  </Link>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {PROJECTS_SUMMARY.slice(3, 5).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}/`}
                    className="serif footer-quick-link"
                    style={{ fontSize: 16, lineHeight: 1.5 }}
                  >
                    {p.n} {p.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom band */}
      <div
        style={{
          borderTop: "2px solid var(--accent)",
          padding: "20px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.2em", opacity: 0.6 }}>
          2026
        </div>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.2em", opacity: 0.6 }}>
          ANDREA VALERIO
        </div>
      </div>
    </footer>
  );
}
