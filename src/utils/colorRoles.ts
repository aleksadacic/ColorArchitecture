import { BrandColors, ColorName, RampColors, ThemeColor, ThemeColors } from '@/constants/Colors';

// Shared by the three usage-method pages so each shows the same sections: brand colors, the primary
// ramp, brand colors as text, then the theme's text, surfaces and borders.

export type ColorRole = 'text' | 'surface' | 'border';
export type SwatchKind = 'fill' | 'text' | 'border';

// `foreground*` is text, `border*` is borders, every other theme color is a surface.
export type TextThemeColor = Extract<ThemeColor, `foreground${string}`>;
export type BorderThemeColor = Extract<ThemeColor, `border${string}`>;
export type SurfaceThemeColor = Exclude<ThemeColor, TextThemeColor | BorderThemeColor>;

export function colorRole(name: string): ColorRole {
  if (name.startsWith('foreground')) return 'text';
  if (name.startsWith('border')) return 'border';
  return 'surface';
}

export const themeByRole = (role: ColorRole) => ThemeColors.filter((name) => colorRole(name) === role);

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

// How one usage method applies a color: the code shown in a section header and the swatch for a color.
export interface UsageMethod {
  id: string;
  name: string;
  code: (example: ColorName, kind: SwatchKind) => string;
  item: (name: ColorName, kind: SwatchKind) => ColorItem;
}

export function methodSections(m: UsageMethod): ColorSection[] {
  const fixed = 'Same in both modes.';
  const themed = 'Theme color: switches with the toggle.';
  return [
    {
      id: `${m.id}-brand`,
      title: `${m.name}: brand colors`,
      code: m.code('success', 'fill'),
      note: fixed,
      items: BrandColors.map((n) => m.item(n, 'fill')),
    },
    {
      id: `${m.id}-ramp`,
      title: `${m.name}: primary ramp`,
      code: m.code('primary500', 'fill'),
      note: fixed,
      items: RampColors.map((n) => m.item(n, 'fill')),
    },
    {
      id: `${m.id}-brand-text`,
      title: `${m.name}: brand colors as text`,
      code: m.code('success', 'text'),
      note: 'On the current surface. Same in both modes, so some (e.g. white) disappear in one of them.',
      text: true,
      items: BrandColors.map((n) => m.item(n, 'text')),
    },
    {
      id: `${m.id}-text`,
      title: `${m.name}: text`,
      code: m.code('foreground', 'text'),
      note: themed,
      text: true,
      items: themeByRole('text').map((n) => m.item(n, 'text')),
    },
    {
      id: `${m.id}-surfaces`,
      title: `${m.name}: surfaces`,
      code: m.code('surface', 'fill'),
      note: themed,
      items: themeByRole('surface').map((n) => m.item(n, 'fill')),
    },
    {
      id: `${m.id}-borders`,
      title: `${m.name}: borders`,
      code: m.code('border', 'border'),
      note: themed,
      items: themeByRole('border').map((n) => m.item(n, 'border')),
    },
  ];
}

// Inline-style swatch for a color given as a CSS value (`var(--color-*)` or a hex).
export function swatchStyle(value: string, kind: SwatchKind): Record<string, string> {
  if (kind === 'text') return { color: value };
  if (kind === 'border') return { borderColor: value, borderWidth: '4px' };
  return { background: value };
}
