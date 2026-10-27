# ColorArchitecture

Small Vue 3 + Vite + TypeScript + Tailwind 4 app that reproduces the color architecture of
`cimicimi-mobile/cimicimi` so it can be studied and refactored in isolation.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # vue-tsc + vite build
```

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
- v4 ignores `safelist`, so its patterns are re-declared with `@source inline(...)` in `src/style.css`.
- `darkMode: 'class'` is re-declared with `@custom-variant dark`; `App.vue` toggles `.dark` on `<html>`.

## Deliberate deviations

Numbers refer to `FIXES.md`.

- **1:** the `light-dark-tertiary` token typo is fixed as `dark-text-tertiary`.
- **2:** the safelist includes `text-tertiary` and `background-soft`.
- **3:** the no-op `dark:` classes are removed from `usePaletteClass`.
- **5, 10:** `usePaletteClass` is removed; classes are written directly, with semantic classes for themed colors.
- **6, 15:** the `light-*`/`dark-*` Tailwind tokens and `usePalette` are generated from `Colors` instead of listed by hand.
- **7:** the `primary` 50-950 ramp lives in `Colors.ts` as `PrimaryRamp`; `Colors.primary*` and Tailwind read from it.
- **8:** status and other fixed brand colors (`success`, `info`, `warning`, `error`, `hint`, `messageSentBackground`) have generated Tailwind classes.
- **9:** semantic tokens (`bg-canvas`, `text-foreground-muted`, ...) backed by `--theme-*` CSS variables switch with the theme without `dark:` pairs. The demo layout uses them.
- **11:** the `rgba()` alpha literals and their demo section are removed.
- **12:** the unused shadcn HSL variables and their demo section are removed.
- **13:** the theme keys are renamed by role: `container` -> `canvas`, `background` -> `surface`, `backgroundSoft` -> `surfaceMuted`, `text` -> `foreground`, `textSecondary` -> `foregroundMuted`, `textTertiary` -> `foregroundSubtle` (`border` unchanged). Classes follow, e.g. `bg-light-canvas`, `text-foreground-muted`.
- **14:** `fontFamily.sans` is Satoshi (the demo's font) with a system fallback stack, instead of `['Nunito']`.

See `FIXES.md` for what I would change.
