// The single source of truth for colors. build/colorTheme.ts generates the Tailwind theme from this file and
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

// Theme colors; `.dark` overrides the light values. `dark` must have exactly the same keys as `light`.
const light = {
  foreground: '#010101',
  foregroundMuted: '#50514f',
  foregroundSubtle: '#cacaca',
  surface: '#fdfdfd',
  canvas: '#f5f5f5',
  canvasPrimary: PrimaryRamp[100],
  border: '#e4e4e4',
  surfaceMuted: '#eeeeee',
} as const;

const dark = {
  foreground: '#f2f2f2',
  foregroundMuted: '#8e8e8f',
  foregroundSubtle: '#434347',
  surface: '#1e1c1e',
  canvas: '#000000',
  canvasPrimary: PrimaryRamp[950],
  border: '#333336',
  surfaceMuted: '#3a3a3d',
} as const satisfies Record<keyof typeof light, string>;

export const Theme = { light, dark } as const;

export type ThemeColor = keyof typeof light;
export type BrandColor = keyof typeof Brand;
export type PrimaryRampStep = keyof typeof PrimaryRamp;
export type RampColor = `primary${PrimaryRampStep}`;
export type ColorName = BrandColor | RampColor | ThemeColor;

export const BrandColors = Object.keys(Brand) as BrandColor[];
export const RampColors = Object.keys(PrimaryRamp).map((step) => `primary${step}`) as RampColor[];
export const ThemeColors = Object.keys(light) as ThemeColor[];
