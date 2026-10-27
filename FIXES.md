# What I would fix

Source: `cimicimi-mobile/cimicimi` (RN/Expo + NativeWind). This demo is a **faithful port**, so every
item below is still present here and visible on screen, except those marked FIXED or RN only. Section numbers refer to the demo pages (1 = Raw constants, 2 = `usePalette()`, 3 = Direct Tailwind).

## Bugs

1. **FIXED in this demo.** **Token typo: `'light-dark-tertiary'`** (`tailwind.config.js`). Should be `'dark-text-tertiary'`.
   `usePaletteClass().text.tertiary` emits `dark:text-dark-text-tertiary`, which does not exist, so
   in dark mode tertiary text falls back to the light value (`#cacaca` instead of `#434347`).
   Demo: section 3c. (Renamed in this demo's `tailwind.config.js`;
   the original RN repo still has the typo.)
2. **FIXED in this demo.** **Safelist misses tokens.** The `light|dark` safelist pattern omits `text-tertiary` and
   `background-soft`. It only works because those strings also appear in scanned source. Add them or
   drop the safelist. (Added to the safelist pattern in this demo's `tailwind.config.js` and `src/style.css`;
   the original RN repo is unchanged.)
3. **FIXED in this demo.** **`dark:text-primary`, `dark:text-black`, `dark:text-white` etc. in `usePaletteClass`** are no-ops
   (same as the base class). Harmless, but noise. (Removed from this demo's `usePaletteClass`;
   the original RN repo is unchanged.)
4. **RN only, not in this demo.** **`global.css` has `@tailwind base/components/utilities` twice** (top and bottom).
   The demo's `src/style.css` uses a single Tailwind 4 `@import 'tailwindcss'`, so there is nothing to fix here.
5. **FIXED in this demo.** **`usePaletteClass` memoizes static strings** on `scheme`. The memo does nothing.
   (In this demo the hook was first replaced by a static constant, then removed entirely in item 10;
   the original RN repo is unchanged.)

## Architecture

6. **FIXED in this demo.** **The palette is declared three times** (`Colors.ts`, `usePalette`, `tailwind.config.js`) with no
   sync check. Derive Tailwind colors and the `usePalette` object from `Colors` programmatically.
   (In this demo the `light-*`/`dark-*` Tailwind tokens are generated from `Colors.light`/`Colors.dark`,
   `usePalette` spreads `Colors`, and a type check in `usePalette.ts` fails if the light and dark keys
   differ. Still hand-listed: the safelist key lists. The original RN
   repo is unchanged.)
7. **FIXED in this demo.** **`primary` is split across two places.** The 50-950 ramp exists only in Tailwind; `Colors.ts` has
   `primary`, `primary200`, `primary300`. `primary` is duplicated as a literal `#FF3319`.
   Move the whole ramp into `Colors.ts`.
   (In this demo `Colors.ts` exports `PrimaryRamp`; `Colors.primary`/`primary200`/`primary300` and
   Tailwind's `primary` colors read from it. The original RN repo is unchanged.)
8. **FIXED in this demo.** **Status colors (`success/info/warning/error/hint`) have no Tailwind classes.**
   Class-based code cannot use them. Demo: section 3c.
   (In this demo every fixed `Colors` value other than the primary ramp gets a generated class:
   `bg-success`, `text-error`, `bg-message-sent-background`, etc. The original RN repo is unchanged.)
9. **FIXED in this demo.** **Theme is encoded in token names** (`light-text` + `dark:dark-text`). Every use needs a pair,
   which is why `usePaletteClass` exists. Use semantic tokens backed by CSS variables
   (`bg-background`, `text-foreground`) so the theme switches without `dark:` pairs, then
   `usePaletteClass` can go away.
   (In this demo Tailwind generates `bg-canvas`, `text-foreground-muted`, `border-border`, etc. backed by
   `--theme-*` variables, set from `Colors.light` on `:root` and `Colors.dark` on `.dark` by a plugin in
   `tailwind.config.js`. The demo's own layout uses them; section 3d shows them. The `light-*`/`dark-*` tokens are kept
   so section 3b can show the old style. The original RN repo is unchanged.)
10. **FIXED in this demo.** **Two competing consumption styles** for classes (`usePaletteClass` vs hand-written `dark:`; 44
    `dark:` uses in the RN app). Pick one.
    (In this demo the class lookup object is removed: after item 9 every entry was a class string that
    can be written directly, and themed colors collapse to one semantic class. Classes are written
    directly; `dark:` is for one-off deviations only. The original RN repo is unchanged.)
11. **FIXED in this demo.** **Hand-copied alpha literals** (`rgba(255,51,25,.14)`, `.30`, black scrims). Add
    `withAlpha(color, a)` and named overlay tokens.
    (Removed from this demo entirely, along with their section; nothing else used them. If translucent
    colors come back, use an opacity modifier like `bg-primary/15`. The original RN repo is unchanged.)
12. **FIXED in this demo.** **Dead shadcn/gluestack CSS variables in `global.css`.** Nothing in the RN app reads them (and
    their `--primary` is grey, unrelated to the brand). Delete, or make them the real semantic
    layer from item 9.
    (Deleted from this demo's `src/style.css`, along with their section; the semantic layer is the
    generated `--theme-*` variables from item 9. The original RN repo is unchanged.)
13. **FIXED in this demo.** **Inverted dark naming.** Dark `container` (`#000`) is darker than dark `background`
    (`#1e1c1e`); light is the opposite. Rename (`surface`/`sunken`) or document it.
    (The values are consistent: in both themes `container` is the page and `background` is one step
    lighter. Only the names mislead. In this demo the theme keys are renamed by role:
    `container` -> `canvas`, `background` -> `surface`, `backgroundSoft` -> `surfaceMuted`,
    `text` -> `foreground`, `textSecondary` -> `foregroundMuted`, `textTertiary` -> `foregroundSubtle`;
    `border` is unchanged. Earlier items keep the RN names. The original RN repo is unchanged.)
14. **FIXED in this demo.** **`fontFamily.sans: ['Nunito']` has no fallback stack.** On web this resolves to serif until the
    font loads.
    (In this demo `fontFamily.sans` is `['Satoshi', 'ui-sans-serif', 'system-ui', 'sans-serif']`, the
    demo's font, and the separate body override in `src/style.css` is gone. The original RN repo is
    unchanged; there, add the same kind of fallback stack after `'Nunito'`.)
15. **FIXED in this demo.** **`usePalette` re-lists every key by hand.** Build it from `Colors` so adding a color is one edit.
    (Done as part of item 6.)

## Suggested order

1 (bug) -> 6/7/15 (single source of truth) -> 8 -> 11 -> 9/10/12 (semantic tokens) -> 13/14.
