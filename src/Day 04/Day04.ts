import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';

const path = pathJoin(__dirname, 'input.txt');
const examplePath = pathJoin(__dirname, 'example.txt');
export const lines = readFileSync(path).toString();
export const exampleLines = readFileSync(examplePath).toString();

export class Answer {
  private users: User[];

  constructor(usersStr: string) {
    this.users = usersStr.split("\n\n").map(userStr => new User(userStr));
  }

  round1() {
    const validUsers = this.users.filter(user => user.validUser());
    return validUsers.length;
  }
}

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']; // cid is optional

class User {
  private str: string;
  private hash: object;

  constructor(str: string) {
    this.str = str.replace(/\n/g, ' ');
    this.hash = this.getHash();
  }

  private getHash() {
    const pairs = this.str.split(' ');
    return pairs.reduce((hash, pair) => {
      const [key, val] = pair.split(':');
      hash[key] = val;
      return hash;
    }, {});
  }

  validUser() {
    return requiredFields.every(field => field in this.hash);
  }
}
