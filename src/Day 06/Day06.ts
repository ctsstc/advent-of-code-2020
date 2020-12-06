import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { IGroup } from './IGroup';

const path = pathJoin(__dirname, 'input.txt');
const examplePath = pathJoin(__dirname, 'example.txt');
export const lines = readFileSync(path).toString();
export const exampleLines = readFileSync(examplePath).toString();

export class Answers {
  public round1: number;
  public round2: number;
  private groups: IGroup[];

  constructor(lines: string) {
    this.groups = lines.split("\n\n").map(Group);
    this.round1 = this.groups.reduce((sum, group) => sum + group.votedOn.length, 0);
    this.round2 = this.groups.reduce((sum, group) => sum + group.allVoted.length, 0);
  }
}

function Group(str): IGroup {
  const lines = str.split("\n");
  const voterCount = lines.length;
  const noSpacesStr = str.replace(/\s/g, '');
  const characters = noSpacesStr.split('');
  const hash = characters.reduce(hashReducer, {});
  const votedOn = Object.keys(hash);

  return {
    votedOn,
    allVoted: votedOn.filter((character) => hash[character] == voterCount),
  }
}

function hashReducer(hash, character) {
  const val = hash[character];
  hash[character] = val ? val + 1 : 1;
  return hash;
}
