import { describe, expect, it, vi } from 'vitest';
import { watchTheme } from '@/lib/content-theme';
import { themeStorage } from '@/lib/theme';

describe('watchTheme', () => {
  it('applies the stored theme and reacts to later changes', async () => {
    const el = document.createElement('div');
    await themeStorage.setValue('dark');

    const unwatch = watchTheme(el);
    await vi.waitFor(() => expect(el).toHaveClass('dark'));

    await themeStorage.setValue('light');
    await vi.waitFor(() => expect(el).not.toHaveClass('dark'));

    unwatch();
  });
});
