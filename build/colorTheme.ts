import { fileURLToPath } from 'node:url';

import { normalizePath, Plugin } from 'vite';

import { colorValues, cssName, ColorName, ThemeColors } from '../src/constants/Colors';

const MARKER = '/* @color-theme */';
// Vite module ids use forward slashes; fileURLToPath gives backslashes on Windows.
const styleCss = normalizePath(fileURLToPath(new URL('../src/style.css', import.meta.url)));

// The Tailwind theme for every color in src/constants/Colors.ts: all of them in `@theme` (light values),
// then the theme colors again under `.dark`. `static` emits each variable even when no class uses it,
// since inline styles reference them with `var()`.
function themeCss(): string {
  const decl = (values: Record<string, string>, names: string[], indent: string) =>
    names.map((n) => `${indent}--color-${cssName(n as ColorName)}: ${values[n]};`).join('\n');
  const light = colorValues('light');
  const dark = colorValues('dark');
  return [
    '@theme static {',
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
