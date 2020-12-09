
import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { Solver } from './Day09';

const path = pathJoin(__dirname, 'input.txt');
const lines = readFileSync(path)
  .toString().trim()
  .split("\n");

const examplePath = pathJoin(__dirname, 'example.txt');
const exampleLines = readFileSync(examplePath)
  .toString().trim()
  .split("\n");

describe('Day09', () => {
  it('reads the file', () => {
    expect(Solver(lines, 25)).toEqual(1124361034);
  });
  it('reads the example', () => {
    expect(Solver(exampleLines, 5)).toEqual(127);
  });
});
