import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { IGroup } from './IGroup';

const path = pathJoin(__dirname, 'input.txt');
const examplePath = pathJoin(__dirname, 'example.txt');
export const lines = readFileSync(path).toString();
export const exampleLines = readFileSync(examplePath).toString();

export class Answers {
  public groups: IGroup[];

  constructor(lines: string) {
    this.groups = lines.split("\n\n").map(Group);
  }

  get round1() { return this.groups.reduce((sum, group) => sum + group.votedOn.length, 0); }
  get round2() { return this.groups.reduce((sum, group) => sum + group.allVoted.length, 0); }
}

function Group(str): IGroup {
  const lines = str.split("\n");
  const noSpacesStr = str.replace(/\s/g, '');
  const characters = noSpacesStr.split('');
  const voterCount = lines.length;
  const hash = characters.reduce(hashReducer, {});
  const allVoted = Object.keys(hash).filter((character) => hash[character] == voterCount);
  const votedOn = Object.keys(hash);

  return {
    lines,
    noSpacesStr,
    characters,
    voterCount,
    hash,
    allVoted,
    votedOn
  }
}

function hashReducer(hash, character) {
  const val = hash[character];
  hash[character] = val ? val + 1 : 1;
  return hash;
}
