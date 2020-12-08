
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

  // Since the brute force calls this many times we should only parse once
  execute() {
    while(this.lineNotYetRan() && !this.finished()) {
      const parsed = this.parse(this.currentLine);
      this.act(parsed);
    }

    return this.total;
  }

  // Nasty Brute Force Technique
  //  Could try other techniques; could some kind of backtracking work?
  //  Look at positive nops and see if they can get us over the last negative jmp found
  //  It may not need to get over the last negative jmp, there could be an unused section
  //    that includes instructions to get us to the end.
  executeMakeEnd() {
    for (let i = 0; i < this.lines.length; i++) {
      const currentLine = this.lines[i];
      const instruction = this.parse(currentLine);

      instruction.flipFlop();
      this.replace(i, instruction);
      this.execute();

      if (this.finished()) {
        console.log("FINISHED", i);
        return this.total;
      }

      instruction.flipFlop();
      this.replace(i, instruction);
      this.reset();
    }

    return -1;
  }

  private replace(lineNumber: number, instruction: Instruction) {
    this.lines[lineNumber] = instruction.toString();
  }

  private parse(line: string): Instruction {
    const [action, amountStr] = line.split(' ');
    const amount = parseInt(amountStr); // JS can handle the signs
    return new Instruction(action, amount);
  }

  private act({action, amount}: Instruction) {
    this.linesRan.push(this.currentLineIdx);
    this.actions[action](amount);
  }

  private lineNotYetRan(): boolean {
    return !this.linesRan.includes(this.currentLineIdx);
  }

  private get currentLine(): string {
    return this.lines[this.currentLineIdx];
  }

  private finished(): boolean {
    return this.currentLineIdx >= this.lines.length;
  }

  private reset() {
    this.currentLineIdx = 0;
    this.total = 0;
    this.linesRan = [];
  }

}

class Instruction {
  private flipFlops = {
    jmp: 'nop',
    nop: 'jmp'
  };
  private flipFlopKeys = Object.keys(this.flipFlops);
  public flipFlopable = this.flipFlopKeys.includes(this.action);
  private originalAction = this.action;

  constructor(public action: string, public amount: number) {}

  toString() {
    return `${this.action} ${this.amount}`;
  }

  flipFlop(): boolean {
    if (this.flipFlopable) {
      this.action = this.flipFlops[this.action];
    }
    return this.flipFlopable;
  }

  rest() {
    this.action = this.originalAction;
  }
}
