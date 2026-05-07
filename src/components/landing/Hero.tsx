import Image from "next/image";
import { Sticker } from "@/components/primitives/Sticker";
import { ContactCTA } from "./ContactCTA";
import { HeroIntroExpandable } from "./HeroIntroExpandable";
import { PROFILE_PHOTO } from "@/lib/project-images";

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        paddingTop: 88,
      }}
    >
      <div
        className="caution-strip"
        style={{ height: 8, position: "absolute", top: 88, left: 0, right: 0 }}
      />

      <div
        className="hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 48,
          maxWidth: 1440,
          margin: "0 auto",
          alignItems: "stretch",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
          }}
        >
          <div
            className="chip-row-static"
            data-anim="chip-row"
            style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}
          >
            <Sticker variant="solid" data-anim-item>
              ★ PORTFOLIO &apos;26
            </Sticker>
          </div>

          <h1
            className="display-wide"
            style={{ fontSize: "clamp(48px, 6.5vw, 104px)", margin: 0, lineHeight: 0.92 }}
            data-anim="hero-title"
          >
            <span className="hero-line" style={{ display: "block" }}>
              ANDREA
            </span>
            <span className="hero-line" style={{ display: "block", color: "var(--accent)" }}>
              VALERIO
            </span>
            <span
              className="hero-line"
              style={{
                display: "block",
                WebkitTextStroke: "2px var(--ink)",
                WebkitTextFillColor: "transparent",
              }}
            >
              PORTFOLIO
            </span>
          </h1>

          <div className="hero-intro-cta-stack">
            <div
              className="hero-intro-block"
              data-anim="fade-up"
              data-delay="1.2"
              style={{ maxWidth: 540, display: "flex", gap: 20, alignItems: "flex-start" }}
            >
              <div
                style={{ flex: "0 0 auto", width: 4, alignSelf: "stretch", background: "var(--accent)" }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <HeroIntroExpandable>
                  Hi! I&apos;m a <strong className="hero-intro-strong">Product Designer</strong> with a background in{" "}
                  <a
                    href="https://corsi.unitn.it/en/human-computer-interaction"
                    className="hero-intro-hci-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={"Master's degree in Human–Computer Interaction — University of Trento"}
                  >
                    Human–Computer Interaction
                  </a>
                  . I treat design as a problem-solving discipline rooted in{" "}
                  <span className="hero-intro-mark">human behavior</span> — bridging UX/UI, product thinking, and HCI research
                  to build interfaces that fit how people actually think.{" "}
                  <span className="hero-intro-mark">AI is a core part of my workflow</span> — it widens what I can own,
                  sharpens efficiency, and grounds decisions in better evidence.
                </HeroIntroExpandable>
              </div>
            </div>

            <div className="hero-cta-slot">
              <ContactCTA />
            </div>
          </div>

          <div
            className="hero-scroll-hint"
            data-anim="fade-up"
            data-delay="1.6"
            style={{
              marginTop: "auto",
              paddingTop: 32,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 12,
              opacity: 0.7,
            }}
          >
            <div
              className="mono hero-scroll-hint-label"
              style={{ fontSize: 11, letterSpacing: "0.2em", textAlign: "right" }}
            >
              <div>SCROLL ↓</div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ position: "relative", alignSelf: "start", width: "100%" }}>
          <div data-anim="portrait" style={{ position: "relative", transform: "rotate(2deg)" }}>
            <div
              style={{
                position: "relative",
                aspectRatio: "3 / 4",
                width: "100%",
                border: "2px solid var(--ink)",
                boxShadow: "8px 8px 0 var(--ink)",
                background: "var(--paper-2)",
                overflow: "hidden",
              }}
            >
              <Image
                src={PROFILE_PHOTO}
                alt="Andrea Valerio — portrait"
                fill
                priority
                sizes="(max-width: 1100px) 40vw, 520px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              className="tape"
              style={{ top: -12, left: "20%", width: 100, height: 32, transform: "rotate(-6deg)" }}
            />
            <div
              className="tape"
              style={{ bottom: -10, right: "12%", width: 80, height: 28, transform: "rotate(8deg)" }}
            />
          </div>
          <div
            data-anim="sticker"
            data-delay="1.5"
            style={{ position: "absolute", top: 24, right: -28, transform: "rotate(8deg)", zIndex: 4 }}
          >
            <Sticker variant="solid">PRODUCT DESIGNER</Sticker>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: -55,
              right: -43,
              width: 156,
              height: 156,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 6,
            }}
          >
            <div data-anim="sticker-spin" style={{ width: 110, height: 110 }}>
              <svg width="110" height="110" viewBox="0 0 110 110" overflow="visible">
                <defs>
                  <path
                    id="circle-text"
                    d="M55,55 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
                  />
                </defs>
                <circle cx="55" cy="55" r="50" fill="var(--ink)" />
                <text
                  fill="var(--paper)"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    fontFamily: "var(--font-mono), monospace",
                    fontWeight: 700,
                  }}
                >
                  <textPath href="#circle-text">
                    UX/UI • Product • Data • HCI • &nbsp;
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
