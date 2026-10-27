// Static: theme switching happens in CSS via `dark:`, so nothing here depends on the scheme.
export const ColorClass = {
  text: {
    primary: 'text-primary',
    foreground: 'text-light-foreground dark:text-dark-foreground',
    foregroundInverse: 'dark:text-light-foreground text-dark-foreground',
    black: 'text-black',
    white: 'text-white',
    foregroundMuted: 'text-light-foreground-muted dark:text-dark-foreground-muted',
    foregroundSubtle: 'text-light-foreground-subtle dark:text-dark-foreground-subtle',
    contrast: 'text-black dark:text-white',
    contrastInverse: 'dark:text-black text-white',
  },
  background: {
    primary: 'bg-primary',
    canvas: 'bg-light-canvas dark:bg-dark-canvas',
    surface: 'bg-light-surface dark:bg-dark-surface',
    surfaceMuted: 'bg-light-surface-muted dark:bg-dark-surface-muted',
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
} as const;
