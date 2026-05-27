import { useState, useCallback } from 'react';
import { cards, shuffle } from '@sot/shared';
import type { Card } from '@sot/shared';

export function useCards() {
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [shuffling, setShuffling] = useState(false);

  const drawCard = useCallback(() => {
    setShuffling(true);
    const shuffled = shuffle(cards);
    let index = 0;
    const interval = setInterval(() => {
      setCurrentCard(shuffled[index]);
      index++;
      if (index >= 15) {
        clearInterval(interval);
        setShuffling(false);
      }
    }, 80);
  }, []);

  return { currentCard, shuffling, drawCard };
}
