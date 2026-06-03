import { storage } from '#imports';

export type Theme = 'light' | 'dark' | 'system';

/** Persisted in extension storage so the choice is shared across every page and context. */
export const themeStorage = storage.defineItem<Theme>('local:theme', {
  fallback: 'system',
});

export function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

/**
 * Toggle the `dark` class on a root element. Defaults to the document root for
 * extension pages; content-script UIs pass their shadow-root wrapper instead.
 */
export function applyTheme(theme: Theme, root: HTMLElement = document.documentElement): void {
  root.classList.toggle('dark', resolveTheme(theme) === 'dark');
}
