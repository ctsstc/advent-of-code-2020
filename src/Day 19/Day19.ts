type RuleBook = Map<number, Rule>;

export class Day19 {
  private rules: RuleBook = new Map();
  private messages: string[] = [];

  constructor(lines: string[]) {
    this.sortingHat(lines);
  }

  solve(usingRule: number) {
    const regex = this.regex(usingRule);
    const matching = this.messages.filter(message => message.match(regex));
    console.log({matching});
    return matching.length;
  }

  private sortingHat(lines: string[]) {
    lines.forEach((line, idx) => {
      const type = this.determineType(line);

      if (type == RuleType.Base || type == RuleType.Rule) {
        const rule = new Rule(type, line, this.rules);
        this.rules.set(idx, rule);
      }
      else if(type == RuleType.Message) {
        this.messages.push(line);
      }
    });
  }

  private regex(ruleNumber: number): RegExp {
    // console.log("Get Rule #", ruleNumber);
    return new RegExp('^'+this.rules.get(ruleNumber).execute()+'$');
  }

  private determineType(line: string): RuleType {
    if (line.includes('"')) {
      return RuleType.Base;
    }
    else if (line.includes(':')) {
      return RuleType.Rule;
    }
    else if (line == '') {
      return RuleType.None;
    }
    else {
      return RuleType.Message;
    }
  }

}

class Rule {
  private base: string;

  constructor(public type: ExecutableRule, private line: string, private rules: RuleBook) {
    if (type === RuleType.Base) {
      this.base = this.parseBase();
    }
  }

  execute(): string {
    if (this.type == RuleType.Rule) {
      const rulesStr = this.line.split(': ')[1];
      const options = rulesStr.split(' | ');
      // console.log({options});

      const perms = options.map(option => {
        const rules = option.split(' ');
        // console.log({rules});

        const ruled = rules.reduce((prev, ruleNum) => {
          const rule = this.rules.get(parseInt(ruleNum));
          prev += rule.execute();
          return prev;
        }, "");

        // console.log({ruled});
        return ruled;
      });

      const ord = perms.join('|');
      // console.log({ord});

      return `(${ord})`;
    }

    return this.base;
  }

  private parseBase(): string {
    return new RegExp(/"(.*)"/g).exec(this.line)[1];
  }
}

enum RuleType {
  Rule,
  Base,
  Message,
  None
}

type ExecutableRule = RuleType.Rule | RuleType.Base;
