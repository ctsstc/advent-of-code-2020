import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';

const path = pathJoin(__dirname, 'input.txt');
export const lines = readFileSync(path)
  .toString()
  .split("\n");

  export const testLines = readFileSync(pathJoin(__dirname, 'example.txt'))
  .toString()
  .split("\n");

export function Grouper(lines: Array<string>): Array<Array<string>> {

  let group = [];
  return lines.reduce((groups, line, idx) => {

    if (line != '') {
      group.push(line);
    }

    if (line == '' || idx == lines.length - 1) {
      groups.push(group);
      group = [];
    }

    return groups;
  }, []);
}

function Unique(value, index, self) {
  return self.indexOf(value) === index;
}

export function Counter(groups: Array<Array<string>>): number {
  return groups.reduce((count, group) => {
    const chars = group.join('');
    const uniques = chars.split('').filter(Unique);
    return count + uniques.length;
  }, 0);
  // line.split('').forEach(character => {
  //   if (!(character in group)) {
  //     group[character] = true;
  //   }
  // });
}