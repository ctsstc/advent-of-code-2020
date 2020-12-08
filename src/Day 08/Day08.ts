
export class Runner {
  // public actions: IAction[];
  private currentLineIdx: number = 0;
  private total: number = 0;
  private linesRan: number[] = [];

  private actions = {
    acc: (num: number) => {
      this.total += num;
      this.currentLineIdx++;
    },
    jmp: (num: number) => {
      this.currentLineIdx += num;
    },
    nop: (_num: number) => {
      this.currentLineIdx++;
    }
  };

  constructor(private lines: string[]) { }

  execute() {
    while(this.lineNotYetRan) {
      this.act(this.currentLine);
    }

    return this.total;
  }

  private act(line: string) {
    const [action, amountStr] = line.split(' ');
    const amount = parseInt(amountStr); // JS can handle the signs

    this.linesRan.push(this.currentLineIdx);
    this.actions[action](amount);
  }

  private get lineNotYetRan(): boolean {
    return !this.linesRan.includes(this.currentLineIdx);
  }

  private get currentLine(): string {
    return this.lines[this.currentLineIdx];
  }

  // read() {
  //   this.lines.forEach(line => {
        // convert into actions and then run them
  //   });
  // }

  // applyActionResponse({increase, lineDiff}: IActionResponse) {
  //   if(increase) {
  //     this.total += increase;
  //   }
  //   if(lineDiff) {
  //     this.currentLine += this.currentLine;
  //   }
  // }

}

// interface IAction {
//   constructor: (amount: number) => any
//   execute(): IActionResponse
// }

// interface IActionResponse {
//   increase?: number,
//   lineDiff?: number
// }

// class Countable {
//   constructor(protected timesRan: number = 0) { }
// }

// class Acc extends Countable implements IAction {
//   constructor(amount: number) { super(); }

//   execute() {
//     return {
//       increase: 2
//     };
//   }
// }

// class Jmp extends Countable implements IAction {
//   constructor() { super(); }

//   execute() {

//   }
// }

// class Nop extends Countable implements IAction {
//   constructor() { super(); }

//   execute() {

//   }
// }
