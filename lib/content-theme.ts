import { applyTheme, themeStorage } from '@/lib/theme';

/**
 * Keeps the `.dark` class on a content-script shadow-root element in sync with
 * the saved theme. Returns an unwatch function to call on unmount.
 */
export function watchTheme(element: HTMLElement): () => void {
  void themeStorage.getValue().then((theme) => applyTheme(theme, element));
  return themeStorage.watch((theme) => applyTheme(theme, element));
}
