describe('Day01', () => {
  const expenseReport = [1721, 979, 366, 299, 675, 1456];
  const product = 514579;

  it('finds two items that sum to 2020 and returns their product', () => {
    const answer = Day01(expenseReport);
    expect(answer).toEqual(product)
  });
});
