import { describe, it, expect } from 'vitest';
import {
  cards,
  getCardById,
  getCardsByCategory,
  getCardCount,
  categories,
  encouragements,
  shuffle,
  todayString,
} from '../src/index';

describe('public API exports', () => {
  it('exports cards array', () => {
    expect(Array.isArray(cards)).toBe(true);
    expect(cards.length).toBe(120);
  });

  it('exports getCardById function', () => {
    expect(typeof getCardById).toBe('function');
  });

  it('exports getCardsByCategory function', () => {
    expect(typeof getCardsByCategory).toBe('function');
  });

  it('exports getCardCount function', () => {
    expect(typeof getCardCount).toBe('function');
    expect(getCardCount()).toBe(120);
  });

  it('exports categories array', () => {
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBe(5);
  });

  it('exports encouragements array', () => {
    expect(Array.isArray(encouragements)).toBe(true);
    expect(encouragements.length).toBe(8);
  });

  it('exports shuffle function', () => {
    expect(typeof shuffle).toBe('function');
  });

  it('exports todayString function', () => {
    expect(typeof todayString).toBe('function');
    expect(todayString()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
