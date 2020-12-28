
// import { readFileSync } from 'fs';
// import { join as pathJoin } from 'path';

import { Binizer, Day05 } from "./Day05";

// const path = pathJoin(__dirname, 'input.txt');
// const lines = readFileSync(path)
//   .toString().trim()
//   .split("\n");


describe('Day00', () => {

  describe('Binizer', () => {
    const bin = new Binizer('ABAB', 'A', 'B');

    it('converts to binary', () => {
      expect(bin.binary).toEqual('0101');
    });

    it('converts to decimal', () => {
      expect(bin.decimal).toEqual(5);
    });
  });

  describe('Example Data', () => {
    const example = 'FBFBBFFRLR';
    it('parse seat', () => {
      expect(Day05.parseSeat(example)).toEqual({row: 44, column: 5, id: 357});
    });
  });

  // describe('Real Data', () => {
  //   it('reads the file', () => {
  //     expect(lines).toEqual(['Hello', 'World']);
  //   });
  // });
});
