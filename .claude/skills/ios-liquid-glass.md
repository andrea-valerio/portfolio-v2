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
| `.nav` | `src/app/globals.css` (≈ L583) | Fixed `top:0 z=50`. Solid `var(--paper)` by default. Frosted look only on non-iOS via `@supports not (-webkit-touch-callout: none)`. Padding-top extends bg through `env(safe-area-inset-top)`. |
| `.ios-status-shield` | `globals.css` (≈ L84) + `src/app/layout.tsx` body | Fixed `top:0 z=102` solid `var(--paper)`. **Above** `.grain::before` (z=100). `height: max(4px, env(safe-area-inset-top, 0px) + 6px)`. `pointer-events: none`. |
| `.ios-toolbar-fill-bottom` | `globals.css` (≈ L72) + `layout.tsx` body | Bottom mirror of the shield (z=101) for Safari's floating URL bar. |
| `.grain::before` | `globals.css` (≈ L347) | Body texture at z=100, `mix-blend-mode: multiply`. Mask fades out at **both** safe-area zones via a 5-stop `linear-gradient`. |
| `viewport` export | `src/app/layout.tsx` (≈ L82) | `viewportFit: "cover"` (required for `env(safe-area-inset-*)`); `themeColor` light/dark (kept for older iOS, Android Chrome, PWAs — Safari 26 ignores). |
| Color tokens | `globals.css` (≈ L11–29) | `--paper` = sampled chrome color. `--ink` = the dark high-contrast color used by `.btn` etc. — anything with `--ink` background near the top of the scroll zone will bleed through Liquid Glass. |

## Do's

- ✅ Keep `.nav` solid `var(--paper)` by default. Frosted via `@supports not (-webkit-touch-callout: none)` only.
- ✅ Keep both shields. `.ios-status-shield` (z=102) MUST be above `.grain::before` (z=100). `.ios-toolbar-fill-bottom` (z=101) is symmetric.
- ✅ Keep `viewportFit: "cover"` in the viewport export.
- ✅ When adding any new full-viewport overlay (`position: fixed; inset: 0`), mask it away from both safe-area zones — copy the 5-stop pattern from `.grain::before`.
- ✅ Use `display: none` to remove an element from Liquid Glass sampling. `opacity: 0` and `pointer-events: none` do **not** exclude an element from sampling.
- ✅ Change colors via `--paper` / `--ink` in `:root` and `[data-mode="dark"]` only — themes propagate.

## Don'ts

- ❌ Don't make `.nav` semi-transparent by default (e.g., `color-mix(... 60%, transparent)` at the top level). Page content will bleed through during scroll.
- ❌ Don't rely on the **positive** form `@supports (-webkit-touch-callout: none)` for iOS detection — fragile on iOS 26.1+. Always invert: `@supports not (...)` so iOS Safari falls through to the safe default.
- ❌ Don't add a `backdrop-filter` to `.nav` on iOS — Liquid Glass then samples a blurred composite of content behind the nav.
- ❌ Don't put a dark high-contrast element (e.g., `.btn` with `var(--ink)` background) directly below the navbar with no scroll buffer. When the user scrolls and that element reaches the top zone, Liquid Glass picks it up and tints the status bar with it. Either use `.btn.ghost` (transparent + dark border) for in-page CTAs near the top, or push them below ~100px of cream content. **This was the round-2 symptom that motivated `.ios-status-shield`.**
- ❌ Don't add a second fixed element at `top: 0` with a different color — competing sampling targets create unpredictable tint.
- ❌ Don't trust `<meta name="theme-color">` to drive Safari 26's status bar color. Keep the existing media-query variants in the viewport export only for older iOS / Android Chrome / PWA fallbacks.
- ❌ Don't apply `background-clip: content-box` to `.nav` — its background MUST extend through `padding-top: max(18px, env(safe-area-inset-top))` so the safe-area zone is covered.
- ❌ Don't bump the shield z-index above modals (z=100 is your modal/lightbox baseline) without re-thinking the stack. If a modal needs to cover the shield, give the modal an explicitly higher z-index.

## Modify checklist (when changing this area)

1. Open `src/app/globals.css` and locate the four pieces: `.nav`, `.ios-status-shield`, `.ios-toolbar-fill-bottom`, `.grain::before`.
2. Open `src/app/layout.tsx` — confirm the `viewport` export and the two shield divs.
3. If colors are changing: edit `--paper` / `--ink` in `:root` and `[data-mode="dark"]` only.
4. If adding or removing a fixed element near `top: 0` or `bottom: 0`: keep exactly **one** solid sampling target per edge — don't stack competing ones with different colors.
5. If adding a new fullscreen overlay (`position: fixed; inset: 0`, especially with blend modes): mask it away from both safe-area zones using the `.grain::before` pattern.

## Verification (after each change)

1. **Real iPhone with notch / Dynamic Island on iOS 26.x.** Simulators do NOT render Liquid Glass identically.
2. Scroll past the H1 hero title. Status bar zone should stay a clean cream tint — no recognizable page content (text, buttons) showing through.
3. Toggle light ↔ dark mid-page. Shield, nav, and grain mask should all flip cleanly within one frame.
4. Rotate landscape. `env(safe-area-inset-top)` becomes 0; the `max(4px, ...)` floor keeps the shield sample-eligible.
5. Tap the iOS status bar to scroll-to-top. Should still work — the shield has `pointer-events: none` so the tap passes through.
6. Open desktop Safari / Chrome. Frosted nav should appear (the `@supports not (...)` block fires); shields collapse to a few px and are invisible.

## What previously failed (don't repeat)

- **Commit `bc68877`** — `.ios-statusbar-fill` solid block at z=101; `.nav` semi-transparent default with **positive** `@supports (-webkit-touch-callout: none)` override making it solid on iOS. Worked at scroll = 0. **Failed during scroll** because the positive `@supports` form is fragile on iOS 26.1+ (some iOS WebKit features regressed in 26.1).
- **Commit `c4d4fa0`** — inverted to solid-by-default `.nav`; removed `.ios-statusbar-fill` reasoning the nav already covered the safe area. Worked at scroll = 0. **Failed during scroll** because (a) the grain at z=100 with `mix-blend-mode: multiply` was darkening the navbar's cream in the sampling zone, and (b) when scrolled, the in-page dark `.btn` `Get in touch` reached the top zone and Liquid Glass sampled it directly.
- **Commit `d8e39fa`** (current) — re-added shield at z=102 (above grain) AND masked grain at the top safe area. **Working state.**

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
