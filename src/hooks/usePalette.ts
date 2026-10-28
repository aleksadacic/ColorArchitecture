import { computed } from 'vue';

import { colorValues } from '@/constants/Colors';
import { colorScheme } from '@/theme/scheme';

// Color values for the current theme, for code that can't take `var(--color-*)`: WebGL/shader uniforms,
// <canvas> drawing, chart libraries, SVGs used as images. Styling (including inline SVG) should use
// classes or `color()` from src/constants/Colors.ts instead; those follow the theme without JavaScript.
// The values come straight from Colors.ts, so this needs no DOM and is always in sync.
// `toRgb()` in src/utils/hex.ts turns a value into the floats WebGL uniforms take.
export function usePalette() {
  return computed(() => colorValues(colorScheme.value));
}

export type Palette = ReturnType<typeof colorValues>;
