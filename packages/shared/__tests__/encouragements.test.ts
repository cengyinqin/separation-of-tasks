import { describe, it, expect } from 'vitest';
import { encouragements } from '../src/constants/encouragements';

describe('encouragements', () => {
  it('has exactly 8 encouragements', () => {
    expect(encouragements).toHaveLength(8);
  });

  it('all are non-empty strings', () => {
    for (const msg of encouragements) {
      expect(typeof msg).toBe('string');
      expect(msg.length).toBeGreaterThan(0);
    }
  });

  it('all end with Chinese punctuation', () => {
    for (const msg of encouragements) {
      expect(msg.endsWith('。')).toBe(true);
    }
  });
});
