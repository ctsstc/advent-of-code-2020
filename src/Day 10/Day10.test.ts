
import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { Day10 } from './Day10';

const path = pathJoin(__dirname, 'input.txt');
const lines = readFileSync(path)
  .toString().trim()
  .split("\n");

const examplePath = pathJoin(__dirname, 'example.txt');
const exampleLines = readFileSync(examplePath)
  .toString().trim()
  .split("\n");

const examplePath2 = pathJoin(__dirname, 'example2.txt');
const exampleLines2 = readFileSync(examplePath2)
  .toString().trim()
  .split("\n");

describe('Day10', () => {
  describe('Solution 1', () => {
    it('Example 1', () => {
      const sol = new Day10(exampleLines).solution()
      expect(sol['1'] * sol['3']).toEqual(7*5);
    });
    it('Example 2', () => {
      const sol = new Day10(exampleLines2).solution();
      expect(sol['1'] * sol['3']).toEqual(22*10);
    });
    it('Real Meal Deal', () => {
      const sol = new Day10(lines).solution();
      expect(sol['1'] * sol['3']).toEqual(2240);
    });
  });

  describe('Solution 2', () => {
    it('Example 1', () => {
      expect(new Day10(exampleLines).solution2()).toEqual(8);
    });
    it('Example 2', () => {
      expect(new Day10(exampleLines2).solution2()).toEqual(19208);
    });
    it('Real Meal Deal', () => {
      expect(new Day10(lines).solution2()).toEqual(99214346656768);
    });
  });
});
