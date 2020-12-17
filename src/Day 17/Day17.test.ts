
import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { Day17 } from './Day17';

const path = pathJoin(__dirname, 'input.txt');
const lines = readFileSync(path)
  .toString().trim()
  .split("\n");

const examplePath = pathJoin(__dirname, 'example.txt');
const exampleLines = readFileSync(examplePath)
  .toString().trim()
  .split("\n");

describe('Day17', () => {
  describe('Example Data', () => {
    it('finds the active cubes on the 6th cycle', () => {
      expect(new Day17(exampleLines).solve(6)).toEqual(112);
    });
  });

  describe('Real Data', () => {
    it('finds the active cubes on the 6th cycle', () => {
      expect(new Day17(lines).solve(6)).toEqual(112);
    });
  });
});
