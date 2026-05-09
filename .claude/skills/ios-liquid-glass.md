---
name: ios-liquid-glass
description: Modify iOS 26 Safari Liquid Glass status bar / URL bar behavior on this portfolio. Use when touching .nav, safe-area-inset zones, .ios-status-shield, modal overlays (.nav-mobile-overlay, ContactModal), .grain texture, viewport meta, or anything affecting how iOS renders system chrome over scrolled page content.
---

# iOS 26 Liquid Glass Status Bar — Project Conventions

## Mental model (60 seconds)

iOS 26 Safari renders the system status bar and the floating bottom URL bar as **Liquid Glass** — translucent + lightly blurred — and **samples page content** to derive their tint. Safari 26 **ignores `<meta name="theme-color">`** for this purpose.

Two distinct sampling phases at the **top** edge:

- **At scroll = 0**: Safari samples `position: fixed` / `position: sticky` elements at the viewport top (≈4px deep, ≥80% wide, ≥3px tall).
- **During scroll**: Safari re-samples a composite that includes the **document's actual top-edge content**. A solid fixed navbar alone is NOT enough — dark/contrasty page content scrolling under the top zone can bleed through.

The **bottom** URL bar samples the area **above** its own floating position — i.e., the bottom of the page's scrollable content, NOT the safe-area-inset-bottom zone where the home indicator sits. So a fixed strip at the very bottom of the viewport doesn't actually control the URL bar's tint; whatever page content (or fixed full-viewport overlay) is just above the URL bar's floating position is what gets sampled.

You cannot disable Liquid Glass from web. The design strategy is asymmetric:

- **Top zone**: cover with a fixed cream/theme shield so iOS samples a known surface. We DO control this.
- **Bottom zone**: leave uncovered. Let iOS sample whatever page content (or modal overlay) is naturally there. We DON'T try to control it — attempts to do so were either ineffective or introduced visual bugs (see "What previously failed").

**Critical caveat — the cache**. iOS 26 Liquid Glass caches the sampled tint and only re-evaluates on **user-initiated scroll** or **full page reload**. Programmatic scroll (`window.scrollTo`, any `behavior:`), display-toggle twitches, CSS variable mutations, theme-color meta updates, synthetic events — none of these reliably trigger re-sampling. This is a confirmed iOS 26.x platform limitation, independently reported by Pavel Larionov, Ben Frain, and Jahir Fiquitiva. **Do not attempt to nudge Liquid Glass programmatically** — two attempts in this codebase (commits `f13eca5` scroll twitch, `cff4842` display-toggle twitch) have failed on real-device testing. Accepted limitations:

- Theme toggle (light↔dark) does NOT update the iOS status bar tint mid-session — only on next user scroll or reload.
- Modal open/close does NOT update the iOS bottom URL bar tint mid-session — only on next user scroll or reload.

## Map of this codebase

| Element | File | Role |
|---|---|---|
| `.nav` | `src/app/globals.css` (≈ L601) | Fixed `top:0 z=50`. Background built via a **four-layer cascade** (see "Browser appearance matrix" below) so iOS = solid, Android Chrome + mobile = solid, desktop Chrome/Firefox = transparent, desktop Safari macOS = transparent + blur. Padding-top extends bg through `env(safe-area-inset-top)`. |
| `.ios-status-shield` | `globals.css` (≈ L89) + `src/app/layout.tsx` body | Fixed `top:0 z=102` solid `var(--paper)` strip. `height: env(safe-area-inset-top, 0px)` — naturally 0 on desktop / Android / iOS landscape / non-notch (no visible cream stripe), and the actual inset (~44–50px) on iOS notched portrait where Liquid Glass is active. Above `.grain::before` (z=100). `pointer-events: none`. Background follows `--paper` so the visible strip on iOS flips with the theme; the iOS system status bar tint itself lags until next user scroll (Liquid Glass cache). Never hidden by modals — the cream/theme strip at the top is a deliberate design constant. |
| (no bottom shield) | — | Intentionally absent. The iOS floating URL bar samples the bottom of the page's scroll content, NOT the safe-area-bottom zone, so a bottom shield wouldn't control its tint anyway. Leaving the bottom edge uncovered also lets modal overlays (fixed inset:0) naturally tint the URL bar dark when they're open. |
| `.grain::before` | `globals.css` (≈ L347) | Body texture at z=100, `mix-blend-mode: multiply`. Mask fades out at **both** safe-area zones via a 5-stop `linear-gradient` (the bottom fade is still useful as a clean visual fade, even though there's no longer a bottom shield to coordinate with). |
| `.nav-mobile-overlay` | `globals.css` (≈ L844) | Mobile menu overlay, `position: fixed; inset: 0; z=90`, dark rgba + backdrop-filter. Becomes the bottom-edge sample target for iOS when open. |
| `ContactModal` overlay | `src/components/landing/ContactModal.tsx` (inline style) | Contact lightbox + CV preview overlay, `position: fixed; inset: 0; z=100`, dark rgba + backdrop-filter. Same role as `.nav-mobile-overlay` for the bottom URL bar sample. |
| `data-menu-open` / `data-contact-open` | `Nav.tsx` `[menuOpen, isMobileNav]` useEffect, `ContactModal.tsx` open useEffect | Set on `<html>` while their respective modals are open. Currently no CSS rules consume these attributes — they're kept as cheap state-tracking primitives for any future modal-driven styling. |
| `viewport` export | `src/app/layout.tsx` (≈ L82) | `viewportFit: "cover"` (required for `env(safe-area-inset-*)`); `themeColor` light/dark (kept for older iOS, Android Chrome, PWAs — Safari 26 ignores). |
| Color tokens | `globals.css` (≈ L11–29) | `--paper` = sampled status bar color. `--ink` = the dark high-contrast color used by `.btn` etc. — anything with `--ink` background near the top of the scroll zone will bleed through Liquid Glass during scroll. |

## Browser appearance matrix and cascade

The `.nav` background has to differ across surfaces — solid on mobile (Liquid Glass safety) and on desktop Chrome/Firefox the user wants transparent-without-blur, but desktop Safari macOS keeps the frosted glass. The current implementation uses **four cascade layers** in this exact order:

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

**Why the Safari detector works**: `hanging-punctuation` is implemented only in WebKit/Safari as of 2026, and `-apple-system-body` is an Apple-only system-font shorthand. Combining them resists future Chrome/Firefox implementing one or the other.

## Do's

- ✅ Keep `.nav` Layer 1 as solid `var(--paper)`. Per-surface visual differences come from Layers 2–4 — never inline a different default.
- ✅ Keep `.ios-status-shield` visible on iOS/iPadOS by sizing it directly with `height: env(safe-area-inset-top, 0px)`. `pointer-events: none` so the iOS "tap status bar to scroll to top" gesture still works. The shield naturally collapses to height 0 on desktop, Android, and any device without a top safe-area inset — no visible cream stripe where there's no Liquid Glass to feed. Avoid `@supports (-webkit-touch-callout: none)` for sizing the shield: it has a known iOS 26.1+ regression that can make the shield collapse on iOS too (see Apple Developer Forums thread 808606). Plain `env()` is universally supported and produces the right value per surface.
- ✅ Keep the shield ABOVE `.grain::before` (z=102 > z=100) so the multiply-blend grain can't darken the sample surface.
- ✅ Keep `viewportFit: "cover"` in the viewport export.
- ✅ When adding any new full-viewport overlay (`position: fixed; inset: 0`), mask its blend modes away from both safe-area zones — copy the 5-stop pattern from `.grain::before`.
- ✅ Use `display: none` to remove an element from Liquid Glass sampling. `opacity: 0` and `pointer-events: none` do **not** exclude an element from sampling.
- ✅ Change colors via `--paper` / `--ink` in `:root` and `[data-mode="dark"]` only — themes propagate. Accept that the iOS status bar tint won't update mid-session on theme toggle (it updates on next user scroll).
- ✅ For modal overlays, use `position: fixed; inset: 0` so they reach the bottom edge — that's how the iOS URL bar gets the dark tint when a modal is open.

## Don'ts

- ❌ Don't make `.nav` semi-transparent by default (e.g., `color-mix(... 60%, transparent)` at the top level). Page content will bleed through during scroll.
- ❌ Don't reorder the four cascade layers. Layer 3 (iOS safety net) MUST come after Layer 2 (desktop @media) so it overrides the transparent bg on iPad-with-keyboard.
- ❌ Don't add a `backdrop-filter` to `.nav` on iOS — Liquid Glass then samples a blurred composite of content behind the nav.
- ❌ Don't put a dark high-contrast element (e.g., `.btn` with `var(--ink)` background) directly below the navbar with no scroll buffer. When the user scrolls and that element reaches the top zone, Liquid Glass picks it up and tints the status bar with it. Either use `.btn.ghost` (transparent + dark border) for in-page CTAs near the top, or push them below ~100px of cream content. **This was the round-2 symptom that motivated `.ios-status-shield`.**
- ❌ Don't reintroduce a `.ios-toolbar-fill-bottom` shield (or any fixed strip in the safe-area-inset-bottom zone) without first revisiting whether you actually need to control URL-bar tint. The answer is usually no — the URL bar samples the area above its floating position, not the safe-area zone, so a bottom shield wouldn't even affect its tint. Removing the bottom shield (this is what we did) lets modal overlays naturally tint the URL bar dark when open. **This was the round-3 simplification.**
- ❌ Don't `display: none` the top shield to "let an overlay through." The shield is unconditional cream/theme — that's the deliberate design. If you need an overlay to visually extend through the top safe area, redesign the overlay (e.g., side panel that doesn't try to span the top), don't kill the shield.
- ❌ Don't add a `backdrop-filter` or `mix-blend-mode` to elements that overlap the shield's z-zone — they'd composite into the sample.
- ❌ Don't put a second fixed element at `top: 0` with a different color — competing sampling targets create unpredictable tint.
- ❌ Don't trust `<meta name="theme-color">` to drive Safari 26's status bar color. Keep the existing media-query variants in the viewport export only for older iOS / Android Chrome / PWA fallbacks.
- ❌ Don't apply `background-clip: content-box` to `.nav` — its background MUST extend through `padding-top: max(18px, env(safe-area-inset-top))` so the safe-area zone is covered.
- ❌ Don't bump the shield z-index above modals (z=100 is your modal/lightbox baseline) without re-thinking the stack. The shield IS at z=102, above modals — that's intentional now (top shield is unconditional). If you ever need a modal to cover the shield, redesign the modal to not span the top safe area.
- ❌ **Don't try to programmatically invalidate the Liquid Glass tint cache.** Two prior attempts (1px scroll twitch in `f13eca5`, display-toggle twitch in `cff4842`) failed on real-device testing on iOS 26.x. Multiple dev reports (Pavel Larionov, Ben Frain, Jahir Fiquitiva) confirm there's no JS technique that works. The accepted limitations are: (a) theme toggle's iOS tint update lags until next user scroll, (b) modal-open URL bar tint update lags until next user scroll. Document these limitations; don't try to fix them.
- ❌ Don't re-add the `:is([data-menu-open], [data-contact-open]) .ios-status-shield { display: none }` rule from commit `5943ed8`. It was an intermediate step — the new pragmatic design (commit after this skill) keeps the top shield unconditional and removes the bottom shield instead.

## Modify checklist (when changing this area)

1. Open `src/app/globals.css` and locate the three pieces: `.nav` (cascade), `.ios-status-shield`, `.grain::before` mask.
2. Open `src/app/layout.tsx` — confirm the `viewport` export and the single shield div (top only, no bottom).
3. If colors are changing: edit `--paper` / `--ink` in `:root` and `[data-mode="dark"]` only.
4. If adding or removing a fixed element near `top: 0`: keep exactly **one** solid sampling target at the top edge (the shield) — don't stack competing ones with different colors.
5. If adding a new full-viewport overlay: ensure it uses `position: fixed; inset: 0` (so it covers the bottom edge for iOS URL bar sampling), and consider whether its open-state needs a CSS hook on `<html>` — the existing `data-menu-open` / `data-contact-open` pattern is the precedent.
6. If adding a new fullscreen overlay with blend modes (`mix-blend-mode`, `backdrop-filter`): mask it away from both safe-area zones using the `.grain::before` pattern.

## State-driven appearance and accepted iOS limitations

iOS 26 Liquid Glass caches its tint sample and only re-evaluates on user-initiated scroll or full reload. There is **no working JS technique** to invalidate this cache. The codebase's accepted limitations:

- **Theme toggle** (light↔dark via `applyMode()` in `Nav.tsx`): updates `data-mode` and re-cascades all `var(--paper)` / `var(--ink)` backgrounds correctly. The iOS status bar tint, however, lags — it stays at the previous theme's color until the user scrolls. This is documented in the inline comment in `applyMode()`.

- **Modal open/close** (`menuOpen` useEffect in `Nav.tsx`, `open` useEffect in `ContactModal.tsx`): toggles `data-menu-open` / `data-contact-open` on `<html>`. The iOS bottom URL bar tint will lag — it stays at the previous sample (page content) until the user scrolls. In practice, most users scroll inside the open modal panel within a second or two, which triggers the re-sample, so the lag is usually invisible.

- **`data-menu-open` / `data-contact-open` attributes**: kept as state-tracking primitives even though no CSS rule currently consumes them. Cheap to maintain; useful CSS hooks if a future feature needs modal-state-driven styling.

**Don't** add nudges, twitches, or any JS that tries to force Liquid Glass to re-sample. Two attempts have failed; the iOS limitation is genuinely a platform constraint, not a problem we haven't worked hard enough to solve.

## Verification (after each change)

1. **Real iPhone with notch / Dynamic Island on iOS 26.x.** Simulators do NOT render Liquid Glass identically. Connect via USB and use Mac Safari → Develop → [iPhone] → [tab] for the inspector — that's the real iPhone Safari, not Mac Safari with iPhone UA spoofing.
2. **No-modal scroll**: scroll past the H1 hero title. Status bar zone should stay a clean cream/theme tint — no recognizable page content (text, buttons) showing through.
3. **Theme toggle**: tap the sun/moon. The CSS updates immediately (DevTools shows `data-mode="dark"` and `--paper: #161310`), but the iOS status bar tint lags until next scroll. Scroll the page — tint flips to the new theme. **This lag is expected**; document, don't fix.
4. **Mobile menu open**: tap the hamburger. Top safe-area zone stays cream/theme (intentional — top shield is unconditional). Bottom URL bar zone: should eventually tint dark to match the modal overlay; the first frame may still show the previous sample. Scroll inside the menu panel to confirm the dark tint kicks in. Close — bottom should revert to page-content tint at next scroll.
5. **Contact modal open** (via "Get in touch" CTA, both desktop and mobile): same expectations as the mobile menu — top stays cream/theme, bottom eventually tints dark.
6. **Rotate landscape**: `env(safe-area-inset-top)` becomes 0; the `max(4px, ...)` floor keeps the shield sample-eligible.
7. **Tap the iOS status bar to scroll-to-top**. Should still work — the shield has `pointer-events: none` so the tap passes through.
8. **Open desktop Safari / Chrome / Firefox**: frosted nav (Safari macOS) or transparent nav (Chrome/Firefox) per the four-layer cascade. **No cream stripe at the very top** — the shield's height is `env(safe-area-inset-top, 0px)`, which naturally resolves to 0 on desktop where there's no safe-area inset. There is also no matching stripe at the bottom (deliberate — no bottom shield).

## What previously failed (don't repeat)

- **Commit `bc68877`** — `.ios-statusbar-fill` solid block at z=101; `.nav` semi-transparent default with **positive** `@supports (-webkit-touch-callout: none)` override making it solid on iOS. Worked at scroll = 0. **Failed during scroll** because the positive `@supports` form is fragile on iOS 26.1+.
- **Commit `c4d4fa0`** — inverted to solid-by-default `.nav`; removed `.ios-statusbar-fill` reasoning the nav already covered the safe area. Worked at scroll = 0. **Failed during scroll** because (a) the grain at z=100 with `mix-blend-mode: multiply` was darkening the navbar's cream in the sampling zone, and (b) when scrolled, the in-page dark `.btn` `Get in touch` reached the top zone and Liquid Glass sampled it directly.
- **Commit `d8e39fa`** — re-added shield at z=102 (above grain) AND masked grain at the top safe area. **Working state for iOS Liquid Glass scroll regression.**
- **Commit `70645c3`** — `.nav` background now uses the four-layer cascade so Android Chrome and desktop Chrome/Firefox stop sharing the frosted treatment with desktop Safari macOS.
- **Commit `f13eca5`** — added `nudgeIosLiquidGlass()` 1px scroll twitch wired into `applyMode` and the menuOpen useEffect, plus `[data-menu-open]` recolor rules to dark rgba on both shields. **Failed on real-device testing**: programmatic `window.scrollTo` does not trigger Liquid Glass re-sampling on iOS 26.x, regardless of `behavior`. Compounded by `body { overflow: hidden }` being set just before the menu-open nudge fired, making the nudge a no-op there for an additional reason.
- **Commit `cff4842`** — replaced the scroll twitch with a `display: none` toggle on the top shield (briefly hide, force reflow, restore on next animation frame). Reasoning: `display: none` is documented to remove a fixed element from Liquid Glass sampling, so toggling it should force re-sample. **Also failed on real-device testing**. Pavel Larionov's article: *"Once Safari decides what color to tint, that's it. Any changes you make afterward — toggling background-colors, mutating elements with JS — none of it updates the toolbar tint."*
- **Commit `5943ed8`** — z-stacking fix: hide BOTH shields entirely while a modal is open via `:is([data-menu-open], [data-contact-open]) .ios-status-shield, .ios-toolbar-fill-bottom { display: none }`. This fixed a related desktop visual bug (the cream stripes were sitting above the modal overlay and breaking its edge-to-edge backdrop), but didn't fix the iOS tint update problem (which is genuinely unsolvable from JS). **Superseded by the next commit** which inverted the design: top shield now unconditional, bottom shield removed entirely.
- **Commit `93c887d`** — pragmatic v3: top shield always cream/theme (unconditional, never hidden by modals), bottom shield deleted entirely (the iOS URL bar samples the bottom of page content, not the safe-area zone, so a bottom shield wasn't even controlling its tint). Modal overlays naturally tint the bottom URL bar dark when open because their `position: fixed; inset: 0` layer becomes the bottom-edge sample target. iOS theme-toggle and modal-open tint lag remain accepted limitations; documented in code comments and this skill.
- **Commit `eb4062a`** — desktop-stripe cleanup: shield's height defaulted to 0 with the iOS height moved inside `@supports (-webkit-touch-callout: none)` so desktop and Android browsers wouldn't show the 6px cream stripe at the top of the viewport. **Regression**: that `@supports` query has a known iOS 26.1+ bug (Apple Developer Forums thread 808606), and on at least some recent iOS WebKit versions it doesn't match — meaning the shield collapsed to height 0 on iOS too, and the theme-driven cream/dark strip went invisible. User noticed: *"I remember we managed to make such that the bg area of the status bar changes color based on the theme, now it doesn't work anymore"*. Superseded by the next commit.
- **Current commit** — uses `height: env(safe-area-inset-top, 0px)` directly to size the shield. Desktop and Android browsers have a 0 inset → height 0 → no stripe (preserves the desktop fix). iOS notched portrait has a real inset (~44–50px) → shield visible and theme-driven (preserves the theme-color signature). No `@supports` brittleness; behavior is purely driven by whether the surface has a top safe-area inset. Loses the iOS-landscape / non-notch 4px floor that was previously documented as sample-eligibility insurance — accepted trade-off, those modes are edge cases and the iOS Liquid Glass cache already lags theme/modal updates regardless.

**Three conditions must all hold on iOS 26.x for the top status bar tint:**

1. A fixed sampling target near `top: 0` with solid `var(--paper)` background. (`.ios-status-shield`.)
2. Nothing above it (overlays, blend modes) darkens it in the safe-area zone.
3. Page content scrolling under the top zone doesn't have dark, high-contrast elements within ~100px of the navbar bottom edge — or those elements use a low-contrast variant (e.g., `.btn.ghost`).

**For the bottom URL bar**, no conditions to enforce — let iOS sample whatever's naturally there (page content, or modal overlay when one is open).

## Sources (re-research only if Apple changes behavior)

- [Pavel Larionov — Safari 26 Liquid Glass: fixing toolbar tinting for web developers](https://www.1ar.io/updates/safari-26-liquid-glass-web/) — confirms programmatic scroll, CSS variable mutations, and JS-driven element changes do NOT trigger Liquid Glass re-sampling
- [Ben Nasedkin — Why iOS 26 Safari Toolbar Colors Work Differently](https://nasedk.in/blog/ios26-safari-toolbar-colors/) — `opacity: 0` does not exclude from sampling; `display: none` does
- [Jahir Fiquitiva — How to correctly tint Safari's toolbar in iOS 26](https://jahir.dev/blog/safari-toolbar) (sampling region dimensions: 4px top, ≥80% wide, ≥3px tall)
- [Ben Frain — iOS 26 theme-color + fixed elements quirks](https://benfrain.com/ios26-safari-theme-color-tab-tinting-with-fixed-position-elements/) — confirms theme-color meta is ignored by Safari 26
- [WebKit Bug #297779](https://bugs.webkit.org/show_bug.cgi?id=297779) — fixed-element positioning bug in iOS 26.0/26.1, fixed in 26.1+
- [Apple Developer Forums — `-webkit-touch-callout: none` regression on iOS 26.1](https://developer.apple.com/forums/thread/808606)
- [Wojtek Kutyła — Targeting Safari with a CSS @supports media query](https://wojtek.im/journal/targeting-safari-with-css-media-query) — the `hanging-punctuation` + `-apple-system-body` Safari-only detector used in Layer 4
- [Smashing Magazine — Guide To Hover And Pointer Media Queries](https://www.smashingmagazine.com/2022/03/guide-hover-pointer-media-queries/) — Layer 2's `@media (hover: hover) and (pointer: fine)` semantics
