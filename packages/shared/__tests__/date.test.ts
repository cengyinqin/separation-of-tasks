import { describe, it, expect } from 'vitest';
import { todayString, relativeDate } from '../src/utils/date';

describe('todayString', () => {
  it('returns YYYY-MM-DD format', () => {
    expect(todayString()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('relativeDate', () => {
  it('returns 今天 for today', () => {
    expect(relativeDate(todayString())).toBe('今天');
  });
});
