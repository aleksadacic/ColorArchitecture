import { computed } from 'vue';

import { useColorScheme } from '@/hooks/useColorScheme';
import { themeSetting } from '@/stores/useAppPreferencesStore';

export type EffectiveColorScheme = 'light' | 'dark';

export function useEffectiveColorScheme() {
  const systemScheme = useColorScheme();
  return computed<EffectiveColorScheme>(() =>
    themeSetting.value === 'system' ? systemScheme.value : themeSetting.value,
  );
}
