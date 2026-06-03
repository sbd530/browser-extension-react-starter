import { describe, expect, it } from 'vitest';
import { counterStorage, showBadgeStorage } from '@/lib/storage';

describe('storage items', () => {
  it('counter defaults to 0 and persists writes', async () => {
    expect(await counterStorage.getValue()).toBe(0);
    await counterStorage.setValue(5);
    expect(await counterStorage.getValue()).toBe(5);
  });

  it('showBadge defaults to true and persists writes', async () => {
    expect(await showBadgeStorage.getValue()).toBe(true);
    await showBadgeStorage.setValue(false);
    expect(await showBadgeStorage.getValue()).toBe(false);
  });

  it('notifies watchers on change', async () => {
    const seen: number[] = [];
    const unwatch = counterStorage.watch((value) => seen.push(value));
    await counterStorage.setValue(1);
    await counterStorage.setValue(2);
    unwatch();
    expect(seen).toEqual([1, 2]);
  });
});
