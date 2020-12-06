import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';

const path = pathJoin(__dirname, 'input.txt');
const examplePath = pathJoin(__dirname, 'example.txt');
export const lines = readFileSync(path).toString();
export const exampleLines = readFileSync(examplePath).toString();

export class Answers {
  constructor(private lines: string) {}

  get groups() { return this.lines.split("\n\n"); }
  get singleLineGroups() { return this.groups.map((group) => group.replace(/\s/g, '')); }
  get groupVoterCount() { return this.groups.map((group) => group.split("\n").length); }
  get hashes() { return this.singleLineGroups.map((group)=> group.split('').reduce(this.hasher, {}));}

  get allVote() { return this.hashes.map((hash, idx) => Object.keys(hash)
    .filter((character) => hash[character] == this.groupVoterCount[idx])); }

  get round1() { return this.hashes.reduce((count: number, hash) => count + Object.keys(hash).length, 0); }
  get round2() { return this.allVote.reduce((count: number, group: string[]) => count + group.length, 0); }
  
  private hasher(hash, character) {
    const val = hash[character];
    hash[character] = val ? val + 1 : 1;
    return hash;
  }
}
