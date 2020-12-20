
import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { Day20 } from './Day20';

// const path = pathJoin(__dirname, 'input.txt');
// const lines = readFileSync(path)
//   .toString().trim()
//   .split("\n");

const examplePath = pathJoin(__dirname, 'example.txt');
const exampleLines = readFileSync(examplePath)
  .toString()
  .split("\n");

describe('Day20', () => {
  describe('Example Data', () => {
    it('reads the example', () => {
      expect(new Day20(exampleLines).solve()).toEqual(20899048083289);
    });
  });

  // describe('Real Data', () => {
  //   it('reads the file', () => {
  //     expect(lines).toEqual(['Hello', 'World']);
  //   });
  // });
});
