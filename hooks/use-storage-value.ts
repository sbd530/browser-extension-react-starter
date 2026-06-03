import { useEffect, useState } from 'react';

interface WatchableStorage<T> {
  getValue(): Promise<T>;
  watch(callback: (value: T) => void): () => void;
}

/** Subscribes to a WXT storage item and returns its live value across contexts. */
export function useStorageValue<T>(item: WatchableStorage<T>, initial: T): T {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    const unwatch = item.watch(setValue);
    void item.getValue().then(setValue);
    return () => {
      unwatch();
    };
  }, [item]);

  return value;
}
