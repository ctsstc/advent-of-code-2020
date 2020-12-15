
export class Day15 {
  private lines = this.linesStr.split(',').map(line => parseInt(line));
  private lastSeen = new Map();

  constructor(private linesStr: string) {
    this.lines.forEach((line, idx) =>  {
      if (idx != this.lines.length - 1) {
        this.lastSeen.set(line, idx);
      }
    });
  }

  solve(stopNumber: number): number {
    while(this.lines.length < stopNumber) {
      this.nextNumber();
    }

    return this.lastNumber;
  }

  nextNumber() {
    const lastIdx = this.lines.length - 1;
    const numberBeforeAdd = this.lastNumber;

    if (this.firstTimeSeen()) {
      this.lines.push(0);
    }
    else {
      const diff = this.indexDiff();
      this.lines.push(diff);
    }

    this.lastSeen.set(numberBeforeAdd, lastIdx);
  }

  get lastNumber(): number {
    return this.lines[this.lines.length - 1];
  }

  firstTimeSeen(): boolean {
    return !this.lastSeen.has(this.lastNumber);
  }

  get lastIndex(): number {
    return this.lastSeen.get(this.lastNumber);
  }

  indexDiff(): number {
    const currentIndex = this.lines.length;
    const previousIndex = this.lastIndex + 1;
    return currentIndex - previousIndex;
  }
}
