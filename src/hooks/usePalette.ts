import { computed } from 'vue';

import { Colors } from '@/constants/Colors';
import { useEffectiveColorScheme } from '@/hooks/useEffectiveColorScheme';

// Brand colors are fixed; the rest comes from the active scheme. Built from `Colors` so adding a
// color is one edit (see FIXES.md items 6 and 15).
const { light, dark, ...brand } = Colors;

// Fails type-checking if `Colors.light` and `Colors.dark` ever stop having the same keys.
type LightKey = keyof typeof light;
type DarkKey = keyof typeof dark;
type SameKeys = [LightKey] extends [DarkKey] ? ([DarkKey] extends [LightKey] ? true : false) : false;
export const themeKeysMatch: SameKeys = true;

export function usePalette() {
  const scheme = useEffectiveColorScheme();
  return computed(() => ({ ...brand, ...Colors[scheme.value] }));
}
