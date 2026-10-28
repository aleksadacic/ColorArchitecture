// Hex color conversions, shared by usePalette() consumers and the PrimeVue preset.

// `#rgb` / `#rrggbb` -> `[r, g, b]` in 0-255.
export function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '');
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  const n = parseInt(h, 16);
  return [n >> 16, (n >> 8) & 255, n & 255];
}

// `[r, g, b]` in 0-255 (rounded) -> `#rrggbb`.
export const rgbToHex = (rgb: number[]) =>
  `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`;

// `#rgb` / `#rrggbb` -> `[r, g, b]` in 0-1, the form WebGL uniforms (`vec3`) take.
export function toRgb(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex);
  return [r / 255, g / 255, b / 255];
}
