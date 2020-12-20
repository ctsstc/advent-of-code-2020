
// One idea is that you construct a border
// You choose a tile
//  then you just head in a direction 9 more tiles
//  then there must be tiles that can go off perpendicular another 9 tiles

export class Day20 {
  private tiles = this.parseTiles(this.lines);

  constructor(private lines: string[]) { }

  solve(): number {
    const sides: Map<number, Tile[]> = new Map();

    // console.log(this.tiles);

    // Create Sides Collection
    this.tiles.forEach(tile => {
      tile.sides.forEach(side => {
        if (sides.has(side.id)) {
          const foundSides = sides.get(side.id);
          if (!foundSides.includes(tile)) {
            foundSides.push(tile);
          }
        }
        else {
          sides.set(side.id, [tile]);
        }
      });
    });

    // console.log(sides);
    const translateTileType = {
      0: 'insides',
      1: 'edges',
      2: 'corners'
    }

    const tilesUnmatchedSides = this.tiles.reduce((singleSides, tile) => {
      const singleSidesCount = tile.sides.reduce((count, side) => {
        if (sides.get(side.id).length == 1) count++;
        return count;
      }, 0);

      const typeType = translateTileType[singleSidesCount];
      singleSides[typeType].push(tile);

      return singleSides;
    }, {
      insides: [],
      edges: [],
      corners: []
    });

    console.log(tilesUnmatchedSides);

    const corners = tilesUnmatchedSides.corners;
    console.log(corners.map(x => x.id));

    return corners.reduce((total, tile) => total * tile.id, 1);
  }

  private parseTiles(lines: string[]): Tile[] {
    let tileNumber: number;
    let tileLines: string[];
    const tiles: Tile[] = [];

    lines.forEach(line =>  {
      if (line.startsWith('Tile ')) {
        tileNumber = parseInt(line.match(/\d+/g)[0]);
        tileLines = [];
      }
      else if (line == '') {
        tiles.push(new Tile(tileNumber, tileLines));
        return;
      }
      else {
        tileLines.push(line);
      }
    });

    return tiles;
  }
}

class Tile {
  public sides: Side[];

  constructor(public id: number, lines: string[]) {
    const top = new Side(lines[0])
    const right = this.getRightSide(lines);
    const bottom = new Side(lines[lines.length - 1]);
    const left = this.getLeftSide(lines);

    this.sides = [
      top,
      right,
      bottom,
      left
    ];
  }

  private getLeftSide(lines: string[]): Side {
    return new Side(this.getSideStr(lines));
  }

  private getRightSide(lines: string[]): Side {
    return new Side(this.getSideStr(lines, false));
  }

  private getSideStr(lines: string[], left = true): string {
    const offset = left ? 0 : lines[0].length - 1;

    return lines.reduce((sb, line) => {
      sb += line[offset];
      return sb;
    }, '');
  }

}

class Side {
  public id: number;

  constructor(private str: string) {
    const forwardNum = this.strToNum(this.str);
    const backwardNum = this.reverseNum(forwardNum);
    this.id = Math.min(forwardNum, backwardNum);
  }

  private strToNum(str: string): number {
    str = str.replace(/\./g, '0');
    str = str.replace(/#/g, '1');
    // console.log({str});
    return parseInt(str, 2);
  }

  private reverseNum(num: number): number {
    const bin = num.toString(2);
    const tenWide = bin.padStart(10, '0');
    const reversed = tenWide.split('').reverse().join('');
    return parseInt(reversed, 2);
  }
}
