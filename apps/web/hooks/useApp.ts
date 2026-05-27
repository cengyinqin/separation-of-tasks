'use client';

import { useCallback, useState, useRef } from 'react';
import { cards, shuffle, todayString } from '@sot/shared';
import type { Card, AppStorage } from '@sot/shared';
import { useLocalStorage } from './useLocalStorage';

const defaultStorage: AppStorage = {
  totalPracticeCount: 0,
  dailyPractices: [],
  favorites: [],
  lastPracticeDate: null,
  streakDays: 0,
};

export function useApp() {
  const [data, persist] = useLocalStorage<AppStorage>('@sot/app-storage', defaultStorage);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [shuffling, setShuffling] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const drawCard = useCallback(() => {
    setShuffling(true);
    const shuffled = shuffle(cards);
    let index = 0;
    timerRef.current = setInterval(() => {
      setCurrentCard(shuffled[index]);
      index++;
      if (index >= 15) {
        clearInterval(timerRef.current!);
        setShuffling(false);
      }
    }, 80);
  }, []);

  const recordPractice = useCallback(() => {
    const today = todayString();
    const dailyPractices = [...data.dailyPractices];
    const existing = dailyPractices.find((r) => r.date === today);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

    let streakDays = data.lastPracticeDate === yesterdayStr ? data.streakDays + 1 : 1;
    if (data.lastPracticeDate === today) streakDays = data.streakDays;

    if (existing) {
      existing.count += 1;
    } else {
      dailyPractices.push({ date: today, count: 1 });
    }

    persist({
      ...data,
      totalPracticeCount: data.totalPracticeCount + 1,
      dailyPractices,
      lastPracticeDate: today,
      streakDays,
    });
  }, [data, persist]);

  const toggleFavorite = useCallback(
    (cardId: number) => {
      const favorites = data.favorites.includes(cardId)
        ? data.favorites.filter((id) => id !== cardId)
        : [...data.favorites, cardId];
      persist({ ...data, favorites });
    },
    [data, persist],
  );

  const isFavorite = useCallback(
    (cardId: number) => data.favorites.includes(cardId),
    [data.favorites],
  );

  return {
    data,
    currentCard,
    shuffling,
    drawCard,
    recordPractice,
    toggleFavorite,
    isFavorite,
  };
}
