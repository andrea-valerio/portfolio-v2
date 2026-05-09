"use client";

import { CV_PATH, GITHUB_URL, LINKEDIN_URL } from "@/components/landing/ContactModal";

export function FooterContactStickerRow() {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      <a
        href="mailto:andrea@icio.it"
        className="sticker"
        style={{ background: "var(--paper)", color: "var(--ink)" }}
      >
        Email
      </a>
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="sticker"
        style={{ background: "var(--paper)", color: "var(--ink)" }}
      >
        LinkedIn
      </a>
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="sticker"
        style={{ background: "var(--paper)", color: "var(--ink)" }}
      >
        GitHub
      </a>
      <a
        href={CV_PATH}
        target="_blank"
        rel="noopener noreferrer"
        className="sticker footer-contact-sticker-outline"
        aria-label="Open CV as PDF"
      >
        CV
      </a>
    </div>
  );
}
