import { ref } from 'vue';

const KEY = 'layquest-theme';
const theme = ref('light');

function read() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function apply(next) {
  theme.value = next;
  document.documentElement.setAttribute('data-bs-theme', next);
  try {
    localStorage.setItem(KEY, next);
  } catch {
    /* storage unavailable: theme still applies for this session */
  }
}

/** Call once at startup: saved choice, else the OS preference. */
export function initTheme() {
  const saved = read();
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  apply(saved ?? (prefersDark ? 'dark' : 'light'));
}

export function useTheme() {
  const toggle = () => apply(theme.value === 'dark' ? 'light' : 'dark');
  return { theme, toggle };
}
