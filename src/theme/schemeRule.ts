// The one definition of how the color scheme is chosen and applied. Used in two places:
// - src/theme/scheme.ts, which runs it reactively once the app is loaded;
// - build/schemeScript.ts, which turns `resolveScheme` and `applyScheme` into source text and injects them
//   into index.html, so the page gets the right scheme before its first paint (no light flash in dark mode).
// Because of the second use, both functions must be self-contained: they may use only their parameters and
// browser globals, nothing imported or defined elsewhere in this file. Keep imports relative and type-only;
// build/ runs inside the Vite config, where the `@` alias isn't set up.
import type { Theme } from '../constants/Colors';

export type ThemeSetting = 'system' | 'light' | 'dark';
export type ColorScheme = keyof typeof Theme;

export const THEME_SETTING_KEY = 'themeSetting';
export const DARK_QUERY = '(prefers-color-scheme: dark)';

// `system` (or anything unrecognised) follows the OS; `light` and `dark` override it.
export function resolveScheme(setting: string | null, systemDark: boolean): ColorScheme {
  return setting === 'dark' || (setting !== 'light' && systemDark) ? 'dark' : 'light';
}

// Every color follows this class: the generated `.dark` block, Tailwind's `dark` variant, PrimeVue.
export function applyScheme(scheme: ColorScheme) {
  document.documentElement.classList.toggle('dark', scheme === 'dark');
}
