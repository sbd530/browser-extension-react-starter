import { describe, expect, it, vi } from 'vitest';
import { applyTheme, resolveTheme, themeStorage } from '@/lib/theme';

function mockSystem(dark: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: dark, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  );
}

describe('resolveTheme', () => {
  it('returns explicit themes unchanged', () => {
    expect(resolveTheme('light')).toBe('light');
    expect(resolveTheme('dark')).toBe('dark');
  });

  it('resolves "system" from the OS preference', () => {
    mockSystem(true);
    expect(resolveTheme('system')).toBe('dark');
    mockSystem(false);
    expect(resolveTheme('system')).toBe('light');
  });
});

describe('applyTheme', () => {
  it('toggles the dark class on the target element', () => {
    const el = document.createElement('div');
    applyTheme('dark', el);
    expect(el).toHaveClass('dark');
    applyTheme('light', el);
    expect(el).not.toHaveClass('dark');
  });
});

describe('themeStorage', () => {
  it('defaults to "system"', async () => {
    expect(await themeStorage.getValue()).toBe('system');
  });
});
