export const Colors = {
  primary: '#FF3319',
  primary200: '#FFC7C0',
  primary300: '#ffa094',
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
