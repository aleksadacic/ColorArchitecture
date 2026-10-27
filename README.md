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
| `constants/Colors.ts` | `src/constants/Colors.ts` (verbatim) |
| `tailwind.config.js` | `tailwind.config.js` (verbatim; `nativewind/preset` and `content` adapted) |
| `global.css` | `src/style.css` (HSL variables verbatim; Tailwind 4 entry on top) |
| `hooks/useThemeColor`, `usePalette`, `useEffectiveColorScheme`, `useColorScheme` | `src/hooks/*` as Vue composables (same names; return `ComputedRef`) |
| `stores/useAppPreferencesStore` (theme part) | `src/stores/useAppPreferencesStore.ts` (ref + localStorage) |

## Tailwind 4 notes

- `@config '../tailwind.config.js'` loads the legacy JS config unchanged.
- v4 ignores `safelist`, so its patterns are re-declared with `@source inline(...)` in `src/style.css`.
- `darkMode: 'class'` is re-declared with `@custom-variant dark`; `App.vue` toggles `.dark` on `<html>`.

Deliberate deviations: the `light-dark-tertiary` token typo (bug 1 in `FIXES.md`) is fixed here as `dark-text-tertiary`, and the safelist now includes `text-tertiary` and `background-soft` (bug 2), and the no-op `dark:` classes are removed from `usePaletteClass` (bug 3), and `usePaletteClass` is replaced by the static `PaletteClass` constant in `src/constants/PaletteClass.ts` (bug 5).

See `FIXES.md` for what I would change.
