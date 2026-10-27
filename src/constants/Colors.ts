// Full brand ramp; Tailwind's `primary-50` ... `primary-950` are generated from it (see FIXES.md item 7).
export const PrimaryRamp = {
  50: '#fff2f0',
  100: '#ffe1dd',
  200: '#ffc7c0',
  300: '#ffa094',
  400: '#ff6a57',
  500: '#ff3c23',
  600: '#ff3319',
  700: '#d71800',
  800: '#b11703',
  900: '#92190a',
  950: '#500900',
} as const;

export const Colors = {
  primary: PrimaryRamp[600],
  primary200: PrimaryRamp[200],
  primary300: PrimaryRamp[300],
  success: '#0E9F58',
  info: '#377DFF',
  warning: '#E5A000',
  error: '#FF5A5A',
  hint: '#7C4DFF',
  black: '#000',
  white: '#fff',
  customColor: '#fff000',
  light: {
    foreground: '#010101',
    foregroundMuted: '#50514F',
    foregroundSubtle: '#cacaca',
    surface: '#fdfdfd',
    canvas: '#F5F5F5',
    canvasPrimary: PrimaryRamp[100],
    border: '#E4E4E4',
    surfaceMuted: '#EEEEEE',
  },
  dark: {
    foreground: '#f2f2f2',
    foregroundMuted: '#8e8e8f',
    foregroundSubtle: '#434347',
    surface: '#1e1c1e',
    canvas: '#000',
    canvasPrimary: PrimaryRamp[950],
    border: '#333336',
    surfaceMuted: '#3A3A3D',
  },
} as const;

export type ThemeKey = keyof typeof Colors.light;
