import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AppStorage } from '@sot/shared';

const STORAGE_KEY = '@sot/app-storage';

const defaultStorage: AppStorage = {
  totalPracticeCount: 0,
  dailyPractices: [],
  favorites: [],
  lastPracticeDate: null,
  streakDays: 0,
};

export function useStorage() {
  const [data, setData] = useState<AppStorage>(defaultStorage);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          setData({ ...defaultStorage, ...JSON.parse(raw) });
        } catch { /* corrupted data, use defaults */ }
      }
      setReady(true);
    });
  }, []);

  const persist = useCallback(async (next: AppStorage) => {
    setData(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  return { data, ready, persist };
}
