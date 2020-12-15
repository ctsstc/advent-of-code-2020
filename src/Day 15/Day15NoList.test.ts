
import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { Day15NoList } from './Day15NoList';

const path = pathJoin(__dirname, 'input.txt');
const lines = readFileSync(path)
  .toString().trim()
  .split("\n")[0];

const examplePath = pathJoin(__dirname, 'example.txt');
const exampleLines = readFileSync(examplePath)
  .toString().trim()
  .split("\n")[0];

describe('Day15', () => {
  describe('Example Data', () => {
    it('Solves Part 1', () => {
      const day15 = new Day15NoList(exampleLines);
      const solve = day15.solve(2020);
      expect(solve).toEqual(436);
    });
  });
  describe('Real Data', () => {
    it('Solves Part 1', () => {
      const day15 = new Day15NoList(lines);
      expect(day15.solve(2020)).toEqual(1009);
    });
    it('Solves Part 2', () => {
      const day15 = new Day15NoList(lines);
      expect(day15.solve(30000000)).toEqual(62714);
    });
  });

});
