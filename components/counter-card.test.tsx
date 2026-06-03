import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CounterCard } from '@/components/counter-card';
import { counterStorage } from '@/lib/storage';

// Buttons render in order: [decrement, increment, reset].
describe('CounterCard', () => {
  it('renders the stored count and increments it', async () => {
    render(<CounterCard />);
    expect(await screen.findByText('0')).toBeInTheDocument();

    const [, increment] = screen.getAllByRole('button');
    await userEvent.click(increment);

    expect(await screen.findByText('1')).toBeInTheDocument();
    expect(await counterStorage.getValue()).toBe(1);
  });

  it('resets the count to zero', async () => {
    await counterStorage.setValue(9);
    render(<CounterCard />);
    expect(await screen.findByText('9')).toBeInTheDocument();

    const [, , reset] = screen.getAllByRole('button');
    await userEvent.click(reset);

    expect(await screen.findByText('0')).toBeInTheDocument();
  });
});
