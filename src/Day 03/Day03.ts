import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';

const path = pathJoin(__dirname, 'input.txt');
export const lines = readFileSync(path)
  .toString()
  .split("\n");

export class World {
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(private grid: Array<string>) {
    this.x = 1;
    this.y = 1;
    this.width = grid[0].length;
    this.height = grid.length;
  }

  move(x: number, y: number): string {
    this.x += x;
    this.y += y;

    if (this.x > this.width) { 
      this.x = this.x % this.width;
    }

    return this.currentCell();
  }

  reset() {
    this.x = 1;
    this.y = 1;
  }

  private currentCell() {
    return this.grid[this.y - 1][this.x - 1];
  }
}

export function Solver(world: World, moveX: number, moveY: number) {
  const tree = '#';
  let collisions = 0;

  while(world.y < world.height) {
    const move = world.move(moveX, moveY);
    if (move == tree) {
      collisions++;
    }
  }

  return collisions;
}