import { Plugin } from 'vite';

import { applyScheme, DARK_QUERY, resolveScheme, THEME_SETTING_KEY } from '../src/theme/schemeRule';

// Adds a small inline script to index.html that sets `.dark` before the first paint, so a dark page never
// flashes light while the app loads. The script is built from the same functions and constants
// src/theme/scheme.ts uses (src/theme/schemeRule.ts), turned into source text with `String(fn)`, so the
// rule exists once. `try` covers storage that throws (blocked cookies, some private modes); the app's own
// scheme.ts then applies the class once it runs.
export function schemeScript(): Plugin {
  const script =
    `try{(${String(applyScheme)})((${String(resolveScheme)})(` +
    `localStorage.getItem(${JSON.stringify(THEME_SETTING_KEY)}),matchMedia(${JSON.stringify(DARK_QUERY)}).matches))}catch{}`;
  return {
    name: 'scheme-script',
    transformIndexHtml: () => [{ tag: 'script', children: script, injectTo: 'head' }],
  };
}
