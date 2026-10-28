import { Colors, PrimaryRamp } from './src/constants/Colors';

// `Colors.light.foregroundMuted` -> `light-foreground-muted`, etc. Generated so the token names
// cannot drift from `Colors`.
const kebab = (s) => s.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
const themeTokens = Object.fromEntries(
  ['light', 'dark'].flatMap((scheme) =>
    Object.entries(Colors[scheme]).map(([key, value]) => [`${scheme}-${kebab(key)}`, value]),
  ),
);

// Fixed brand colors other than the primary ramp: `success`, `info`, ..., `customColor` ->
// `custom-color`. Gives status colors Tailwind classes.
const brandTokens = Object.fromEntries(
  Object.entries(Colors)
    .filter(([key, value]) => typeof value === 'string' && !key.startsWith('primary'))
    .map(([key, value]) => [kebab(key), value]),
);

// Semantic tokens: one class per role, e.g. `bg-canvas`, backed by
// `--theme-canvas`. The plugin below sets the variables from `Colors.light` on :root and from
// `Colors.dark` on .dark, so the theme switches without `dark:` pairs.
const semanticTokens = Object.fromEntries(
  Object.keys(Colors.light).map((key) => [kebab(key), `var(--theme-${kebab(key)})`]),
);
const themeVars = (scheme) =>
  Object.fromEntries(Object.entries(Colors[scheme]).map(([key, value]) => [`--theme-${kebab(key)}`, value]));

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,ts}'],
  // RN original: presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: Colors.primary, ...PrimaryRamp },
        ...brandTokens,
        ...themeTokens,
        ...semanticTokens,
      },
      fontFamily: {
        sans: ['Satoshi', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        black: '900',
        extrabold: '800',
        bold: '700',
        semibold: '600',
        medium: '500',
        regular: '400',
        light: '300',
        extralight: '200',
      },
      fontSize: {
        '2xs': '10px',
      },
      borderRadius: {
        '4xl': '1.75rem',
      },
    },
  },
  plugins: [({ addBase }) => addBase({ ':root': themeVars('light'), '.dark': themeVars('dark') })],
};
