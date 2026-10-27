import { computed } from 'vue';

import { useEffectiveColorScheme } from '@/hooks/useEffectiveColorScheme';

export function usePaletteClass() {
  const scheme = useEffectiveColorScheme();

  // Ported 1:1. As in RN, the memo depends on `scheme` although the strings are static.
  return computed(() => {
    void scheme.value;
    return {
      text: {
        primary: 'text-primary',
        typography: 'text-light-text dark:text-dark-text',
        typographyInverse: 'dark:text-light-text text-dark-text',
        black: 'text-black',
        white: 'text-white',
        secondary: 'text-light-text-secondary dark:text-dark-text-secondary',
        tertiary: 'text-light-text-tertiary dark:text-dark-text-tertiary',
        contrast: 'text-black dark:text-white',
        contrastInverse: 'dark:text-black text-white',
      },
      background: {
        primary: 'bg-primary',
        container: 'bg-light-container dark:bg-dark-container',
        normal: 'bg-light-background dark:bg-dark-background',
        soft: 'bg-light-background-soft dark:bg-dark-background-soft',
        contrast: 'bg-white dark:bg-black',
      },
      border: {
        primary: 'border border-primary',
        normal: 'border border-light-border dark:border-dark-border',
        contrast: 'border border-black dark:border-white',
      },
      borderTop: {
        primary: 'border-t border-primary',
        normal: 'border-t border-light-border dark:border-dark-border',
        contrast: 'border-t border-black dark:border-white',
      },
      borderBottom: {
        primary: 'border-b border-primary',
        normal: 'border-b border-light-border dark:border-dark-border',
        contrast: 'border-b border-black dark:border-white',
      },
      borderLeft: {
        primary: 'border-l border-primary',
        normal: 'border-l border-light-border dark:border-dark-border',
        contrast: 'border-l border-black dark:border-white',
      },
      borderRight: {
        primary: 'border-r border-primary',
        normal: 'border-r border-light-border dark:border-dark-border',
        contrast: 'border-r border-black dark:border-white',
      },
    };
  });
}
