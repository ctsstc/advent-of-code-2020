
import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { Part2, Solver } from './Day09';

const path = pathJoin(__dirname, 'input.txt');
const lines = readFileSync(path)
  .toString().trim()
  .split("\n");

const examplePath = pathJoin(__dirname, 'example.txt');
const exampleLines = readFileSync(examplePath)
  .toString().trim()
  .split("\n");

describe('Day09', () => {
  const badExampleNumber = Solver(exampleLines, 5);
  const badNumber = Solver(lines, 25);

  describe('Part 1', () => {
    it('solves the example', () => {
      expect(badExampleNumber).toEqual(127);
    });

    it('solves the real deal', () => {
      expect(badNumber).toEqual(1124361034);
    });
  });

  describe('Part 2', () => {
    it('solves the example', () => {
      expect(Part2(exampleLines, badExampleNumber)).toEqual(62)
    });

    it('solves the real meal deal', () => {
      expect(Part2(lines, badNumber)).toEqual(129444555);
    });
  });
});
