import Day01, { answer } from './Day01';

describe('Day01', () => {
  const expenseReport = [1721, 979, 366, 299, 675, 1456];
  const product = 514579;

  it('finds two items that sum to 2020 and returns their product', () => {
    const answer = Day01(expenseReport);
    expect(answer).toEqual(product)
  });

  it('has the right answer', () => {
    expect(answer).toEqual(437931);
  });

  it('has no answer', () => {
    const answer = Day01([1, 2, 3]);
    expect(answer).toEqual(-1);
  });
});
