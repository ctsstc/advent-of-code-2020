
export class Day17 {
  private world = new World(this.lines);

  constructor(private lines: string[]) { }

  solve(steps: number): number {
    for(let i = 0; i < steps; i++) {
      console.log("TICK:", i);
      this.world.tick();
    }

    return this.world.activeCells.size;
  }
}

class World {
  public activeCells: Map<string, Cell>;
  private readonly ACTIVE = '#';

  constructor(private lines: string[]) {
    this.activeCells = this.startingCells();
    console.log("ACTIVES START", this.activeCells);
  }

  public tick() {
    const nextCells: Map<string, Cell> = new Map();

    // take all active cells
    // determine if they live or die
    // collect their regions around them
    // check if any new ones occur due to surrounding region

    // Check if cell lives or dies
    const {lives} = this.livesOrDies()

    // Collect all surrounding cells
    const cellsToCheck = this.allSurroundingCells();

    console.log("CELLS TO CHECK", cellsToCheck.size);

    cellsToCheck.forEach(cell => {
      const activeNeighbors = this.getActiveNeighbors(cell);
      if (activeNeighbors.length == 3) {
        console.log("ACTIVE NEIGHBORS", activeNeighbors);
        console.log("ALIVE NOW!", cell);
        nextCells.set(cell.key, cell)
      }
    });

    console.log("SIZE to check", cellsToCheck.size);
    console.log({lives});

    lives.forEach(cell => nextCells.set(cell.key, cell));

    console.log({nextCells});

    this.activeCells = nextCells;
  }

  private startingCells(): Map<string, Cell> {
    return this.lines.reduce((activeCells, line, idy) => {
      line.split('').forEach((char, idx) => {
        if(char == this.ACTIVE) {
          const cell = new Cell(new Coordinate(idx, idy, 0));
          activeCells.set(cell.key, cell);
        }
      });
      return activeCells;
    }, new Map());
  }

  private getActiveNeighbors(cell: Cell): Cell[] {
    return cell.neighborCells().reduce((cells, cell) => {
      if (this.activeCells.has(cell.key)) {
        cells.push(this.activeCells.get(cell.key));
      }
      return cells;
    }, []);
  }

  private livesOrDies(): LivesOrDies {
    const cells: Cell[] = Array.from(this.activeCells.values());
    return cells.reduce((ret, cell) => {
      const activeNeighbors = this.getActiveNeighbors(cell);

      if (activeNeighbors.length == 2 || activeNeighbors.length == 3) {
        ret.lives.push(cell);
      }
      else {
        ret.dies.push(cell);
      }

      return ret
    }, { lives: [], dies: [] });
  }

  private allSurroundingCells(): Map<string, Cell> {
    const surroundingCells: Map<string, Cell> = new Map();

    this.activeCells.forEach(cell => {
      cell.neighborCells().forEach(neighborCell => {
        if (!surroundingCells.has(neighborCell.key) && !this.activeCells.has(neighborCell.key)) {
          surroundingCells.set(cell.key, cell);
        }
      });
    });

    return surroundingCells;
  }
}

interface LivesOrDies {
  lives: Cell[];
  dies: Cell[];
}

class Cell {
  private _neighborCells: Cell[];

  constructor(public coordinate: Coordinate) { }

  public neighborCells(): Cell[] {
    if (this._neighborCells) return this._neighborCells;

    const cells = [];

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const coord = new Coordinate(
            this.coordinate.x + x,
            this.coordinate.y + y,
            this.coordinate.z + z
          );
          const cell = new Cell(coord);
          cells.push(cell);
        }
      }
    }

    this._neighborCells = cells
    return cells;
  }

  get key(): string {
    return JSON.stringify(this.coordinate);
  }
}

class Coordinate {
  constructor(public x: number, public y: number, public z: number) {}

  get key(): string {
    return JSON.stringify(this);
  }
}
