"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { useContactModal } from "@/components/landing/ContactModalProvider";
import { SmoothHashLink } from "@/components/chrome/SmoothHashLink";

type NavProps = { active?: "projects" | "pubs" | null };

const STORAGE_KEY = "portfolio-mode";
/** Hamburger + drawer below 640px; inline links + theme toggle from 640px up */
const MOBILE_NAV_MQ = "(max-width: 639px)";
const MIN_VIEWPORT_FOR_NAV_CTA = "(min-width: 400px)";
const EMAIL_MAILTO = "mailto:andrea@icio.it";
const LINKEDIN_URL = "https://www.linkedin.com/in/andreavalerio1";
const GITHUB_URL = "https://github.com/andrea-valerio";

function subscribeMobileNav(cb: () => void) {
  const mq = window.matchMedia(MOBILE_NAV_MQ);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getMobileNavSnapshot() {
  return window.matchMedia(MOBILE_NAV_MQ).matches;
}

function getMobileNavServerSnapshot() {
  return false;
}

function subscribeNavCtaViewport(cb: () => void) {
  const mq = window.matchMedia(MIN_VIEWPORT_FOR_NAV_CTA);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getNavCtaViewportSnapshot() {
  return window.matchMedia(MIN_VIEWPORT_FOR_NAV_CTA).matches;
}

/** SSR: assume wide viewport; narrow clients correct on hydrate */
function getNavCtaViewportServerSnapshot() {
  return true;
}

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

function ModeToggle({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`mode-toggle${isDark ? " mode-toggle--dark" : ""}`}
      type="button"
    >
      <span className="mode-track">
        <span className="mode-knob">
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
  );
}

export function Nav({ active = null }: NavProps) {
  const { openContact, openCvPreview } = useContactModal();
  const navRef = useRef<HTMLElement>(null);
  const brandGroupRef = useRef<HTMLDivElement>(null);
  const navActionsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const sectionLinksRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenuBtnRef = useRef<HTMLButtonElement>(null);

  const isMobileNav = useSyncExternalStore(subscribeMobileNav, getMobileNavSnapshot, getMobileNavServerSnapshot);
  const viewportWideEnoughForCta = useSyncExternalStore(
    subscribeNavCtaViewport,
    getNavCtaViewportSnapshot,
    getNavCtaViewportServerSnapshot,
  );

  const [showSectionLinks, setShowSectionLinks] = useState(true);
  const [showCta, setShowCta] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [followsSystem, setFollowsSystem] = useState<boolean | null>(null);
  /** Avoid SSR mismatch; portal target is document.body */
  const [portalReady, setPortalReady] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => setPortalReady(true), []);

  useLayoutEffect(() => {
    setIsDark(document.documentElement.getAttribute("data-mode") === "dark");
    setFollowsSystem(readFollowsSystem());
  }, []);

  /** Desktop: hide Projects/Pubs first if tight; then hide Get in touch if it still does not fit.
   *  Mobile: hide Get in touch when it does not fit (menu stays), or when viewport is under 400px wide. */
  useLayoutEffect(() => {
    const nav = navRef.current;
    const links = sectionLinksRef.current;
    const brand = brandGroupRef.current;
    const actions = navActionsRef.current;
    const cta = ctaRef.current;
    if (!nav || !cta) return;

    const overflowFn = () => {
      const navOverflow = nav.scrollWidth > nav.clientWidth + 1;

      let ctaClipped = false;
      void cta.offsetWidth;
      ctaClipped = cta.scrollWidth > cta.clientWidth + 1;

      let rowTooWide = false;
      if (brand && actions) {
        const g = parseFloat(getComputedStyle(nav).gap || "0") || 0;
        rowTooWide = brand.offsetWidth + g + actions.offsetWidth > nav.clientWidth + 1;
      }

      return navOverflow || ctaClipped || rowTooWide;
    };

    const update = () => {
      if (links) links.removeAttribute("hidden");
      cta.removeAttribute("hidden");
      void nav.offsetWidth;

      let nextShowLinks = true;
      if (!isMobileNav && links) {
        if (overflowFn()) {
          links.setAttribute("hidden", "");
          nextShowLinks = false;
          void nav.offsetWidth;
        }
      }

      const nextShowCta = viewportWideEnoughForCta && !overflowFn();

      setShowSectionLinks(nextShowLinks);
      setShowCta(nextShowCta);
    };

    const ro = new ResizeObserver(update);
    ro.observe(nav);
    update();
    const fonts = document.fonts;
    const p = fonts?.ready;
    if (p && typeof p.then === "function") {
      void p.then(update);
    }
    return () => {
      ro.disconnect();
    };
  }, [isMobileNav, viewportWideEnoughForCta]);

  useEffect(() => {
    if (!isMobileNav) {
      setMenuOpen(false);
    }
  }, [isMobileNav]);

  useEffect(() => {
    if (!menuOpen || !isMobileNav) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeMenuBtnRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      menuButtonRef.current?.focus();
    };
  }, [menuOpen, isMobileNav]);

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

  const menuPanelId = "nav-mobile-menu-panel";

  return (
    <nav ref={navRef} className={`nav${isMobileNav ? " nav--mobile" : ""}`}>
      <div ref={brandGroupRef} className="nav-brand-group">
        <Link href="/" className="brand">
          <span className="nav-brand-text">Andrea Valerio</span>
        </Link>
        {!isMobileNav && <ModeToggle isDark={isDark} onToggle={toggleMode} />}
      </div>
      <div ref={navActionsRef} className="nav-actions">
        {!isMobileNav && (
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
        )}
        <button
          ref={ctaRef}
          type="button"
          className="btn nav-cta"
          hidden={!showCta}
          onClick={openContact}
          aria-label="Get in touch"
        >
          <span className="nav-cta-label nav-cta-label-long">Get in touch</span>
          <span className="nav-cta-label nav-cta-label-short" aria-hidden="true">
            Contact
          </span>
        </button>
        {isMobileNav && (
          <button
            ref={menuButtonRef}
            type="button"
            className="nav-menu-trigger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls={menuPanelId}
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M3 3L15 15M15 3L3 15" />
              </svg>
            ) : (
              <svg width="22" height="18" viewBox="0 0 22 18" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <line x1="1" y1="3" x2="21" y2="3" />
                <line x1="1" y1="9" x2="21" y2="9" />
                <line x1="1" y1="15" x2="21" y2="15" />
              </svg>
            )}
          </button>
        )}
      </div>

      {portalReady &&
        isMobileNav &&
        menuOpen &&
        createPortal(
          <div
            className="nav-mobile-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget) setMenuOpen(false);
            }}
          >
            <div
              id={menuPanelId}
              role="dialog"
              aria-modal="true"
              aria-labelledby="nav-mobile-menu-title"
              className="nav-mobile-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="nav-mobile-panel-header">
                <h2 id="nav-mobile-menu-title" className="nav-mobile-panel-title">
                  Portfolio
                </h2>
                <button
                  ref={closeMenuBtnRef}
                  type="button"
                  className="nav-mobile-close"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 3L15 15M15 3L3 15" />
                  </svg>
                </button>
              </div>
              <div className="nav-mobile-links" aria-label="Sections">
                <SmoothHashLink
                  sectionId="projects"
                  href="/#projects"
                  className={active === "projects" ? "active" : ""}
                  onClick={closeMenu}
                >
                  Projects
                </SmoothHashLink>
                <SmoothHashLink
                  sectionId="publications"
                  href="/#publications"
                  className={active === "pubs" ? "active" : ""}
                  onClick={closeMenu}
                >
                  Pubs
                </SmoothHashLink>
              </div>
              <div className="nav-mobile-connect">
                <div className="nav-mobile-theme-row">
                  <span className="nav-mobile-theme-label mono">Theme</span>
                  <ModeToggle isDark={isDark} onToggle={toggleMode} />
                </div>
                <div className="nav-mobile-connect-main">
                  <p className="nav-mobile-connect-eyebrow hand">let&apos;s build sth.</p>
                  <h3 id="nav-mobile-connect-heading" className="nav-mobile-connect-title display">
                    Let&apos;s connect
                  </h3>
                  <div className="nav-mobile-connect-actions" role="group" aria-labelledby="nav-mobile-connect-heading">
                    <a href={EMAIL_MAILTO} className="sticker nav-mobile-connect-chip" onClick={closeMenu}>
                      Email
                    </a>
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sticker nav-mobile-connect-chip"
                      onClick={closeMenu}
                    >
                      LinkedIn
                    </a>
                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sticker nav-mobile-connect-chip"
                      onClick={closeMenu}
                    >
                      GitHub
                    </a>
                    <button
                      type="button"
                      className="sticker nav-mobile-connect-chip"
                      onClick={() => {
                        closeMenu();
                        openCvPreview();
                      }}
                    >
                      CV
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </nav>
  );
}
