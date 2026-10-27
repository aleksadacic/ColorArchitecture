import { ref } from 'vue';

// Web stand-in for react-native's useColorScheme (system scheme).
const query = window.matchMedia('(prefers-color-scheme: dark)');
const systemScheme = ref<'light' | 'dark'>(query.matches ? 'dark' : 'light');
query.addEventListener('change', (e) => (systemScheme.value = e.matches ? 'dark' : 'light'));

export function useColorScheme() {
  return systemScheme;
}
