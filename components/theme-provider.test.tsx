import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '@/components/theme-provider';
import { themeStorage } from '@/lib/theme';

function Probe() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme('dark')}>set dark</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  it('exposes the theme and writes changes to storage', async () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('system');

    await userEvent.click(screen.getByRole('button', { name: 'set dark' }));

    await waitFor(async () => expect(await themeStorage.getValue()).toBe('dark'));
    await waitFor(() => expect(screen.getByTestId('theme')).toHaveTextContent('dark'));
    expect(document.documentElement).toHaveClass('dark');
  });
});
