import { Counter, Grouper, testLines, lines, Hasher, CountHasher } from './Day06';

describe('Day06', () => {
  describe('Example Tests', () => {
    const groups = Grouper(testLines);
    const hasher = Hasher(groups);

    it('reads the file', () => {
      expect(groups).toEqual([
        ['abc'],
        ['a', 'b', 'c'],
        ['ab', 'ac'],
        ['a', 'a', 'a', 'a'],
        ['b']
      ]);
    });

    it('Counts ', () => {
      expect(Counter(groups)).toEqual(11);
    });

    it('hashes', () => {
      expect(hasher).toEqual([{"a": 1, "b": 1, "c": 1}, {"a": 1, "b": 1, "c": 1}, {"a": 2, "b": 1, "c": 1}, {"a": 4}, {"b": 1}]);
    });

    it('counts round 2', () => {
      expect(CountHasher(hasher, groups)).toEqual(6);
    });
  });

  describe('Real Meal Deal', () => {
    const groups = Grouper(lines);
    const hasher = Hasher(groups);

    it('Counts', () => {
      expect(Counter(groups)).toEqual(6161);
    });

    it('counts round 2', () => {
      expect(CountHasher(hasher, groups)).toEqual(2971);
    });
  });
});
