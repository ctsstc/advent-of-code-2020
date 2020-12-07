import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { Baggifier as Bagger, BagFinder } from './Day07';

const path = pathJoin(__dirname, 'input.txt');
export const lines = readFileSync(path)
  .toString().trim()
  .split("\n");

const examplePath = pathJoin(__dirname, 'example.txt');
export const exampleLines = readFileSync(examplePath)
  .toString().trim()
  .split("\n");

const moreExamples = pathJoin(__dirname, 'moreExamples.txt');
export const moreExampleLines = readFileSync(moreExamples)
  .toString().trim()
  .split("\n");

describe('Day00', () => {
  describe('Example Tests', () => {
    const bagger = new Bagger(exampleLines);

    it('has bags', () => {
      expect(Object.keys(bagger.bags)).toEqual([
        "light red", "dark orange", "bright white",
        "muted yellow", "shiny gold", "dark olive",
        "vibrant plum", "faded blue", "dotted black"
      ]);
    });

    it('contains', () => {
      expect(bagger.containers).toHaveLength(13);
    });

    describe('Bag Finder', () => {
      const finder = new BagFinder(bagger);

      it('has gold containers', () => {
        expect(finder.containedIn('shiny gold')).toHaveLength(2);
      });

      it('finds containers', () => {
        expect(finder.findAllParentContainers('shiny gold')).toEqual([
          "bright white", "light red", "dark orange", "muted yellow"
        ]);
      });

      it('finds how many are within', () => {
        expect(finder.bagsWithin('shiny gold')).toEqual(32);
      });
    });
  });

  describe('Real Tests', () => {
    const bagger = new Bagger(lines);
    const finder = new BagFinder(bagger);

    it('finds all', () => {
      const bags = finder.findAllParentContainers('shiny gold');
      expect(bags).toHaveLength(300);
    });

    it('finds how many are within', () => {
      expect(finder.bagsWithin('shiny gold')).toEqual(8030);
    });
  });

  describe('Another example set', () => {
    const bagger = new Bagger(moreExampleLines);
    const finder = new BagFinder(bagger);

    it('finds how many are within', () => {
      expect(finder.bagsWithin('shiny gold')).toEqual(126);
    });
  });
});
