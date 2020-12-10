
const numberSort = (a, b) => a - b;

export class Day10 {
  private lines: number[] = this.linesStr.map(line => parseInt(line));
  constructor(private linesStr: string[]) {
    this.lines.push(0);
    this.lines.sort(numberSort);
  }

  solution(): {} {
    const differencesCount = { 1: 0, 2: 0, 3: 1 }; // 3 for the last one

    for (let i = 0; i < this.lines.length - 1; i++) {
      const diff = this.lines[i + 1] - this.lines[i];
      differencesCount[diff]++;
    }

    return differencesCount;
  }

  solution2(): number {
    const memo:Map<number, number> = new Map();
    memo.set(0, 1); // the device and first adapter; 1 possibility

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
      if (idx > i && current - this.lines[idx - offset] <= amount) {
        count++;
      }
    }

    return count;
  }

}
