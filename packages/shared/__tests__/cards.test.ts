import { describe, it, expect } from 'vitest';
import { cards, getCardById, getCardsByCategory, getCardCount } from '../src/data/cards';
import { categories } from '../src/constants/categories';

describe('cards data', () => {
  it('has exactly 120 cards', () => {
    expect(cards).toHaveLength(120);
    expect(getCardCount()).toBe(120);
  });

  it('each card has required fields', () => {
    for (const card of cards) {
      expect(card.id).toBeGreaterThanOrEqual(1);
      expect(card.id).toBeLessThanOrEqual(120);
      expect(card.category).toBeTruthy();
      expect(card.title).toBeTruthy();
      expect(card.situation).toBeTruthy();
      expect(card.solution).toBeTruthy();
    }
  });

  it('has unique ids', () => {
    const ids = cards.map((c) => c.id);
    expect(new Set(ids).size).toBe(120);
  });

  it('each dimension has exactly 24 cards', () => {
    for (const cat of categories) {
      const filtered = getCardsByCategory(cat.key);
      expect(filtered).toHaveLength(24);
    }
  });

  it('card ids match dimension ranges', () => {
    for (const card of cards) {
      const cat = categories.find(
        (c) => card.id >= c.range[0] && card.id <= c.range[1]
      );
      expect(cat).toBeDefined();
      expect(card.category).toBe(cat!.key);
    }
  });

  it('getCardById returns correct cards', () => {
    expect(getCardById(1)?.title).toBe('害怕冲突');
    expect(getCardById(120)?.title).toBe('终极提醒');
    expect(getCardById(999)).toBeUndefined();
  });
});
