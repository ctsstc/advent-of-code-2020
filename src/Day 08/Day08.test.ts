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

    it('reads the file', () => {
      expect(runner.execute()).toEqual(5);
    });
  });
});
