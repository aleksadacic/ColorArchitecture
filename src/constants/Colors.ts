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
  messageSentBackground: '#FFEEAC',
  light: {
    text: '#010101',
    textSecondary: '#50514F',
    textTertiary: '#cacaca',
    background: '#fdfdfd',
    container: '#F5F5F5',
    border: '#E4E4E4',
    backgroundSoft: '#EEEEEE',
  },
  dark: {
    text: '#f2f2f2',
    textSecondary: '#8e8e8f',
    textTertiary: '#434347',
    background: '#1e1c1e',
    container: '#000',
    border: '#333336',
    backgroundSoft: '#3A3A3D',
  },
} as const;

export type ThemeKey = keyof typeof Colors.light;
