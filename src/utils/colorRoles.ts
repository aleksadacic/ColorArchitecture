import { Colors, PrimaryRamp } from '@/constants/Colors';

// Shared by the three usage-method pages so each shows the same sections: brand colors, the primary
// ramp, brand colors as text, then the active scheme's text, surfaces and borders.

export type ColorRole = 'text' | 'surface' | 'border';

export interface ColorItem {
  label: string;
  value?: string;
  swatchStyle?: Record<string, string>;
  swatchClass?: string;
}

export interface ColorSection {
  id: string;
  title: string;
  code: string;
  note?: string;
  // Renders "Sample text" in the chip instead of an empty fill.
  text?: boolean;
  items: ColorItem[];
}

// Fixed brand colors, in `Colors` order (`primary`, `success`, ..., `customColor`).
export const brandKeys = Object.keys(Colors).filter(
  (k) => typeof Colors[k as keyof typeof Colors] === 'string',
) as (keyof typeof Colors)[];

// Steps of the primary ramp: `50`, `100`, ..., `950`.
export const rampSteps = Object.keys(PrimaryRamp) as `${keyof typeof PrimaryRamp}`[];

// `foreground*` is text, `border*` is borders, everything else in a scheme is a surface.
export function colorRole(key: string): ColorRole {
  if (key.startsWith('foreground')) return 'text';
  if (key.startsWith('border')) return 'border';
  return 'surface';
}

export function byRole<T extends [string, unknown]>(entries: T[], role: ColorRole): T[] {
  return entries.filter(([k]) => colorRole(k) === role);
}

// Inline-style swatches for a color given as a value (raw constants, usePalette).
export const fill = (v: string) => ({ background: v });
export const ink = (v: string) => ({ color: v });
export const outline = (v: string) => ({ borderColor: v, borderWidth: '4px' });
