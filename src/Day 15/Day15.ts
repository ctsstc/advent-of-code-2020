
export class Day15 {
  public lines = this.linesStr.split(',').map(line => parseInt(line));

  constructor(private linesStr: string) {}

  solve(stopNumber: number): number {
    while(this.lines.length < stopNumber) {
      this.nextNumber();
    }

    return this.lastNumber;
  }

  nextNumber() {
    if (this.firstTimeSeen) {
      this.lines.push(0);
    }
    else {
      this.lines.push(this.indexDiff);
    }
  }

  get workingSet(): number[] {
    return this.lines.slice(0, this.lines.length - 1);
  }

  get lastNumber(): number {
    return this.lines[this.lines.length - 1];
  }

  get firstTimeSeen(): boolean {
    // console.log("LAST NUM", this.lastNumber, "last index", this.lastIndex);
    return !this.workingSet.includes(this.lastNumber);
  }

  get lastIndex(): number {
    return this.workingSet.lastIndexOf(this.lastNumber);
  }

  get indexDiff(): number {
    const currentIndex = this.lines.length;
    const previousIndex = this.lastIndex + 1;
    // console.log({currentIndex, previousIndex});
    return currentIndex - previousIndex;
  }
}
