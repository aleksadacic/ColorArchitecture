import { ref } from 'vue';

export type ThemeSetting = 'system' | 'light' | 'dark';

const KEY = 'themeSetting';
const stored = localStorage.getItem(KEY) as ThemeSetting | null;

// Stand-in for the zustand store (RN persists this through the settings API).
export const themeSetting = ref<ThemeSetting>(stored ?? 'system');

export function setThemeSetting(value: ThemeSetting) {
  themeSetting.value = value;
  localStorage.setItem(KEY, value);
}
