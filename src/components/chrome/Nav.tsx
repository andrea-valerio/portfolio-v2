"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useContactModal } from "@/components/landing/ContactModalProvider";
import { SmoothHashLink } from "@/components/chrome/SmoothHashLink";

type NavProps = { active?: "projects" | "pubs" | null };

const STORAGE_KEY = "portfolio-mode";

function applyMode(mode: "light" | "dark") {
  if (typeof document === "undefined") return;
  if (mode === "dark") document.documentElement.setAttribute("data-mode", "dark");
  else document.documentElement.removeAttribute("data-mode");
}

function readFollowsSystem(): boolean {
  try {
    const m = localStorage.getItem(STORAGE_KEY);
    return m !== "light" && m !== "dark";
  } catch {
    return true;
  }
}

export function Nav({ active = null }: NavProps) {
  const { openContact } = useContactModal();
  const navRef = useRef<HTMLElement>(null);
  const brandGroupRef = useRef<HTMLDivElement>(null);
  const navActionsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const sectionLinksRef = useRef<HTMLDivElement>(null);
  const [showSectionLinks, setShowSectionLinks] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [followsSystem, setFollowsSystem] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    setIsDark(document.documentElement.getAttribute("data-mode") === "dark");
    setFollowsSystem(readFollowsSystem());
  }, []);

  /** Prefer full name; if the bar would overflow (or CTA would clip), hide Projects/Pubs. */
  useLayoutEffect(() => {
    const nav = navRef.current;
    const links = sectionLinksRef.current;
    const brand = brandGroupRef.current;
    const actions = navActionsRef.current;
    const cta = ctaRef.current;
    if (!nav || !links) return;

    const update = () => {
      links.removeAttribute("hidden");
      void nav.offsetWidth;

      const navOverflow = nav.scrollWidth > nav.clientWidth + 1;

      let ctaClipped = false;
      if (cta) {
        void cta.offsetWidth;
        ctaClipped = cta.scrollWidth > cta.clientWidth + 1;
      }

      let rowTooWide = false;
      if (brand && actions) {
        const g = parseFloat(getComputedStyle(nav).gap || "0") || 0;
        rowTooWide = brand.offsetWidth + g + actions.offsetWidth > nav.clientWidth + 1;
      }

      const overflow = navOverflow || ctaClipped || rowTooWide;
      setShowSectionLinks(!overflow);
    };

    const ro = new ResizeObserver(update);
    ro.observe(nav);
    update();
    const fonts = document.fonts;
    const p = fonts?.ready;
    if (p && typeof p.then === "function") {
      void p.then(update);
    }
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (followsSystem !== true) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const dark = mq.matches;
      applyMode(dark ? "dark" : "light");
      setIsDark(dark);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [followsSystem]);

  const toggleMode = () => {
    const next = !isDark;
    setIsDark(next);
    setFollowsSystem(false);
    const mode = next ? "dark" : "light";
    applyMode(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* noop */
    }
  };

  return (
    <nav ref={navRef} className="nav">
      <div ref={brandGroupRef} className="nav-brand-group">
        <Link href="/" className="brand">
          <span>Andrea Valerio</span>
        </Link>
        <button
          onClick={toggleMode}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Light mode" : "Dark mode"}
          className="mode-toggle"
          type="button"
        >
          <span className="mode-track">
            <span
              className="mode-knob"
              style={{ transform: isDark ? "translateX(22px)" : "translateX(0)" }}
            >
              {isDark ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="var(--paper)" strokeWidth="1.6">
                  <path d="M10 7.5A4.5 4.5 0 014.5 2 4.5 4.5 0 1010 7.5z" fill="var(--paper)" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="var(--paper)" strokeWidth="1.6">
                  <circle cx="6" cy="6" r="2.5" fill="var(--paper)" />
                  <g stroke="var(--paper)" strokeLinecap="round">
                    <line x1="6" y1="0.5" x2="6" y2="2" />
                    <line x1="6" y1="10" x2="6" y2="11.5" />
                    <line x1="0.5" y1="6" x2="2" y2="6" />
                    <line x1="10" y1="6" x2="11.5" y2="6" />
                    <line x1="2" y1="2" x2="3" y2="3" />
                    <line x1="9" y1="9" x2="10" y2="10" />
                    <line x1="2" y1="10" x2="3" y2="9" />
                    <line x1="9" y1="3" x2="10" y2="2" />
                  </g>
                </svg>
              )}
            </span>
          </span>
        </button>
      </div>
      <div ref={navActionsRef} className="nav-actions">
        <div ref={sectionLinksRef} className="links" hidden={!showSectionLinks}>
          <SmoothHashLink sectionId="projects" href="/#projects" className={active === "projects" ? "active" : ""}>
            Projects
          </SmoothHashLink>
          <SmoothHashLink
            sectionId="publications"
            href="/#publications"
            className={active === "pubs" ? "active" : ""}
          >
            Pubs
          </SmoothHashLink>
        </div>
        <button ref={ctaRef} type="button" className="btn nav-cta" onClick={openContact} aria-label="Get in touch">
          <span className="nav-cta-label nav-cta-label-long">Get in touch</span>
          <span className="nav-cta-label nav-cta-label-short" aria-hidden="true">
            Contact
          </span>
        </button>
      </div>
    </nav>
  );
}
