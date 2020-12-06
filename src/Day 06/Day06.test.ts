import { Grouper, testLines } from './Day06';

describe('Day00', () => {
  it('reads the file', () => {
    const groups = Grouper(testLines);

    expect(groups).toEqual([
      ['abc'],
      ['a', 'b', 'c'],
      ['ab', 'ac'],
      ['a', 'a', 'a', 'a'],
      ['b']
    ]);
  });
});
