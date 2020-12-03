import { lines, World, Solver } from './Day03';

describe('Day03', () => {
  const tree = '#';
  const open = '.';

  describe('World', () => {
    const world = new World(lines);

    it('starts at 1, 1', () => {
      expect(world).toMatchObject({x: 1, y: 1});
      /** Line 1
       * ...#...#....#....##...###....#.
       * ^
       */
    });

    it('moves properly', () => {
      world.move(3, 1);
      expect(world).toMatchObject({x: 4, y: 2, position: open});
      /** Line 2
       * #.#...#...#....#.........#..#..
       *    ^
       */
    });

    it('moves again', () => {
      world.move(3, 1);
      expect(world).toMatchObject({x: 7, y: 3, position: tree});
      /** Line 3
       * .#....##..#.#..##..##..........
       *       ^
       */
    });

    it('resets to 1, 1', () => {
      world.reset();
      expect(world).toMatchObject({x: 1, y: 1});
    });

    describe('Horizontal Wrapping', () => {
      it('moves almost off', () => {
        world.move(28, 1);
        expect(world).toMatchObject({x: 29, y: 2, position: tree});
        /** Line 2
         * #.#...#...#....#.........#..#..
         *                             ^
         */
      });

      it('moves off and wraps around', () => {
        world.move(4, 1);
        expect(world).toMatchObject({x: 2, y: 3, position: tree});
        /** Line 3
         * .#....##..#.#..##..##..........
         *  ^
         */
      });
    });
  });

  describe('Solver', () => {
    const world = new World(lines);

    beforeEach(() => {
      world.reset();
    });

    it('solves problem 1', () => {
      const answer = Solver(world, 3, 1);
      expect(answer).toEqual(162);
    });

    it('solves problem 2', () => {
      const a1 = Solver(world, 1, 1);
      world.reset();
      const a2 = Solver(world, 3, 1);
      world.reset();
      const a3 = Solver(world, 5, 1);
      world.reset();
      const a4 = Solver(world, 7, 1);
      world.reset();
      const a5 = Solver(world, 1, 2);

      const product = a1*a2*a3*a4*a5;

      expect(product).toEqual(3064612320);
    });
  });
});
