import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotificationToggle } from '@/components/notification-toggle';
import { showBadgeStorage } from '@/lib/storage';

describe('NotificationToggle', () => {
  it('reflects and toggles the stored setting', async () => {
    render(<NotificationToggle />);
    const toggle = await screen.findByRole('switch');
    await waitFor(() => expect(toggle).toBeChecked());

    await userEvent.click(toggle);

    await waitFor(async () => expect(await showBadgeStorage.getValue()).toBe(false));
  });
});
