import { computed, ref, watchEffect } from 'vue';

import type { Theme } from '@/constants/Colors';

// Which color scheme is active, and the `.dark` class on <html> that every color follows.
// The setting is the user's choice; `system` follows the OS. index.html applies the same rule before the
// app loads so a dark page never flashes light; keep the two in step.

export type ThemeSetting = 'system' | 'light' | 'dark';
export type ColorScheme = keyof typeof Theme;

const KEY = 'themeSetting';
const settings: ThemeSetting[] = ['system', 'light', 'dark'];

const stored = localStorage.getItem(KEY) as ThemeSetting | null;
export const themeSetting = ref<ThemeSetting>(stored && settings.includes(stored) ? stored : 'system');

export function setThemeSetting(value: ThemeSetting) {
  themeSetting.value = value;
  localStorage.setItem(KEY, value);
}

const query = window.matchMedia('(prefers-color-scheme: dark)');
const systemScheme = ref<ColorScheme>(query.matches ? 'dark' : 'light');
query.addEventListener('change', (e) => (systemScheme.value = e.matches ? 'dark' : 'light'));

export const colorScheme = computed<ColorScheme>(() =>
  themeSetting.value === 'system' ? systemScheme.value : themeSetting.value,
);

watchEffect(() => document.documentElement.classList.toggle('dark', colorScheme.value === 'dark'));
