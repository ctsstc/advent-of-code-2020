import { validPasswords, validPasswords2 } from './Day02';

describe('Day02', () => {
  it('checks for valid passwords', () => {
    expect(validPasswords.length).toEqual(636);
  });

  it('checks for valid passwords using a new verification', () => {
    expect(validPasswords2.length).toEqual(588);
  });
});
