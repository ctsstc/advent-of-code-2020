import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { Runner } from './Day08';

const path = pathJoin(__dirname, 'input.txt');
export const lines = readFileSync(path)
  .toString().trim()
  .split("\n");

const examplePath = pathJoin(__dirname, 'example.txt');
export const exampleLines = readFileSync(examplePath)
  .toString().trim()
  .split("\n");

describe('Day08', () => {
  describe('Example Data', () => {
    const runner = new Runner(exampleLines);

    it('finds the accumulator', () => {
      expect(runner.execute()).toEqual(5);
    });
  });

  describe('Real Data', () => {
    const runner = new Runner(lines);

    it('finds the accumulator', () => {
      expect(runner.execute()).toEqual(1939);
    });
  });
});
