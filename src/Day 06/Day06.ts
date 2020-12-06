import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';

const path = pathJoin(__dirname, 'input.txt');
const examplePath = pathJoin(__dirname, 'example.txt');
export const lines = readFileSync(path).toString();
export const exampleLines = readFileSync(examplePath).toString();

export class Answers {
  private groups: Group[];

  constructor(lines: string) {
    this.groups = lines.split("\n\n").map(group => new Group(group));
  }

  get groupVoterCount() { return this.groups.map((group) => group.voterCount); }
  get hashes() { return this.groups.map((group)=> group.hash);}

  get allVote() { return this.hashes.map((hash, idx) => Object.keys(hash)
    .filter((character) => hash[character] == this.groupVoterCount[idx])); }

  get round1() { return this.hashes.reduce((count: number, hash) => count + Object.keys(hash).length, 0); }
  get round2() { return this.allVote.reduce((count: number, group: string[]) => count + group.length, 0); }
}

class Group {
  public lines: string[];
  private noSpacesStr: string;
  public voterCount: number;
  private characters: string[];
  public hash: object;

  constructor(str: string) {
    this.lines = str.split("\n");
    this.noSpacesStr = str.replace(/\s/g, '');
    this.voterCount = this.lines.length;
    this.characters = this.noSpacesStr.split('');
    this.hash = this.characters.reduce(this.hasher, {});
  }

  private hasher(hash, character) {
    const val = hash[character];
    hash[character] = val ? val + 1 : 1;
    return hash;
  }
}
