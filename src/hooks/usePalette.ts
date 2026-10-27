import { computed } from 'vue';

import { Colors } from '@/constants/Colors';

import { useThemeColor } from './useThemeColor';

export function usePalette() {
  const text = useThemeColor('text');
  const textSecondary = useThemeColor('textSecondary');
  const textTertiary = useThemeColor('textTertiary');
  const background = useThemeColor('background');
  const backgroundSoft = useThemeColor('backgroundSoft');
  const container = useThemeColor('container');
  const border = useThemeColor('border');
  return computed(() => ({
    primary: Colors.primary,
    primary200: Colors.primary200,
    primary300: Colors.primary300,
    success: Colors.success,
    info: Colors.info,
    warning: Colors.warning,
    error: Colors.error,
    hint: Colors.hint,
    black: Colors.black,
    white: Colors.white,
    messageSentBackground: Colors.messageSentBackground,
    text: text.value,
    textSecondary: textSecondary.value,
    textTertiary: textTertiary.value,
    background: background.value,
    container: container.value,
    border: border.value,
    backgroundSoft: backgroundSoft.value,
  }));
}
