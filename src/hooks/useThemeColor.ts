import { computed } from 'vue';

import { Colors, ThemeKey } from '@/constants/Colors';
import { useEffectiveColorScheme } from '@/hooks/useEffectiveColorScheme';

export function useThemeColor(key: ThemeKey, override?: { light?: string; dark?: string }) {
  const theme = useEffectiveColorScheme();
  return computed(() => override?.[theme.value] ?? Colors[theme.value][key]);
}
