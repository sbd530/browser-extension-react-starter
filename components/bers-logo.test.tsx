import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BersLogo } from '@/components/bers-logo';

describe('BersLogo', () => {
  it('renders an accessible BERS wordmark', () => {
    render(<BersLogo />);
    expect(screen.getByRole('img', { name: 'BERS' })).toBeInTheDocument();
  });

  it('forwards a custom className', () => {
    render(<BersLogo className="size-10" data-testid="logo" />);
    expect(screen.getByTestId('logo')).toHaveClass('size-10');
  });
});
