interface ITokenContainer {
  amount: number,
  name: string
}

interface ITokenizer {
  name: string,
  contents: ITokenContainer[]
}

const containBagRegex = /(?<amount>\d+) (?<name>.*) bags?/;

export class BagFinder {
  constructor(private bagger: Bagger) { }

  findAllParentContainers(bagName: string, found = []) {
    const bases = this.containedIn(bagName);

    bases.forEach(bagContainer => {
      const { parent: { color } } = bagContainer;
      if (!found.includes(color)) {
        found.push(color)
      }

      this.findAllParentContainers(color, found);
    });

    return found;
  }

  containedIn(bagName: string): BagContainer[] {
    return this.bagger.containers.filter((container) => {
      return container.bag.color == bagName;
    });
  }

  bagsWithin(bagName: string) {
    const startBag = this.bagger.findBag(bagName);
    let sum = 0;

    startBag.containers.forEach(container => {
      sum += container.amount;
      const nestedAmount = container.amount * this.bagsWithin(container.bag.color);
      sum += nestedAmount;
    });

    return sum;
  }
}

export class Bagger {
  public bags: { [key: string]: Bag } = {};
  public containers: BagContainer[] = [];

  constructor(bagsStr: string[]) {
    const tokenizedBags = bagsStr.map(line => this.tokenize(line));

    // hydrate all bags first pass
    this.hydrateBags(tokenizedBags);

    // hydrate all contents next pass
    this.hydrateContents(tokenizedBags);
  }

  findBag(bagName: string): Bag {
    return this.bags[bagName];
  }

  tokenize(line: string): ITokenizer {
    // mirrored beige bags contain 1 drab brown bag, 3 dotted crimson bags.
    let [bag, contentsStr] = line.split(' bags contain ');
    // mirrored beige              1 drab brown bag, 3 dotted crimson bags.
    contentsStr = contentsStr.slice(0, -1); // remove period
    // 1 drab brown bag, 3 dotted crimson bags
    const contents = contentsStr == 'no other bags' ? [] : contentsStr.split(', ')
      .map(bagContent => {
        // 1 drab brown bag
        // 3 dotted crimson bags

        const { amount, name } = containBagRegex.exec(bagContent).groups;
        return {
          amount: parseInt(amount),
          name
        };
      });
    // split: ["1 drab brown bag", "3 dotted crimson bags"]
      // mapped: [{amount: 1, name: "drab brown"}, {amount: 3, name: "dotted crimson"}]

    return {
      name: bag,
      contents
    };
  }

  private hydrateBags(tokens: ITokenizer[]) {
    tokens.forEach(token => {
      this.hydrateBag(token.name);
    });
  }

  private hydrateBag(name: string) {
    if (!(name in this.bags)) {
      this.bags[name] = new Bag(name);
    }
  }

  private hydrateContents(tokens: ITokenizer[]) {
    tokens.forEach(({name: containerName, contents}) => {
      contents.forEach(({amount, name}) => {
        const bag = this.bags[name];
        const container = this.bags[containerName].addContainer(amount, bag);
        this.containers.push(container);
      });
    })
  }
}

class Bag {
  public containers: BagContainer[] = []

  constructor(public color: string) { }

  addContainer(amount, bag): BagContainer {
    const bagAmount = new BagContainer(this, amount, bag);
    this.containers.push(bagAmount);
    return bagAmount
  }
}

class BagContainer {
  constructor(public parent: Bag, public amount: number, public bag: Bag) { }
}
