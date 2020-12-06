import { Answers, lines, exampleLines } from './Day06';

describe('Day06', () => {
  describe('Example Tests', () => {
    const answers = new Answers(exampleLines);

    it('groups properly', () => {
      expect(answers.groups).toHaveLength(5);
    });

    /// TODO: These should be tested via Group as different scenarios.
    // it('hashes groups', () => {
    //   expect(answers.hashes).toEqual([
    //     {"a": 1, "b": 1, "c": 1},
    //     {"a": 1, "b": 1, "c": 1},
    //     {"a": 2, "b": 1, "c": 1},
    //     {"a": 4},
    //     {"b": 1}]
    //   );
    // });

    // it('allVote', () => {
    //   expect(answers.allVote).toEqual([["a", "b", "c"], [], ["a"], ["a"], ["b"]]);
    // });

    it('round1', () => {
      expect(answers.round1).toEqual(11);
    });

    it('round2', () => {
      expect(answers.round2).toEqual(6);
    });
  });

  describe('Real Tests', () => {
    const answers = new Answers(lines);

    it('round1', () => {
      expect(answers.round1).toEqual(6161);
    });

    it('round2', () => {
      expect(answers.round2).toEqual(2971);
      
    });
  });
});
