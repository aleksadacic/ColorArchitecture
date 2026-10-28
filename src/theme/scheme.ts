import { computed, ref, watchEffect } from 'vue';

import {
  applyScheme,
  ColorScheme,
  DARK_QUERY,
  resolveScheme,
  THEME_SETTING_KEY,
  ThemeSetting,
} from '@/theme/schemeRule';

// Which color scheme is active, and the `.dark` class on <html> that every color follows.
// The setting is the user's choice; `system` follows the OS. The rule itself is in src/theme/schemeRule.ts,
// which index.html also runs before the app loads.

export type { ColorScheme, ThemeSetting };

const settings: ThemeSetting[] = ['system', 'light', 'dark'];

const stored = localStorage.getItem(THEME_SETTING_KEY) as ThemeSetting | null;
export const themeSetting = ref<ThemeSetting>(stored && settings.includes(stored) ? stored : 'system');

export function setThemeSetting(value: ThemeSetting) {
  themeSetting.value = value;
  localStorage.setItem(THEME_SETTING_KEY, value);
}

const query = window.matchMedia(DARK_QUERY);
const systemDark = ref(query.matches);
query.addEventListener('change', (e) => (systemDark.value = e.matches));

export const colorScheme = computed(() => resolveScheme(themeSetting.value, systemDark.value));

watchEffect(() => applyScheme(colorScheme.value));
