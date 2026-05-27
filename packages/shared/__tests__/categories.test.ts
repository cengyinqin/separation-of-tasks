import { describe, it, expect } from 'vitest';
import { categories, getCategoryMeta, getCategoryById } from '../src/constants/categories';

describe('categories', () => {
  it('has exactly 5 categories', () => {
    expect(categories).toHaveLength(5);
  });

  it('all ranges cover 1-120 without gaps or overlap', () => {
    const sorted = [...categories].sort((a, b) => a.range[0] - b.range[0]);
    let next = 1;
    for (const cat of sorted) {
      expect(cat.range[0]).toBe(next);
      next = cat.range[1] + 1;
    }
    expect(next).toBe(121);
  });

  it('each category has 24 cards', () => {
    for (const cat of categories) {
      expect(cat.range[1] - cat.range[0] + 1).toBe(24);
    }
  });
});

describe('getCategoryMeta', () => {
  it('returns correct meta for each key', () => {
    expect(getCategoryMeta('awareness').label).toBe('识别与觉察');
    expect(getCategoryMeta('boundary').label).toBe('建立边界');
    expect(getCategoryMeta('scenario').label).toBe('场景练习');
    expect(getCategoryMeta('belief').label).toBe('信念重塑');
    expect(getCategoryMeta('action').label).toBe('每日行动');
  });
});

describe('getCategoryById', () => {
  it('returns correct category for boundary values', () => {
    expect(getCategoryById(1).key).toBe('awareness');
    expect(getCategoryById(24).key).toBe('awareness');
    expect(getCategoryById(25).key).toBe('boundary');
    expect(getCategoryById(48).key).toBe('boundary');
    expect(getCategoryById(120).key).toBe('action');
  });

  it('returns correct category for middle values', () => {
    expect(getCategoryById(50).key).toBe('scenario');
    expect(getCategoryById(85).key).toBe('belief');
    expect(getCategoryById(110).key).toBe('action');
  });
});
