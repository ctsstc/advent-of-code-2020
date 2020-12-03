import { lines, World, Solver } from './Day03';

describe('Day03', () => {
  const tree = '#';
  const open = '.';

  it('moves properly', () => {
    const world = new World(lines);
    let cell = world.move(3, 1);

    expect(cell).toEqual(open);

    cell = world.move(3, 1);
    expect(cell).toEqual(tree);
  });

  it('wraps around', () => {
    const world = new World(lines);

    let cell = world.move(28, 1);
    expect(cell).toEqual(tree);
    expect(world.x).toEqual(29)
    expect(world.y).toEqual(2);
    /** Line 2
     * #.#...#...#....#.........#..#..
     *                             ^
     */

    cell = world.move(4, 1);
    expect(cell).toEqual(tree);
    expect(world.x).toEqual(2);
    expect(world.y).toEqual(3)
    /** Line 3
     * .#....##..#.#..##..##..........
     *  ^
     */
  });

  it('solves', () => {
    const world = new World(lines);
    const answer = Solver(world, 3, 1);
    expect(answer).toEqual('fish');
  });

  it('solves problem 2', () => {
    let world = new World(lines);
    const a1 = Solver(world, 1, 1);
    world.reset();
    const a2 = Solver(world, 3, 1);
    world.reset();
    const a3 = Solver(world, 5, 1);
    world.reset();
    const a4 = Solver(world, 7, 1);
    world.reset();
    const a5 = Solver(world, 1, 2);

    expect(a1*a2*a3*a4*a5).toEqual('nope');
  });
});
