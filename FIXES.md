# What I would fix

Source: `cimicimi-mobile/cimicimi` (RN/Expo + NativeWind). This demo is a **faithful port**, so every
item below is still present here and visible on screen, except those marked FIXED or RN only. Section numbers refer to the demo page.

## Bugs

1. **FIXED in this demo.** **Token typo: `'light-dark-tertiary'`** (`tailwind.config.js`). Should be `'dark-text-tertiary'`.
   `usePaletteClass().text.tertiary` emits `dark:text-dark-text-tertiary`, which does not exist, so
   in dark mode tertiary text falls back to the light value (`#cacaca` instead of `#434347`).
   Demo: section 3 (`text.tertiary`) and section 4c. (Renamed in this demo's `tailwind.config.js`;
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
   (In this demo the hook is replaced by the static `PaletteClass` constant in
   `src/constants/PaletteClass.ts`; the original RN repo is unchanged.)

## Architecture

6. **The palette is declared three times** (`Colors.ts`, `usePalette`, `tailwind.config.js`) with no
   sync check. Derive Tailwind colors and the `usePalette` object from `Colors` programmatically.
7. **`primary` is split across two places.** The 50-950 ramp exists only in Tailwind; `Colors.ts` has
   `primary`, `primary200`, `primary300`. `primary` is duplicated as a literal `#FF3319`.
   Move the whole ramp into `Colors.ts`.
8. **Status colors (`success/info/warning/error/hint`) have no Tailwind classes.**
   Class-based code cannot use them. Demo: section 4c.
9. **Theme is encoded in token names** (`light-text` + `dark:dark-text`). Every use needs a pair,
   which is why `usePaletteClass` exists. Use semantic tokens backed by CSS variables
   (`bg-background`, `text-foreground`) so the theme switches without `dark:` pairs, then
   `usePaletteClass` can go away.
10. **Two competing consumption styles** for classes (`usePaletteClass` vs hand-written `dark:`; 44
    `dark:` uses in the RN app). Pick one.
11. **Hand-copied alpha literals** (`rgba(255,51,25,.14)`, `.30`, black scrims). Add
    `withAlpha(color, a)` and named overlay tokens. Demo: section 5.
12. **Dead shadcn/gluestack CSS variables in `global.css`.** Nothing in the RN app reads them (and
    their `--primary` is grey, unrelated to the brand). Delete, or make them the real semantic
    layer from item 9. Demo: section 6.
13. **Inverted dark naming.** Dark `container` (`#000`) is darker than dark `background`
    (`#1e1c1e`); light is the opposite. Rename (`surface`/`sunken`) or document it.
14. **`fontFamily.sans: ['Nunito']` has no fallback stack.** On web this resolves to serif until the
    font loads (visible in this demo).
15. **`usePalette` re-lists every key by hand.** Build it from `Colors` so adding a color is one edit.

## Suggested order

1 (bug) -> 6/7/15 (single source of truth) -> 8 -> 11 -> 9/10/12 (semantic tokens) -> 13/14.
