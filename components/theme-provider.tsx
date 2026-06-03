import { createContext, use, useCallback, useEffect, useMemo, useState } from 'react';
import { applyTheme, themeStorage, type Theme } from '@/lib/theme';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');

  useEffect(() => {
    void themeStorage.getValue().then(setThemeState);
    const unwatch = themeStorage.watch(setThemeState);
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = () => {
      void themeStorage.getValue().then((current) => applyTheme(current));
    };
    media.addEventListener('change', onSystemChange);
    return () => {
      unwatch();
      media.removeEventListener('change', onSystemChange);
    };
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    void themeStorage.setValue(next);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme(): ThemeContextValue {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
