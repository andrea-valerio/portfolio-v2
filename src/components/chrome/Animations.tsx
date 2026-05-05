"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gsap?: GsapLike;
    ScrollTrigger?: unknown;
    __portfolioGsapRegistered?: boolean;
  }
}

type GsapLike = {
  registerPlugin: (...plugins: unknown[]) => void;
  context: (fn: () => void, scope?: unknown) => GsapContext;
  from: (target: unknown, vars: Record<string, unknown>) => unknown;
  to: (target: unknown, vars: Record<string, unknown>) => unknown;
  fromTo: (target: unknown, fromVars: Record<string, unknown>, toVars: Record<string, unknown>) => unknown;
  set: (target: unknown, vars: Record<string, unknown>) => unknown;
  timeline: (vars?: Record<string, unknown>) => GsapTimeline;
  utils: { random: (min: number, max: number) => number };
  ticker: { add: (cb: () => void) => void };
};

type GsapContext = {
  revert: () => void;
};

type GsapTimeline = {
  to: (target: unknown, vars: Record<string, unknown>, position?: number) => GsapTimeline;
  play: () => void;
  reverse: () => void;
};

function splitChars(el: Element) {
  const text = el.textContent ?? "";
  el.textContent = "";
  const chars: HTMLSpanElement[] = [];
  for (const c of text) {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.willChange = "transform, opacity";
    span.textContent = c === " " ? " " : c;
    el.appendChild(span);
    chars.push(span);
  }
  return chars;
}

/** Keeps words unbroken for line layout (char spans are otherwise splittable mid-word). */
function splitWords(el: Element) {
  const text = (el.textContent ?? "").trim();
  el.textContent = "";
  const words = text.split(/\s+/);
  const spans: HTMLSpanElement[] = [];
  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.textContent = word;
    span.style.display = "inline-block";
    span.style.whiteSpace = "nowrap";
    span.style.willChange = "transform, opacity";
    el.appendChild(span);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    spans.push(span);
  });
  return spans;
}

function registerPluginOnce(gsap: GsapLike, ScrollTrigger: unknown) {
  if (window.__portfolioGsapRegistered) return;
  gsap.registerPlugin(ScrollTrigger);
  window.__portfolioGsapRegistered = true;
}

/** All GSAP setup for whatever is currently in the document (home, project, etc.). */
function bindPageAnimations(gsap: GsapLike) {
  // HERO TITLE — chars cascade up + slight rotate
  document.querySelectorAll<HTMLElement>('[data-anim="hero-title"]').forEach((el) => {
    const lines = el.querySelectorAll(".hero-line");
    lines.forEach((line, lineIdx) => {
      const chars = splitChars(line);
      gsap.from(chars, {
        yPercent: 110,
        rotateZ: 8,
        duration: 0.9,
        stagger: 0.025,
        delay: 0.2 + lineIdx * 0.15,
        ease: "expo.out",
      });
    });
  });

  // FADE-UP — generic
  document.querySelectorAll<HTMLElement>('[data-anim="fade-up"]').forEach((el) => {
    const delay = parseFloat(el.dataset.delay || "0");
    gsap.from(el, { y: 40, opacity: 0, duration: 0.9, delay, ease: "expo.out" });
  });

  // PORTRAIT — scale in
  document.querySelectorAll<HTMLElement>('[data-anim="portrait"]').forEach((el) => {
    gsap.from(el, {
      scale: 0.85,
      rotation: -3,
      opacity: 0,
      duration: 1.2,
      delay: 0.4,
      ease: "expo.out",
    });
  });

  // STICKER POP
  document.querySelectorAll<HTMLElement>('[data-anim="sticker"]').forEach((el, i) => {
    const baseDelay = parseFloat(el.dataset.delay || "0");
    gsap.from(el, {
      scale: 0,
      rotation: gsap.utils.random(-15, 15),
      opacity: 0,
      duration: 0.6,
      delay: baseDelay + i * 0.05,
      ease: "back.out(2.5)",
    });
  });

  // SECTION HEADERS — per-character (can break mid-word if DOM is reset; avoid for multi-word display titles)
  document.querySelectorAll<HTMLElement>('[data-anim="section-title"]').forEach((el) => {
    const parts = el.hasAttribute("data-title-words") ? splitWords(el) : splitChars(el);
    gsap.from(parts, {
      scrollTrigger: { trigger: el, start: "top 80%", once: true },
      yPercent: 100,
      duration: 0.8,
      stagger: 0.02,
      ease: "expo.out",
    });
  });

  // SECTION HEADERS — explicit word spans in markup (React-safe, no mid-word wrap)
  document.querySelectorAll<HTMLElement>('[data-anim="section-title-wordmarks"]').forEach((el) => {
    const words = el.querySelectorAll<HTMLElement>("[data-anim-word]");
    if (!words.length) return;
    gsap.from(words, {
      scrollTrigger: { trigger: el, start: "top 80%", once: true },
      yPercent: 100,
      duration: 0.8,
      stagger: 0.06,
      ease: "expo.out",
    });
  });

  // PROJECT CARDS — stagger up on scroll
  document.querySelectorAll<HTMLElement>('[data-anim="project-grid"]').forEach((grid) => {
    const cards = grid.querySelectorAll("[data-anim-item]");
    gsap.from(cards, {
      scrollTrigger: { trigger: grid, start: "top 75%", once: true },
      y: 80,
      opacity: 0,
      rotation: 1,
      duration: 0.9,
      stagger: 0.08,
      ease: "expo.out",
    });
  });

  // CARD HOVER — image scale + sticker pop
  document.querySelectorAll<HTMLElement>("[data-card-hover]").forEach((card) => {
    const img = card.querySelector("[data-card-image]");
    const num = card.querySelector("[data-card-num]");
    const tl = gsap.timeline({ paused: true });
    if (img) tl.to(img, { scale: 1.06, duration: 0.6, ease: "expo.out" }, 0);
    if (num) tl.to(num, { x: 8, color: "var(--accent)", duration: 0.4, ease: "expo.out" }, 0);
    card.addEventListener("mouseenter", () => tl.play());
    card.addEventListener("mouseleave", () => tl.reverse());
  });

  // PUB ROWS — stagger up on scroll (avoid negative x so cards stay inside section padding)
  document.querySelectorAll<HTMLElement>('[data-anim="pub-list"]').forEach((list) => {
    const rows = list.querySelectorAll("[data-anim-item]");
    gsap.from(rows, {
      scrollTrigger: { trigger: list, start: "top 75%", once: true },
      y: 56,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "expo.out",
    });
  });

  // PARALLAX
  document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || "0.3");
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      y: () => window.innerHeight * speed * -1,
      ease: "none",
    });
  });

  // STICKER SPIN (hero wheel)
  document.querySelectorAll<HTMLElement>('[data-anim="sticker-spin"]').forEach((el) => {
    gsap.set(el, { rotation: 0 });
    gsap.to(el, { rotation: 360, duration: 18, ease: "none", repeat: -1 });
  });

  // CHIPS — no ScrollTrigger: rows sit under the nav / above the fold, so "top 85%" never
  // crosses while scrolling down and the tween never runs (chips stay at from-state).
  document.querySelectorAll<HTMLElement>('[data-anim="chip-row"]').forEach((row, rowIdx) => {
    const chips = row.querySelectorAll("[data-anim-item]");
    gsap.from(chips, {
      scale: 0,
      rotation: () => gsap.utils.random(-12, 12),
      opacity: 0,
      duration: 0.6,
      stagger: 0.06,
      delay: 0.08 + rowIdx * 0.04,
      ease: "back.out(2)",
    });
  });

  // CLIP REVEAL
  document.querySelectorAll<HTMLElement>('[data-anim="clip-reveal"]').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(0 100% 0 0)" },
      {
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
        clipPath: "inset(0 0% 0 0)",
        duration: 1.2,
        ease: "expo.out",
      },
    );
  });

  // BIG NUMBER COUNTER
  document.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => {
    const target = parseFloat(el.dataset.counter || "0");
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";
    const obj = { v: 0 };
    gsap.to(obj, {
      scrollTrigger: { trigger: el, start: "top 80%", once: true },
      v: target,
      duration: 1.6,
      ease: "expo.out",
      onUpdate: () => {
        el.textContent = prefix + Math.round(obj.v) + suffix;
      },
    });
  });
}

export function Animations() {
  const pathname = usePathname();

  useEffect(() => {
    let ctx: GsapContext | undefined;
    let intervalId: number | undefined;
    let timeoutId: number | undefined;

    const bind = () => {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      if (!gsap || !ScrollTrigger) return false;

      registerPluginOnce(gsap, ScrollTrigger);
      ctx = gsap.context(() => {
        bindPageAnimations(gsap);
      });
      return true;
    };

    if (!bind()) {
      intervalId = window.setInterval(() => {
        if (bind() && intervalId !== undefined) window.clearInterval(intervalId);
      }, 100);
      timeoutId = window.setTimeout(() => {
        if (intervalId !== undefined) window.clearInterval(intervalId);
      }, 5000);
    }

    return () => {
      if (intervalId !== undefined) window.clearInterval(intervalId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
