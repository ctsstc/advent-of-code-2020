import { Baggifier as Bagger, BagFinder, exampleLines, lines } from './Day07';

describe('Day00', () => {
  describe('examples', () => {
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
      const bags = new BagFinder(bagger);

      it('has gold containers', () => {
        expect(bags.containedIn('shiny gold')).toHaveLength(2);
      });

      it('finds all', () => {
        expect(bags.findAllPossible('shiny gold')).toEqual([
          "bright white", "light red", "dark orange", "muted yellow"
        ]);
      });
    });
  });

  describe('real meal deal', () => {
    const bagger = new Bagger(lines);
    const finder = new BagFinder(bagger);

    it('finds all', () => {
      const bags = finder.findAllPossible('shiny gold');
      expect(bags).toHaveLength(300);
    });
  });
});
