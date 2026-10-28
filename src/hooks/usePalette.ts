import { computed } from 'vue';

import { colorValues } from '@/constants/Colors';
import { useEffectiveColorScheme } from '@/hooks/useEffectiveColorScheme';

// Color values for the current theme, for code that can't take `var(--color-*)`: WebGL/shader uniforms,
// <canvas> drawing, chart libraries, SVGs used as images. Styling (including inline SVG) should use
// classes or `color()` from src/constants/Colors.ts instead; those follow the theme without JavaScript.
// The values come straight from Colors.ts, so this needs no DOM and is always in sync.
export function usePalette() {
  const scheme = useEffectiveColorScheme();
  return computed(() => colorValues(scheme.value));
}

export type Palette = ReturnType<typeof colorValues>;

// `#rgb` / `#rrggbb` -> `[r, g, b]` in 0-1, the form WebGL uniforms (`vec3`) take.
export function toRgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '');
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  const n = parseInt(h, 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}
