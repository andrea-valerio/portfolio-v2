"use client";

import { useContactModal } from "@/components/landing/ContactModalProvider";

export function FooterContactStickerRow() {
  const { openCvPreview } = useContactModal();

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
      <button type="button" className="sticker footer-contact-sticker-outline" onClick={openCvPreview}>
        CV
      </button>
    </div>
  );
}
