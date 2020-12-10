
const numberSort = (a, b) => a - b;

export class Day10 {
  private lines: number[] = this.linesStr.map(line => parseInt(line));
  constructor(private linesStr: string[]) { }

  solution(): {} {
    this.lines.push(0);
    this.lines.sort(numberSort);

    const collection = { '3': 1 }; // the last connection
    for (let i = 0; i < this.lines.length - 1; i++) {
      const diff = this.lines[i + 1] - this.lines[i];

      if (diff in collection) {
        collection[diff]++;
      }
      else {
        collection[diff] = 1;
      }
    }

    return collection;
  }

  solution2(): number {
    this.lines.push(0);
    this.lines.sort(numberSort);

    const memo:Map<number, number> = new Map();
    memo.set(0, 1); // the device and first adapter

    for (let i = 1; i < this.lines.length; i++) {
      const possibilities = this.plugabilities(i);

      let sum = 0;
      for(let ii = 1; ii <= possibilities; ii++) {
        sum += memo.get(i - ii)
      }

      memo.set(i, sum);
    }

    return memo.get(this.lines.length - 1);
  }

  private plugabilities(idx: number, amount = 3) {
    const current = this.lines[idx];
    let count = 0;

    for (let i = 0; i < amount; i++) {
      const offset = i + 1;
      if (idx > i && current - this.lines[idx - offset] <= 3) {
        count++;
      }
    }

    return count;
  }

}
