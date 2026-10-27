import { Colors } from './src/constants/Colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,ts}'],
  // RN original: presets: [require('nativewind/preset')],
  safelist: [
    {
      pattern: /^(bg|text|border)-primary-(50|100|200|300|400|500|600|700|800|900|950)$/,
    },
    { pattern: /^gap-(1|2|3|4|5|6|8|9|10|20)$/ },
    { pattern: /^border$/, variants: ['dark'] },
    { pattern: /^(bg|text|border|fill|stroke)-primary$/, variants: ['dark'] },
    {
      pattern: /(bg|border|text|stroke|fill)-(light|dark)-(text|border|container|background|text-secondary|text-tertiary|background-soft)$/,
      variants: ['dark'],
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF3319',
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
        },
        'light-text': Colors.light.text,
        'light-text-secondary': Colors.light.textSecondary,
        'light-text-tertiary': Colors.light.textTertiary,
        'light-border': Colors.light.border,
        'light-container': Colors.light.container,
        'light-background': Colors.light.background,
        'light-background-soft': Colors.light.backgroundSoft,

        'dark-text': Colors.dark.text,
        'dark-text-secondary': Colors.dark.textSecondary,
        'dark-text-tertiary': Colors.dark.textTertiary,
        'dark-border': Colors.dark.border,
        'dark-container': Colors.dark.container,
        'dark-background': Colors.dark.background,
        'dark-background-soft': Colors.dark.backgroundSoft,
      },
      fontFamily: {
        sans: ['Nunito'],
      },
      fontWeight: {
        black: '900',
        extrabold: '800',
        bold: '700',
        semibold: '600',
        medium: '500',
        regular: '400',
        light: '300',
        extralight: '200',
      },
      fontSize: {
        '2xs': '10px',
      },
      borderRadius: {
        '4xl': '1.75rem',
      },
    },
  },
  plugins: [],
};
