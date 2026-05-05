"use client";

import { useContactModal } from "./ContactModalProvider";
import { SmoothHashLink } from "@/components/chrome/SmoothHashLink";

export function ContactCTA() {
  const { openContact } = useContactModal();

  return (
    <div
      data-anim="fade-up"
      data-delay="1.4"
      style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}
    >
      <button type="button" className="btn" onClick={openContact}>
        <span>Get in touch</span>
      </button>
      <SmoothHashLink sectionId="projects" href="/#projects" className="btn ghost">
        <span>Browse projects</span>
      </SmoothHashLink>
    </div>
  );
}
