
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
        if (sides.has(side.smallerNum)) {
          const foundSides = sides.get(side.smallerNum);
          if (!foundSides.includes(tile)) {
            foundSides.push(tile);
          }
        }
        else {
          sides.set(side.smallerNum, [tile]);
        }
      });
    });

    // console.log(sides);

    const corners = this.tiles.filter(tile => {
      const unmatchedSides = tile.sides.reduce((count, side) => {
        if (sides.get(side.smallerNum).length == 1) count++;
        return count;
      }, 0);

      return unmatchedSides == 2;
    });

    console.log(corners.map(x => x.id));

    // const sidesBelongingToOneTile: Map<number, Tile> = new Map();
    // sides.forEach((tiles, sideNum) => {
    //   if (tiles.length == 1) {
    //     // console.log("AYUEEEEEEEE");
    //     // found[sideNum] = tiles;
    //     // console.log(tiles);


    //     // dedupe by ordering
    //     // tiles.sort((a, b) => a.id - b.id);
    //     // const keyIds = tiles.map(tile => tile.id);
    //     // const strKey = JSON.stringify(keyIds);
    //     sidesBelongingToOneTile.set(sideNum, tiles[0]);
    //   }
    // });

    // // console.log(sidesBelongingToOneTile);

    // const tileSides = {};
    // sidesBelongingToOneTile.forEach((tile, sideNumber) => {
    //   // console.log(tile);
    //   if (!(tile.id in tileSides)) tileSides[tile.id] = [];
    //   tileSides[tile.id].push(sideNumber);
    // });

    // console.log(tileSides);


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
  public top: Side;
  public right: Side;
  public bottom: Side;
  public left: Side;
  public sides: Side[];

  constructor(public id: number, lines: string[]) {
    this.top = new Side(lines[0])
    this.right = this.getRightSide(lines);
    this.bottom = new Side(lines[lines.length - 1]);
    this.left = this.getLeftSide(lines);
    this.sides = [
      this.top,
      this.right,
      this.bottom,
      this.left
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
  public smallerNum: number;

  constructor(private str: string) {
    // ## buffer container, fixes reversing issue where '000101' turns into: '101' and is the same reversed
    // Could have used padding
    const padStr = `#${this.str}#`;
    const forwardNum = this.strToNum(padStr);
    const backwardNum = this.reverseNum(forwardNum);
    this.smallerNum = Math.min(forwardNum, backwardNum);
  }

  private strToNum(str: string): number {
    str = str.replace(/\./g, '0');
    str = str.replace(/#/g, '1');
    // console.log({str});
    return parseInt(str, 2);
  }

  private reverseNum(num: number): number {
    const bin = num.toString(2);
    const reversed = bin.split('').reverse().join('');
    return parseInt(reversed, 2);
  }
}
