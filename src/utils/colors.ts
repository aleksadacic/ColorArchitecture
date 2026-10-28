// Turns the colors in src/constants/Colors.ts into the forms the rest of the code needs: CSS names,
// `var()` references and per-mode values. Imported by build/colorTheme.ts too, which runs inside the Vite
// config where the `@` alias isn't set up, so imports here are relative.
import { Brand, ColorName, PrimaryRamp, Theme } from '../constants/Colors';

// `surfaceMuted` -> `surface-muted`, `primary500` -> `primary-500`: the CSS variable and class name.
export const cssName = (name: ColorName) => name.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase();

// A reference for inline styles: `:style="{ background: color('surface') }"`. Follows the theme on its own.
export const color = (name: ColorName) => `var(--color-${cssName(name)})`;

// Every color's value in one mode, keyed by name. Used to generate the CSS and by `usePalette()`.
export function colorValues(scheme: keyof typeof Theme): Record<ColorName, string> {
  const ramp = Object.fromEntries(Object.entries(PrimaryRamp).map(([step, v]) => [`primary${step}`, v]));
  return { ...Brand, ...ramp, ...Theme[scheme] } as Record<ColorName, string>;
}
