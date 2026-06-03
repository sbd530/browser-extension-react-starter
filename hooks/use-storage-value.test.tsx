import { describe, expect, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useStorageValue } from '@/hooks/use-storage-value';
import { counterStorage } from '@/lib/storage';

describe('useStorageValue', () => {
  it('returns the initial value then resolves the stored value', async () => {
    await counterStorage.setValue(7);
    const { result } = renderHook(() => useStorageValue(counterStorage, 0));
    expect(result.current).toBe(0);
    await waitFor(() => expect(result.current).toBe(7));
  });
});
