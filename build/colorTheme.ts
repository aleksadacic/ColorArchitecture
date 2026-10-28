import { fileURLToPath } from 'node:url';

import { normalizePath, Plugin } from 'vite';

import { ColorName, ThemeColors } from '../src/constants/Colors';
import { colorValues, cssName } from '../src/utils/colors';

const MARKER = '/* @color-theme */';
// Vite module ids use forward slashes; fileURLToPath gives backslashes on Windows.
const styleCss = normalizePath(fileURLToPath(new URL('../src/style.css', import.meta.url)));

// The Tailwind theme for every color in src/constants/Colors.ts: all of them in `@theme` (light values),
// then the theme colors again under `.dark`. `static` emits each variable even when no class uses it,
// since inline styles reference them with `var()`.
//
// The block opens with `--color-*: initial`, which removes Tailwind's built-in palette (red-500, zinc-700,
// ...). Without it those classes still compile and quietly bypass Colors.ts; with it, the only colors that
// exist are ours, so `bg-red-500` generates no CSS at all. It also means a color missing from the generated
// theme stays missing instead of falling back to a Tailwind default that looks almost right.
// `transparent`, `current` and `inherit` are keywords, not theme colors, so they keep working.
//
// It also lists a `bg-*` and `text-*` class for every color with `@source inline`, so Tailwind generates
// them without finding them in the source. Only the Direct Tailwind page relies on this: it shows every
// color and builds its class names from `cssName()`. Everywhere else, write classes out in full.
function themeCss(): string {
  const decl = (values: Record<string, string>, names: string[], indent: string) =>
    names.map((n) => `${indent}--color-${cssName(n as ColorName)}: ${values[n]};`).join('\n');
  const light = colorValues('light');
  const dark = colorValues('dark');
  const names = (Object.keys(light) as ColorName[]).map(cssName);
  const classes = ['bg', 'text'].flatMap((prefix) => names.map((n) => `${prefix}-${n}`));
  return [
    `@source inline("${classes.join(' ')}");`,
    '@theme static {',
    '  --color-*: initial;',
    decl(light, Object.keys(light), '  '),
    '}',
    '@layer base {',
    '  .dark {',
    decl(dark, ThemeColors, '    '),
    '  }',
    '}',
  ].join('\n');
}

// Keeps Colors.ts the only place colors are defined:
// - injects the generated theme into style.css in memory, at the `/* @color-theme */` marker, so there is
//   no generated file anyone could edit;
// - fails on any hand-written `--color-*` (Tailwind) or `--p-*` (PrimeVue) definition in CSS or a Vue
//   <style> block; PrimeVue's variables come from the preset in src/theme/primevuePreset.ts.
// Colors.ts is part of the Vite config's imports, so editing it restarts the dev server and regenerates
// the theme.
export function colorTheme(): Plugin {
  return {
    name: 'color-theme',
    enforce: 'pre',
    transform(code, id) {
      const [file, query = ''] = id.split('?');
      const isCss = /\.(css|pcss|postcss)$/.test(file) || /type=style/.test(query);
      if (!isCss || file.includes('/node_modules/')) return null;

      const defined = [...code.matchAll(/--(?:color|p)-[\w-]+\s*:/g)];
      if (defined.length) {
        const where = defined.map((m) => `line ${code.slice(0, m.index).split('\n').length}: ${m[0].slice(0, -1).trim()}`);
        this.error(
          `${file} defines colors directly (${where.join(', ')}). Colors live in src/constants/Colors.ts; ` +
            'add them there and the Tailwind theme and PrimeVue preset are generated from it.',
        );
      }

      if (file !== styleCss) return null;
      if (code.split(MARKER).length !== 2) this.error(`src/style.css must contain ${MARKER} exactly once.`);
      return { code: code.replace(MARKER, themeCss()), map: null };
    },
  };
}
