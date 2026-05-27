import { describe, it, expect } from 'vitest';
import { shuffle } from '../src/utils/shuffle';

describe('shuffle', () => {
  it('returns an array of the same length', () => {
    const input = [1, 2, 3, 4, 5];
    expect(shuffle(input)).toHaveLength(input.length);
  });

  it('contains the same elements', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect(result.sort()).toEqual(input.sort());
  });

  it('does not mutate the original array', () => {
    const input = [1, 2, 3, 4, 5];
    const copy = [...input];
    shuffle(input);
    expect(input).toEqual(copy);
  });

  it('handles empty array', () => {
    expect(shuffle([])).toEqual([]);
  });

  it('handles single-element array', () => {
    expect(shuffle([42])).toEqual([42]);
  });
});
