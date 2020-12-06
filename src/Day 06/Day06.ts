import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';

const path = pathJoin(__dirname, 'input.txt');
const examplePath = pathJoin(__dirname, 'example.txt');
export const lines = readFileSync(path).toString();
export const exampleLines = readFileSync(examplePath).toString();

export class Answers {
  public groups: IGroup[];

  constructor(lines: string) {
    this.groups = lines.split("\n\n").map(Group);
  }

  get groupVoterCount() { return this.groups.map((group) => group.voterCount); }
  get hashes() { return this.groups.map((group)=> group.hash);}
  get allVote() { return this.groups.map(group => group.allVoted); }

  get round1() { return this.hashes.reduce((count: number, hash) => count + Object.keys(hash).length, 0); }
  get round2() { return this.allVote.reduce((count: number, group: string[]) => count + group.length, 0); }
}

interface IGroup {
  lines: string[];
  noSpacesStr: string;
  characters: string[];
  voterCount: number;
  hash: object;
  allVoted: string[];
}

function Group(str): IGroup {
  const lines = str.split("\n");
  const noSpacesStr = str.replace(/\s/g, '');
  const characters = noSpacesStr.split('');
  const voterCount = lines.length;
  const hash = characters.reduce(hashReducer, {});
  const allVoted = Object.keys(hash).filter((character) => hash[character] == voterCount);

  return {
    lines,
    noSpacesStr,
    characters,
    voterCount,
    hash,
    allVoted,
  }
}

function hashReducer(hash, character) {
  const val = hash[character];
  hash[character] = val ? val + 1 : 1;
  return hash;
}
