import { Answer, exampleLines, lines } from './Day04';

describe('Day04', () => {
  describe('Example', () => {
    const answer = new Answer(exampleLines);
    it('round1', () => {
      expect(answer.round1()).toEqual(2);
    });
  });

  describe('Real', () => {
    const answer = new Answer(lines);
    it('round1', () => {
      expect(answer.round1()).toEqual(256);
    });
  });
});
