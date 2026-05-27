'use client';

import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setValue({ ...initialValue, ...JSON.parse(raw) });
    } catch { /* ignore */ }
  }, [key]);

  const persist = useCallback(
    (next: T) => {
      setValue(next);
      localStorage.setItem(key, JSON.stringify(next));
    },
    [key],
  );

  return [value, persist] as const;
}
