import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeSelect } from '@/components/theme-select';
import { ThemeProvider } from '@/components/theme-provider';

describe('ThemeSelect', () => {
  it('renders a theme selector', () => {
    render(
      <ThemeProvider>
        <ThemeSelect />
      </ThemeProvider>,
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
