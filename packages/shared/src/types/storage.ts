export interface PracticeRecord {
  date: string;
  count: number;
}

export interface AppStorage {
  totalPracticeCount: number;
  dailyPractices: PracticeRecord[];
  favorites: number[];
  lastPracticeDate: string | null;
  streakDays: number;
}
