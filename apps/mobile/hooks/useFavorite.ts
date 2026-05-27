import { useCallback } from 'react';
import type { AppStorage } from '@sot/shared';

export function useFavorite(
  data: AppStorage,
  persist: (next: AppStorage) => Promise<void>,
) {
  const toggleFavorite = useCallback(
    async (cardId: number) => {
      const favorites = data.favorites.includes(cardId)
        ? data.favorites.filter((id) => id !== cardId)
        : [...data.favorites, cardId];
      await persist({ ...data, favorites });
    },
    [data, persist],
  );

  const isFavorite = useCallback(
    (cardId: number) => data.favorites.includes(cardId),
    [data.favorites],
  );

  return { toggleFavorite, isFavorite };
}
