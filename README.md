# ColorArchitecture

Small Vue 3 + Vite + TypeScript + Tailwind 4 app showing a web color architecture built on Tailwind 4's
CSS-first conventions. It started as a port of the `cimicimi-mobile/cimicimi` color setup and has since
been reworked for the web only.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # vue-tsc + vite build
```

## How colors work

- **Values live in TypeScript.** `src/constants/Colors.ts` is the single source of truth: the primary
  ramp (`PrimaryRamp`), fixed brand and status colors (`Brand`), and the theme colors (`Theme.light` /
  `Theme.dark`, which must have the same keys). Names are camelCase; CSS and classes use the kebab-case
  form (`surfaceMuted` -> `--color-surface-muted` -> `bg-surface-muted`, `primary500` -> `bg-primary-500`).
- **The CSS is generated in memory.** A Vite plugin in `vite.config.ts` builds a `@theme static` block
  (every color, light values) and a `.dark { ... }` block (theme colors) from `Colors.ts`, and injects
  them into `src/style.css` at the `/* @color-theme */` marker. No generated file exists on disk, so
  there is nothing to edit by mistake. Editing `Colors.ts` restarts the dev server and the page reloads.
- **Colors can't be defined anywhere else.** The same plugin fails the build when any CSS file or Vue
  `<style>` block defines a `--color-*` variable, and when the marker is missing.
- **Dark mode overrides variables, not classes.** `App.vue` toggles `.dark` on `<html>`; every class and
  `var()` follows without a `dark:` variant.
- **No `tailwind.config.js`, no safelist.** Tailwind 4 reads the theme from the injected CSS, and every
  class is written out in full so its source scan finds it.

## Pages

One page per usage method (hash routes via `vue-router`, `src/router.ts`). Each shows the same sections:
brand colors, primary ramp, brand colors as text, then theme text, surfaces and borders.

| Page | Route | Method | Use it for |
|---|---|---|---|
| CSS variables | `#/vars` | `style="background: var(--color-surface)"` via `color('surface')` | inline styles; inline SVG (example on the page) |
| `usePalette()` | `#/palette` | the current theme's hex values from `Colors.ts` | WebGL/shader uniforms, `<canvas>`, chart libraries, SVGs used as images (shader and canvas examples on the page) |
| Direct Tailwind | `#/tailwind` | `class="bg-surface"` | everything else (the default) |

`usePalette()` returns the current theme's values straight from `Colors.ts` (no DOM reads), and
`toRgb()` turns a hex into the `[r, g, b]` 0-1 floats WebGL uniforms take.

On the Direct Tailwind page each class map is checked with `satisfies` against the names in `Colors.ts`,
so a new color without its class fails `vue-tsc`.
