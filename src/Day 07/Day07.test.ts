import { Baggifier, exampleLines } from './Day07';

describe('Day00', () => {
  describe('examples', () => {
    const bagger = new Baggifier(exampleLines);

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

    it('has gold containers', () => {
      const bags = bagger.containers.filter((container) => {
        return container.bag.color == 'shiny gold'
      });

      expect(bags).toHaveLength(2);
    });
  });
});
