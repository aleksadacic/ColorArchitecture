import { computed } from 'vue';

import { Colors, PrimaryRamp } from '@/constants/Colors';
import { useEffectiveColorScheme } from '@/hooks/useEffectiveColorScheme';

// Brand colors are fixed; the rest comes from the active scheme. Built from `Colors` so adding a
// color is one edit.
const { light, dark, ...brand } = Colors;

// The full primary ramp as `primary50` ... `primary950`.
type RampStep = keyof typeof PrimaryRamp;
const ramp = Object.fromEntries(Object.entries(PrimaryRamp).map(([step, v]) => [`primary${step}`, v])) as {
  [S in RampStep as `primary${S}`]: (typeof PrimaryRamp)[S];
};

// Fails type-checking if `Colors.light` and `Colors.dark` ever stop having the same keys.
type LightKey = keyof typeof light;
type DarkKey = keyof typeof dark;
type SameKeys = [LightKey] extends [DarkKey] ? ([DarkKey] extends [LightKey] ? true : false) : false;
export const themeKeysMatch: SameKeys = true;

export function usePalette() {
  const scheme = useEffectiveColorScheme();
  return computed(() => ({ ...brand, ...ramp, ...Colors[scheme.value] }));
}
