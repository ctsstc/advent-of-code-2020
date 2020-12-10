
export class Day10 {
  private lines: number[] = this.linesStr.map(line => parseInt(line));
  constructor(private linesStr: string[]) { }

  solution(): {} {
    this.lines.push(0);
    this.lines.sort((a, b) => a - b);

    // console.log(this.lines);

    const collection = { '3': 1 }; // the last connection
    for (let i = 0; i < this.lines.length - 1; i++) {
      const diff = this.lines[i + 1] - this.lines[i];

      // console.log(this.lines[i + 1], this.lines[i], {diff});

      if (diff in collection) {
        collection[diff]++;
      }
      else {
        collection[diff] = 1;
      }
    }



    return collection;
  }
}
