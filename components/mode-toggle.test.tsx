import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ModeToggle } from '@/components/mode-toggle';
import { ThemeProvider } from '@/components/theme-provider';

describe('ModeToggle', () => {
  it('renders a theme toggle button', () => {
    render(
      <ThemeProvider>
        <ModeToggle />
      </ThemeProvider>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
