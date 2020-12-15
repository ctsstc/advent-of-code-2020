
export class Day15NoList {
  private lastNumber: number;
  private lastSeen: Map<number, number>;
  private count: number;

  constructor(linesStr: string) {
    const lines = linesStr.split(',').map(line => parseInt(line));
    this.lastSeen = this.initLastSeen(lines);
    this.lastNumber = lines[lines.length - 1];
    this.count = lines.length;
  }

  private initLastSeen(lines: number[]): Map<number, number> {
    const lastSeen = new Map();
    const lastIndex = lines.length - 1;

    lines.forEach((line, idx) =>  {
      if (idx == lastIndex) return;
      lastSeen.set(line, idx);
    });

    return lastSeen;
  }

  solve(stopNumber: number): number {
    while(this.count < stopNumber) {
      this.nextNumber();
    }

    return this.lastNumber;
  }

  nextNumber() {
    const lastIdx = this.count -1
    const lastNumberBeforeAdd = this.lastNumber;

    this.lastNumber = this.firstTimeSeen() ? 0 : this.indexDiff();
    this.count++;
    this.lastSeen.set(lastNumberBeforeAdd, lastIdx);
  }

  firstTimeSeen(): boolean {
    return !this.lastSeen.has(this.lastNumber);
  }

  get lastIndex(): number {
    return this.lastSeen.get(this.lastNumber);
  }

  indexDiff(): number {
    const currentIndex = this.count;
    const previousIndex = this.lastIndex + 1;
    return currentIndex - previousIndex;
  }
}
