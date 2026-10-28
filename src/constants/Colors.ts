// The single source of truth for colors. vite.config.ts generates the Tailwind theme from this file and
// injects it into src/style.css at build time; no CSS file may define `--color-*` itself (the build fails).
// Each key becomes a CSS variable and Tailwind classes by kebab-casing it: `surfaceMuted` ->
// `--color-surface-muted` -> `bg-surface-muted`; `PrimaryRamp[500]` -> `--color-primary-500`.

export const PrimaryRamp = {
  50: '#fff2f0',
  100: '#ffe1dd',
  200: '#ffc7c0',
  300: '#ffa094',
  400: '#ff6a57',
  500: '#ff3c23',
  600: '#ff3319',
  700: '#d71800',
  800: '#b11703',
  900: '#92190a',
  950: '#500900',
} as const;

// Fixed brand and status colors; same in both modes.
export const Brand = {
  primary: PrimaryRamp[600],
  success: '#0e9f58',
  info: '#377dff',
  warning: '#e5a000',
  error: '#ff5a5a',
  hint: '#7c4dff',
  black: '#000000',
  white: '#ffffff',
  customColor: '#fff000',
} as const;

// Neutral ramps, one per theme, both running light (0) to dark (950) as PrimeVue's `surface` scale
// expects. The theme colors below are steps of these. Steps marked * are interpolated fillers that no
// role uses yet; adjust them freely.
const lightNeutral = {
  0: '#fdfdfd',
  50: '#f5f5f5',
  100: '#eeeeee',
  200: '#e4e4e4',
  300: '#cacaca',
  400: '#a1a1a1', // *
  500: '#787878', // *
  600: '#50514f',
  700: '#3c3c3c', // *
  800: '#282828', // *
  900: '#141414', // *
  950: '#010101',
} as const;

const darkNeutral = {
  0: '#ffffff', // *
  50: '#f2f2f2',
  100: '#d9d9d9', // *
  200: '#c0c0c0', // *
  300: '#a7a7a7', // *
  400: '#8e8e8f',
  500: '#69696b', // *
  600: '#434347',
  700: '#3a3a3d',
  800: '#333336',
  900: '#1e1c1e',
  950: '#000000',
} as const satisfies Record<keyof typeof lightNeutral, string>;

export const NeutralRamp = { light: lightNeutral, dark: darkNeutral } as const;

// Theme colors by role; `.dark` overrides the light values. `dark` must have exactly the same keys as `light`.
const light = {
  foreground: lightNeutral[950],
  foregroundMuted: lightNeutral[600],
  foregroundSubtle: lightNeutral[300],
  surface: lightNeutral[0],
  canvas: lightNeutral[50],
  canvasPrimary: PrimaryRamp[100],
  border: lightNeutral[200],
  surfaceMuted: lightNeutral[100],
} as const;

const dark = {
  foreground: darkNeutral[50],
  foregroundMuted: darkNeutral[400],
  foregroundSubtle: darkNeutral[600],
  surface: darkNeutral[900],
  canvas: darkNeutral[950],
  canvasPrimary: PrimaryRamp[950],
  border: darkNeutral[800],
  surfaceMuted: darkNeutral[700],
} as const satisfies Record<keyof typeof light, string>;

export const Theme = { light, dark } as const;

export type BrandColor = keyof typeof Brand;
export type PrimaryRampStep = keyof typeof PrimaryRamp;
export type RampColor = `primary${PrimaryRampStep}`;
export type NeutralStep = keyof typeof lightNeutral;
export type NeutralColor = `neutral${NeutralStep}`;
export type ThemeColor = keyof typeof light;
export type ColorName = BrandColor | RampColor | NeutralColor | ThemeColor;

export const BrandColors = Object.keys(Brand) as BrandColor[];
export const RampColors = Object.keys(PrimaryRamp).map((step) => `primary${step}`) as RampColor[];
export const NeutralColors = Object.keys(lightNeutral).map((step) => `neutral${step}`) as NeutralColor[];
export const ThemeColors = Object.keys(light) as ThemeColor[];
// Every color whose value depends on the theme (the `.dark` block overrides exactly these).
export const ThemedColors: (NeutralColor | ThemeColor)[] = [...NeutralColors, ...ThemeColors];

// `surfaceMuted` -> `surface-muted`, `primary500` -> `primary-500`, `neutral0` -> `neutral-0`: the CSS
// variable and class name.
export const cssName = (name: ColorName) => name.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase();

// A reference for inline styles: `style={{ background: color('surface') }}`. Follows the theme on its own.
export const color = (name: ColorName) => `var(--color-${cssName(name)})`;

// Every color's value in one mode, keyed by name. Used to generate the CSS and by `usePalette()`.
export function colorValues(scheme: keyof typeof Theme): Record<ColorName, string> {
  const ramp = Object.fromEntries(Object.entries(PrimaryRamp).map(([step, v]) => [`primary${step}`, v]));
  const neutral = Object.fromEntries(Object.entries(NeutralRamp[scheme]).map(([step, v]) => [`neutral${step}`, v]));
  return { ...Brand, ...ramp, ...neutral, ...Theme[scheme] } as Record<ColorName, string>;
}
