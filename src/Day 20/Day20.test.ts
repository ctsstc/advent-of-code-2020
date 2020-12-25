
import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { Day20 } from './Day20';

const path = pathJoin(__dirname, 'input.txt');
const lines = readFileSync(path)
  .toString()
  .split("\n");

const examplePath = pathJoin(__dirname, 'example.txt');
const exampleLines = readFileSync(examplePath)
  .toString()
  .split("\n");

describe('Day20', () => {
  describe('Example Data', () => {
    const day20 = new Day20(exampleLines);

    it('solves part 1', () => {
      expect(day20.solve()).toEqual(20899048083289);
    });

    it('has proper edge length', () => {
      expect(day20.edgeLength).toEqual(3);
    });

    it('has 4 corners', () => {
      expect(day20.tileTypes.corners.length).toEqual(4);
    });

    it('has 4 edges', () => {
      expect(day20.tileTypes.edges.length).toEqual(4);
    });

    it('has 1 inside piece', () => {
      expect(day20.tileTypes.insides.length).toEqual(1);
    });
  });

  describe('Real Data', () => {
    const day20 = new Day20(lines);

    it('solves part 1', () => {
      expect(day20.solve()).toEqual(16937516456219);
    });

    it('has proper edge length', () => {
      expect(day20.edgeLength).toEqual(12);
    });

    it('has 4 corners', () => {
      expect(day20.tileTypes.corners.length).toEqual(4);
    });

    it('has 40 edges', () => {
      expect(day20.tileTypes.edges.length).toEqual(40);
    });

    it('has 100 inside pieces', () => {
      expect(day20.tileTypes.insides.length).toEqual(100);
    });
  });
});
