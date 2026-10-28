# ColorArchitecture

Small Vue 3 + Vite + TypeScript + Tailwind 4 app that reproduces the color architecture of
`cimicimi-mobile/cimicimi` so it can be studied and refactored in isolation.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # vue-tsc + vite build
```

Each usage method has its own page (hash routes via `vue-router`, defined in `src/router.ts`):

| Page | Route | Shows |
|---|---|---|
| Raw constants | `#/raw` | fixed `Colors` values; the active scheme's `Colors.light` or `Colors.dark` |
| `usePalette()` | `#/palette` | theme-resolved hex values |
| Direct Tailwind | `#/tailwind` | primary ramp, `light-`/`dark-` pairs, status and brand classes, semantic tokens |

## What is copied (faithful port, bugs included)

| RN source | Here |
|---|---|
| `constants/Colors.ts` | `src/constants/Colors.ts` (same values; see deviations) |
| `tailwind.config.js` | `tailwind.config.js` (`nativewind/preset` and `content` adapted; see deviations) |
| `global.css` | `src/style.css` (Tailwind 4 entry; HSL variables removed, see deviations) |
| `hooks/useThemeColor`, `usePalette`, `useEffectiveColorScheme`, `useColorScheme` | `src/hooks/*` as Vue composables (same names; return `ComputedRef`) |
| `stores/useAppPreferencesStore` (theme part) | `src/stores/useAppPreferencesStore.ts` (ref + localStorage) |

## Tailwind 4 notes

- `@config '../tailwind.config.js'` loads the legacy JS config unchanged.
- There is no safelist: every class is written out in full in the source, so Tailwind's scan finds it.
- `darkMode: 'class'` is re-declared with `@custom-variant dark`; `App.vue` toggles `.dark` on `<html>`.

## Deliberate deviations from the RN app

- The `light-dark-tertiary` token typo is fixed as `light-foreground-subtle` / `dark-foreground-subtle`.
- The no-op `dark:` classes and the `usePaletteClass` hook are removed; classes are written directly.
- The `light-*`/`dark-*` Tailwind tokens and `usePalette` are generated from `Colors` instead of listed by hand.
- The `primary` 50-950 ramp lives in `Colors.ts` as `PrimaryRamp`; `Colors.primary`, Tailwind and `usePalette()` (`primary50` ... `primary950`) read from it.
- The safelist is removed; nothing builds class names from variables. On the Direct Tailwind page each class map is checked with `satisfies` against the `Colors` keys, so a new color without a class fails `vue-tsc`.
- Fixed brand and status colors (`success`, `info`, `warning`, `error`, `hint`, ...) have generated Tailwind classes.
- Semantic tokens (`bg-canvas`, `text-foreground-muted`, ...) backed by `--theme-*` CSS variables switch with the theme without `dark:` pairs. The demo layout uses them.
- The hand-copied `rgba()` alpha literals and the unused shadcn HSL variables are removed.
- Theme keys are renamed by role: `container` -> `canvas`, `background` -> `surface`, `backgroundSoft` -> `surfaceMuted`, `text` -> `foreground`, `textSecondary` -> `foregroundMuted`, `textTertiary` -> `foregroundSubtle` (`border` unchanged).
- `fontFamily.sans` is Satoshi (the demo's font) with a system fallback stack, instead of `['Nunito']`.
