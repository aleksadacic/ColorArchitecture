import { BrandColors, ColorName, RampColors, ThemeColors } from '@/constants/Colors';

// Shared by the three usage-method pages so each shows the same sections: brand colors, the primary
// ramp, brand colors as text, then the theme colors.

export type SwatchKind = 'fill' | 'text';

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
      id: `${m.id}-theme`,
      title: `${m.name}: theme colors`,
      code: m.code('surface', 'fill'),
      note: 'Switch with the toggle.',
      items: ThemeColors.map((n) => m.item(n, 'fill')),
    },
  ];
}

// Inline-style swatch for a color given as a CSS value (`var(--color-*)` or a hex).
export function swatchStyle(value: string, kind: SwatchKind): Record<string, string> {
  return kind === 'text' ? { color: value } : { background: value };
}
