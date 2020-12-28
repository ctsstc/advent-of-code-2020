
export class Day05 {
  constructor(private lines: string[]) {

  }

  solve(): number {
    const seats = this.seatsParser();
    const bigSeat = seats.reduce((prev, cur) => {
      return prev.id < cur.id ? cur : prev;
    });
    return bigSeat.id;
  }

  seatsParser(): Seat[] {
    return this.lines.map(line => Day05.parseSeat(line));
  }

  static parseSeat(line: string): Seat {
    const rowStr = line.substr(0, 7);
    const colStr = line.substr(7);
    const row = new Binizer(rowStr, 'F', 'B');
    const col = new Binizer(colStr, 'L', 'R');

    return new Seat(row.decimal, col.decimal);
  }
}

export class Binizer {
  public binary: string;
  public decimal: number;

  constructor(private str: string, private low: string, private high: string) {
    this.binary = this.getBinary();
    this.decimal = parseInt(this.binary, 2);
  }

  private getBinary(): string {
    const lowFinder = new RegExp(this.low, 'g');
    const highFinder = new RegExp(this.high, 'g');
    return this.str.replace(lowFinder, '0').replace(highFinder, '1');
  }
}

export class Seat {
  public id;

  constructor(public row: number, public column: number) {
    this.id = row * 8 + column;
  }
}
