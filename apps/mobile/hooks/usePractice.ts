import { useCallback } from 'react';
import { todayString } from '@sot/shared';
import type { AppStorage } from '@sot/shared';

export function usePractice(
  data: AppStorage,
  persist: (next: AppStorage) => Promise<void>,
) {
  const recordPractice = useCallback(async () => {
    const today = todayString();
    const dailyPractices = [...data.dailyPractices];
    const existing = dailyPractices.find((r) => r.date === today);

    let streakDays = data.streakDays;

    if (data.lastPracticeDate === today) {
      // Already practiced today — just increment
    } else {
      // Check if yesterday was practiced (streak continues)
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

      if (existing) {
        existing.count += 1;
      } else {
        dailyPractices.push({ date: today, count: 1 });
      }

      if (data.lastPracticeDate === yesterdayStr) {
        streakDays += 1;
      } else if (data.lastPracticeDate !== today) {
        streakDays = 1;
      }
    }

    await persist({
      ...data,
      totalPracticeCount: data.totalPracticeCount + 1,
      dailyPractices,
      lastPracticeDate: today,
      streakDays,
    });
  }, [data, persist]);

  return { recordPractice };
}
