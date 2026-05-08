---
name: ios-liquid-glass
description: Modify iOS 26 Safari Liquid Glass status bar / navbar behavior on this portfolio. Use when touching .nav, safe-area-inset zones, .ios-status-shield, .ios-toolbar-fill-bottom, .grain texture, viewport meta, or anything affecting how iOS renders system chrome over scrolled page content.
---

# iOS 26 Liquid Glass Status Bar — Project Conventions

## Mental model (60 seconds)

iOS 26 Safari renders the system status bar as **Liquid Glass** — translucent + lightly blurred — and **samples page content** to derive its tint. Safari 26 **ignores `<meta name="theme-color">`** for this purpose.

There are two distinct sampling phases:

- **At scroll = 0**: Safari samples `position: fixed` / `position: sticky` elements at the viewport top (≈4px deep, ≥80% wide, ≥3px tall).
- **During scroll**: Safari re-samples a composite that includes the **document's actual top-edge content**. A solid fixed navbar alone is NOT enough — dark/contrasty page content scrolling under the top zone can bleed through.

You cannot disable Liquid Glass from web. The only strategy is to ensure whatever Safari samples is `var(--paper)` (cream in light, `#161310` in dark).

The same logic applies, mirrored, to Safari's bottom floating URL bar.

## Map of this codebase

| Element | File | Role |
|---|---|---|
| `.nav` | `src/app/globals.css` (≈ L601) | Fixed `top:0 z=50`. Background built via a **four-layer cascade** (see "Browser appearance matrix" below) so iOS = solid, Android Chrome + mobile = solid, desktop Chrome/Firefox = transparent, desktop Safari macOS = transparent + blur. Padding-top extends bg through `env(safe-area-inset-top)`. |
| `.ios-status-shield` | `globals.css` (≈ L84) + `src/app/layout.tsx` body | Fixed `top:0 z=102` solid `var(--paper)`. **Above** `.grain::before` (z=100). `height: max(4px, env(safe-area-inset-top, 0px) + 6px)`. `pointer-events: none`. |
| `.ios-toolbar-fill-bottom` | `globals.css` (≈ L72) + `layout.tsx` body | Bottom mirror of the shield (z=101) for Safari's floating URL bar. |
| `.grain::before` | `globals.css` (≈ L347) | Body texture at z=100, `mix-blend-mode: multiply`. Mask fades out at **both** safe-area zones via a 5-stop `linear-gradient`. |
| `viewport` export | `src/app/layout.tsx` (≈ L82) | `viewportFit: "cover"` (required for `env(safe-area-inset-*)`); `themeColor` light/dark (kept for older iOS, Android Chrome, PWAs — Safari 26 ignores). |
| Color tokens | `globals.css` (≈ L11–29) | `--paper` = sampled chrome color. `--ink` = the dark high-contrast color used by `.btn` etc. — anything with `--ink` background near the top of the scroll zone will bleed through Liquid Glass. |

## Browser appearance matrix and cascade

The `.nav` background has to differ across surfaces — solid on mobile (Liquid Glass safety) and on desktop Chrome/Firefox the user wants transparent-without-blur, but desktop Safari macOS keeps the frosted glass. The current implementation uses **four cascade layers** in this exact order, with `@supports`/`@media` conditions chosen so layers compose correctly:

| Layer | Selector | Effect |
|---|---|---|
| 1 — default | `.nav` | `background: var(--paper)` (solid) |
| 2 — desktop class | `@media (hover: hover) and (pointer: fine) { .nav }` | `background: color-mix(... 60%, transparent)` |
| 3 — iOS WebKit safety net | `@supports (-webkit-touch-callout: none) { .nav }` | re-asserts solid `var(--paper)` |
| 4 — Safari blur | `@supports (hanging-punctuation: first) and (font: -apple-system-body) { @media (hover: hover) and (pointer: fine) { .nav } }` | adds `backdrop-filter: blur(12px) saturate(140%)` |

**Order matters.** Layer 3 must appear AFTER Layer 2 because they have the same specificity — cascade order wins. If you re-order them, iPad-with-Magic-Keyboard goes transparent and Liquid Glass regresses.

**Surface trace:**

| Surface | L1 | L2 (hover/fine) | L3 (iOS) | L4 (Safari + hover/fine) | Result |
|---|---|---|---|---|---|
| iPhone Safari | solid | — | re-solid | — | solid |
| iPhone Chrome | solid | — | re-solid | — | solid |
| iPad Safari touch | solid | — | re-solid | — | solid |
| iPad Safari + Magic Keyboard | solid | transparent | **re-solid** | blur added (no-op on opaque) | solid |
| Android Chrome | solid | — | — | — | solid |
| Desktop Chrome | solid | transparent | — | — | transparent, no blur |
| Desktop Firefox | solid | transparent | — | — | transparent, no blur |
| Desktop Safari macOS | solid | transparent | — | blur added | **transparent + blur** |

**Why the Safari detector works**: `hanging-punctuation` is implemented only in WebKit/Safari as of 2026, and `-apple-system-body` is an Apple-only system-font shorthand. Combining them resists future Chrome/Firefox implementing one or the other. If both ever get adopted by Chrome, the worst case is desktop Chrome getting the blur back — a graceful regression, not a broken state.

## Do's

- ✅ Keep `.nav` Layer 1 as solid `var(--paper)`. Per-surface visual differences come from Layers 2–4 — never inline a different default.
- ✅ Keep both shields. `.ios-status-shield` (z=102) MUST be above `.grain::before` (z=100). `.ios-toolbar-fill-bottom` (z=101) is symmetric.
- ✅ Keep `viewportFit: "cover"` in the viewport export.
- ✅ When adding any new full-viewport overlay (`position: fixed; inset: 0`), mask it away from both safe-area zones — copy the 5-stop pattern from `.grain::before`.
- ✅ Use `display: none` to remove an element from Liquid Glass sampling. `opacity: 0` and `pointer-events: none` do **not** exclude an element from sampling.
- ✅ Change colors via `--paper` / `--ink` in `:root` and `[data-mode="dark"]` only — themes propagate.

## Don'ts

- ❌ Don't make `.nav` semi-transparent by default (e.g., `color-mix(... 60%, transparent)` at the top level). Page content will bleed through during scroll.
- ❌ Don't use `@supports not (-webkit-touch-callout: none)` as a coarse "is it not iOS" filter for visual styling that should distinguish desktop browsers from each other. It lumps Android Chrome, desktop Chrome, desktop Firefox, and desktop Safari into one bucket. Use `@media (hover: hover) and (pointer: fine)` for desktop-class detection, and the Safari detector `(hanging-punctuation: first) and (font: -apple-system-body)` for browser-specific enhancements.
- ❌ Don't reorder the four cascade layers. Layer 3 (iOS safety net, positive `@supports`) MUST come after Layer 2 (desktop @media) so it overrides the transparent bg on iPad-with-keyboard. They have the same specificity; cascade order is the only thing keeping iOS solid in that case.
- ❌ Don't add a `backdrop-filter` to `.nav` on iOS — Liquid Glass then samples a blurred composite of content behind the nav.
- ❌ Don't put a dark high-contrast element (e.g., `.btn` with `var(--ink)` background) directly below the navbar with no scroll buffer. When the user scrolls and that element reaches the top zone, Liquid Glass picks it up and tints the status bar with it. Either use `.btn.ghost` (transparent + dark border) for in-page CTAs near the top, or push them below ~100px of cream content. **This was the round-2 symptom that motivated `.ios-status-shield`.**
- ❌ Don't add a second fixed element at `top: 0` with a different color — competing sampling targets create unpredictable tint.
- ❌ Don't trust `<meta name="theme-color">` to drive Safari 26's status bar color. Keep the existing media-query variants in the viewport export only for older iOS / Android Chrome / PWA fallbacks.
- ❌ Don't apply `background-clip: content-box` to `.nav` — its background MUST extend through `padding-top: max(18px, env(safe-area-inset-top))` so the safe-area zone is covered.
- ❌ Don't bump the shield z-index above modals (z=100 is your modal/lightbox baseline) without re-thinking the stack. If a modal needs to cover the shield, give the modal an explicitly higher z-index.
- ❌ Don't change `var(--paper)`, shield-driving colors, or attribute-gated visual state (e.g., `data-menu-open`) and assume iOS UI will follow. Liquid Glass caches the tint and only re-evaluates on scroll/composite. Call `nudgeIosLiquidGlass()` (defined in `Nav.tsx`) after the change. See "State-driven appearance and re-sampling" below.
- ❌ Don't `display: none` the shields when the modal opens to "let the overlay through" — the modal overlay is 85%-opaque, page content can leak through it during sampling. Recolor the shields to match the overlay instead (the `[data-menu-open]` rule already does this); they stay sample-eligible with a deterministic dark color.

## Modify checklist (when changing this area)

1. Open `src/app/globals.css` and locate the four pieces: `.nav`, `.ios-status-shield`, `.ios-toolbar-fill-bottom`, `.grain::before`.
2. Open `src/app/layout.tsx` — confirm the `viewport` export and the two shield divs.
3. If colors are changing: edit `--paper` / `--ink` in `:root` and `[data-mode="dark"]` only.
4. If adding or removing a fixed element near `top: 0` or `bottom: 0`: keep exactly **one** solid sampling target per edge — don't stack competing ones with different colors.
5. If adding a new fullscreen overlay (`position: fixed; inset: 0`, especially with blend modes): mask it away from both safe-area zones using the `.grain::before` pattern.

## State-driven appearance and re-sampling

iOS 26 Liquid Glass caches its tint sample. CSS variable changes (theme toggle) and shield-color changes (modal-open recolor) **don't propagate to the iOS system chrome** until a scroll or composite event invalidates the cache. The codebase has a `nudgeIosLiquidGlass()` helper in `Nav.tsx` that does a 1px scroll twitch with `behavior: "instant"` reverted on the next animation frame — below human perception, but a measurable ping to Safari's compositor.

**Call it after any state change that should be reflected in the iOS UI tint:**

- **Theme toggle (light ↔ dark)** — `applyMode()` calls it after setting `data-mode`. Both desktop and mobile-panel `<ModeToggle>` instances funnel through this.
- **Mobile menu open/close** — the `[menuOpen, isMobileNav]` `useEffect` in `Nav.tsx` calls it in both the open path and the cleanup path.

**Modal-open shield recolor pattern.** The `data-menu-open` attribute on `<html>` is set by the same useEffect. CSS rule `[data-menu-open] .ios-status-shield, [data-menu-open] .ios-toolbar-fill-bottom { background: rgba(10,10,10,0.85); backdrop-filter: blur(6px); }` flips the safe-area shields to match the `.nav-mobile-overlay` color, so Liquid Glass samples a continuous dark surface across the full viewport instead of cream strips at the safe-area edges.

**Don't** add the nudge to high-frequency events (scroll handlers, resize listeners, every render). It's a state-transition primitive, not a continuous one.

**Don't** hardcode the overlay color in two places without a CSS variable — the `[data-menu-open]` rule's `rgba(10, 10, 10, 0.85)` must match `.nav-mobile-overlay`'s background. If you ever change one, change both, or extract to `--overlay-bg`.

## Verification (after each change)

1. **Real iPhone with notch / Dynamic Island on iOS 26.x.** Simulators do NOT render Liquid Glass identically.
2. Scroll past the H1 hero title. Status bar zone should stay a clean cream tint — no recognizable page content (text, buttons) showing through.
3. Toggle light ↔ dark mid-page. iOS UI tint should flip within ~100ms; if it doesn't, `nudgeIosLiquidGlass()` isn't being called or the scroll twitch is being suppressed.
4. Open the mobile menu (hamburger). Top safe area + bottom URL bar zone should both go dark (matching the overlay), no cream strips. Close — both revert to cream/dark theme.
5. Rotate landscape. `env(safe-area-inset-top)` becomes 0; the `max(4px, ...)` floor keeps the shield sample-eligible.
6. Tap the iOS status bar to scroll-to-top. Should still work — the shield has `pointer-events: none` so the tap passes through.
7. Open desktop Safari / Chrome. Frosted nav (Safari macOS) or transparent nav (Chrome/Firefox) should appear per the four-layer cascade; shields collapse to a few px and are invisible.

## What previously failed (don't repeat)

- **Commit `bc68877`** — `.ios-statusbar-fill` solid block at z=101; `.nav` semi-transparent default with **positive** `@supports (-webkit-touch-callout: none)` override making it solid on iOS. Worked at scroll = 0. **Failed during scroll** because the positive `@supports` form is fragile on iOS 26.1+ (some iOS WebKit features regressed in 26.1).
- **Commit `c4d4fa0`** — inverted to solid-by-default `.nav`; removed `.ios-statusbar-fill` reasoning the nav already covered the safe area. Worked at scroll = 0. **Failed during scroll** because (a) the grain at z=100 with `mix-blend-mode: multiply` was darkening the navbar's cream in the sampling zone, and (b) when scrolled, the in-page dark `.btn` `Get in touch` reached the top zone and Liquid Glass sampled it directly.
- **Commit `d8e39fa`** — re-added shield at z=102 (above grain) AND masked grain at the top safe area. **Working state for iOS Liquid Glass.**
- **Commit `70645c3`** — `.nav` background now uses the four-layer cascade described above so Android Chrome and desktop Chrome/Firefox stop sharing the frosted treatment with desktop Safari macOS. Doesn't regress the Liquid Glass fix: Layer 1 default is solid for iOS, Layer 3 (`@supports (-webkit-touch-callout: none)`) re-asserts solid for iOS WebKit, so iOS Safari and iPadOS Safari (any input mode) always end up at solid `var(--paper)`.
- **Subsequent commit (this one)** — added `nudgeIosLiquidGlass()` (1px scroll twitch) wired into `applyMode` and the menuOpen useEffect, plus `[data-menu-open]` recolor rules for both shields. Two issues fixed: (1) iOS UI tint now flips immediately on theme toggle without manual scroll/refresh; (2) opening the mobile menu makes the safe-area strips go dark to match the overlay, so the dark backdrop visually extends edge-to-edge. Doesn't regress earlier fixes — shields are still sample-eligible (just with a different color when modal is open) and revert to cream when modal closes.

**Three conditions must all hold on iOS 26.x:**

1. A fixed sampling target near `top: 0` with solid `var(--paper)` background.
2. Nothing above it (overlays, blend modes) darkens it in the safe-area zone.
3. Page content scrolling under the top zone doesn't have dark, high-contrast elements within ~100px of the navbar bottom edge — or those elements use a low-contrast variant (e.g., `.btn.ghost`).

## Sources (re-research only if Apple changes behavior)

- [Pavel Larionov — Safari 26 Liquid Glass: fixing toolbar tinting for web developers](https://www.1ar.io/updates/safari-26-liquid-glass-web/)
- [Ben Nasedkin — Why iOS 26 Safari Toolbar Colors Work Differently](https://nasedk.in/blog/ios26-safari-toolbar-colors/)
- [Jahir Fiquitiva — How to correctly tint Safari's toolbar in iOS 26](https://jahir.dev/blog/safari-toolbar) (sampling region dimensions: 4px top, ≥80% wide, ≥3px tall)
- [Ben Frain — iOS 26 theme-color + fixed elements quirks](https://benfrain.com/ios26-safari-theme-color-tab-tinting-with-fixed-position-elements/)
- [MacRumors — iOS 26.4 Bug Fixes thread](https://forums.macrumors.com/threads/ios-26-4-bug-fixes-changes-and-improvements.2479846/)
- [Apple Developer Forums — `-webkit-touch-callout: none` regression on iOS 26.1](https://developer.apple.com/forums/thread/808606)
- [Wojtek Kutyła — Targeting Safari with a CSS @supports media query](https://wojtek.im/journal/targeting-safari-with-css-media-query) — the `hanging-punctuation` + `-apple-system-body` Safari-only detector used in Layer 4
- [Smashing Magazine — Guide To Hover And Pointer Media Queries](https://www.smashingmagazine.com/2022/03/guide-hover-pointer-media-queries/) — Layer 2's `@media (hover: hover) and (pointer: fine)` semantics
