
import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { Day15 } from './Day15';

const path = pathJoin(__dirname, 'input.txt');
const lines = readFileSync(path)
  .toString().trim()
  .split("\n")[0];

const examplePath = pathJoin(__dirname, 'example.txt');
const exampleLines = readFileSync(examplePath)
  .toString().trim()
  .split("\n")[0];

describe('Day15', () => {
  it('reads the file', () => {
    const day15 = new Day15(exampleLines);
    const solve = day15.solve(2020);
    expect(solve).toEqual(436);
  });

  it('Solves Part 1', () => {
    const day15 = new Day15(lines);
    expect(day15.solve(2020)).toEqual(1009);
  });

});
