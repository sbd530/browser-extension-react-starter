import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppHeader } from '@/components/app-header';
import { ThemeProvider } from '@/components/theme-provider';

describe('AppHeader', () => {
  it('renders the logo and a theme toggle', () => {
    render(
      <ThemeProvider>
        <AppHeader />
      </ThemeProvider>,
    );
    expect(screen.getByRole('img', { name: 'BERS' })).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
