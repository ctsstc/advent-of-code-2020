
import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { Day19 } from './Day19';

// const path = pathJoin(__dirname, 'input.txt');
// const lines = readFileSync(path)
//   .toString().trim()
//   .split("\n");

const examplePath = pathJoin(__dirname, 'example.txt');
const exampleLines = readFileSync(examplePath)
  .toString().trim()
  .split("\n");

describe('Day19', () => {
  it('reads the example', () => {
    expect(new Day19(exampleLines).solve(0)).toEqual(2);
  });
});
