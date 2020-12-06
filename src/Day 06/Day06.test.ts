import { group } from 'console';
import { Counter, Grouper, testLines } from './Day06';

describe('Day06', () => {
  const groups = Grouper(testLines);

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
});
