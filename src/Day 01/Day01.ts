import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';

const path = pathJoin(__dirname, 'input.txt');
const lines = readFileSync(path)
  .toString()
  .split("\n")
  .map(str => parseInt(str));

export default function Day01(expenseReport: Array<number>): number {
  expenseReport.sort();
  for(let i = 0; i < expenseReport.length - 1; i++) {
    for(let ii = i + 1; ii < expenseReport.length; ii++) {
      const first = expenseReport[i];
      const second = expenseReport[ii];
      if (first + second == 2020) {
        return first * second;
      }
    }
  }
  return -1;
}

export const answer = Day01(lines);
