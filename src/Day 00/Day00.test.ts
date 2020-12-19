
import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';

// const path = pathJoin(__dirname, 'input.txt');
// const lines = readFileSync(path)
//   .toString().trim()
//   .split("\n");

const examplePath = pathJoin(__dirname, 'example.txt');
const exampleLines = readFileSync(examplePath)
  .toString().trim()
  .split("\n");

describe('Day00', () => {
  describe('Example Data', () => {
    it('reads the example', () => {
      expect(exampleLines).toEqual(['Example']);
    });
  });

  // describe('Real Data', () => {
  //   it('reads the file', () => {
  //     expect(lines).toEqual(['Hello', 'World']);
  //   });
  // });
});
